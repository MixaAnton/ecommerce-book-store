package com.example.springbootecommercebookstore.services;

import com.example.springbootecommercebookstore.dao.CustomerRepository;
import com.example.springbootecommercebookstore.dao.OrderRepository;
import com.example.springbootecommercebookstore.dto.Purchase;
import com.example.springbootecommercebookstore.dto.PurchaseResponse;
import com.example.springbootecommercebookstore.entity.Customer;
import com.example.springbootecommercebookstore.entity.Order;
import com.example.springbootecommercebookstore.entity.OrderItem;
import com.example.springbootecommercebookstore.entity.Status;
import com.example.springbootecommercebookstore.enums.StatusEnum;
import com.example.springbootecommercebookstore.services.interfaces.OrderService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

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
        return orderRepository.findByCustomerEmailOrderByDateCreatedDesc(email,pageable);
    }

    private String generateOrderTrackingNumber() {

        return UUID.randomUUID().toString();
    }
}
