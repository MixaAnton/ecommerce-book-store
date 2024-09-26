package com.example.springbootecommercebookstore.services;

import com.example.springbootecommercebookstore.dao.CustomerRepository;
import com.example.springbootecommercebookstore.dao.OrderRepository;
import com.example.springbootecommercebookstore.dto.OrderDetails;
import com.example.springbootecommercebookstore.dto.OrderItemDTO;
import com.example.springbootecommercebookstore.dto.Purchase;
import com.example.springbootecommercebookstore.dto.PurchaseResponse;
import com.example.springbootecommercebookstore.entity.*;
import com.example.springbootecommercebookstore.enums.StatusEnum;
import com.example.springbootecommercebookstore.services.interfaces.OrderService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemServiceImpl orderItemService;

    @Autowired
    private StatusServiceImpl statusService;

    @Autowired
    private ProductServiceImpl productService;

    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {

        Order order = purchase.getOrder();

        Status status = statusService.getStatusByName(StatusEnum.CREATED.getDisplayName());
        order.setStatus(status);

        String orderTrackingNumber = generateOrderTrackingNumber();
        order.setOrderTrackingNumber(orderTrackingNumber);

        order.setBillingAddress(purchase.getBillingAddress());
        order.setShippingAddress(purchase.getShippingAddress());

        Set<OrderItem> orderItems = purchase.getOrderItems();
        order.setOrderItems(orderItems);

        Customer customer = purchase.getCustomer();

        String theEmail = customer.getEmail();

        Customer customerFromDB = customerRepository.findByEmail(theEmail);

        if (customerFromDB != null) {
            customer = customerFromDB;
        }
        else{
            customerRepository.save(customer);
        }
        order.setCustomer(customer);

        Order newOrder = orderRepository.save(order);

        return new PurchaseResponse(orderTrackingNumber);
    }

    @Override
    public Page<Order> getAllOrders(Pageable pageable) {

        return orderRepository.findAllOrdersWithDetailsOrderByDateCreatedDesc(pageable);
    }

    @Override
    public Page<Order> getOrderHistoryByEmail(String email, Pageable pageable) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication!= null && authentication.isAuthenticated())
        {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();


            boolean isUSer = userDetails.getAuthorities()
                    .stream()
                    .anyMatch(role -> role.getAuthority().equals("ROLE_USER"));
            if(isUSer)
                return orderRepository.findByCustomerEmailOrderByDateCreatedDesc(email,pageable);
            return orderRepository.findAllOrdersWithDetailsOrderByDateCreatedDesc(pageable);

        }
        throw new IllegalArgumentException();
    }

    @Override
    public Order changeOrderStatus(Long orderId, String statusName) {
        Status status = statusService.getStatusByName(statusName);
        Order order = orderRepository.findOrderByOrderId(orderId);
        order.setStatus(status);
        return orderRepository.save(order);
    }

    @Override
    public OrderDetails getOrderDetails(Long orderId) {
        Order order = orderRepository.findOrderByOrderId(orderId);
        OrderDetails orderDetails= new OrderDetails();
        orderDetails.setTotalOrderPrice(order.getTotalPrice());
        orderDetails.setTotalQuantity(order.getTotalQuantity());

        Set<OrderItemDTO> orderItemDTO = new HashSet<>();

        Set<OrderItem> orderItems = order.getOrderItems();

        orderItems.forEach(x -> {
            Product product = productService.getProductById(x.getProductId());
            BigDecimal totlaPrice = x.getUnitPrice().multiply(BigDecimal.valueOf(x.getQuantity()));
            orderItemDTO.add(new OrderItemDTO(product.getName(),x.getQuantity(),x.getUnitPrice(),totlaPrice));
        } );

        orderDetails.setOrderItems(orderItemDTO);

        return  orderDetails;
    }

    private String generateOrderTrackingNumber() {

        return UUID.randomUUID().toString();
    }
}
