package com.example.springbootecommercebookstore.services;

import com.example.springbootecommercebookstore.dao.CustomerRepository;
import com.example.springbootecommercebookstore.dao.OrderRepository;
import com.example.springbootecommercebookstore.dto.Purchase;
import com.example.springbootecommercebookstore.dto.PurchaseResponse;
import com.example.springbootecommercebookstore.entity.Customer;
import com.example.springbootecommercebookstore.entity.Order;
import com.example.springbootecommercebookstore.entity.OrderItem;
import com.example.springbootecommercebookstore.services.interfaces.CheckoutService;
import com.example.springbootecommercebookstore.services.interfaces.OrderItemService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service
public class CheckoutServiceImpl implements CheckoutService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemServiceImpl orderItemService;

    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {

        Order order = purchase.getOrder();

        String orderTrackingNumber = generateOrderTrackingNumber();
        order.setOrderTrackingNumber(orderTrackingNumber);

        Set<OrderItem> orderItems = purchase.getOrderItems();
       //orderItems.forEach(item -> item.setOrder(order));
        //order.setOrderItems(orderItems);
        // populate order with billingAddress and shippingAddress
        order.setBillingAddress(purchase.getBillingAddress());
        order.setShippingAddress(purchase.getShippingAddress());
        order.setOrderItems(orderItems);
        // populate customer with order
        Customer customer = purchase.getCustomer();

        // check if this is an existing customer
        String theEmail = customer.getEmail();

        Customer customerFromDB = customerRepository.findByEmail(theEmail);

        if (customerFromDB != null) {
            // we found them ... let's assign them accordingly
            customer = customerFromDB;
        }
        else{
            customerRepository.save(customer);
        }
        order.setCustomer(customer);
        //customer.add(order);

        //customerRepository.save(customer);
        Order newOrder = orderRepository.save(order);

        //orderItemService.saveAll(purchase.getOrderItems(),newOrder);

        return new PurchaseResponse(orderTrackingNumber);
    }

    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAllOrdersWithDetails();
    }

    private String generateOrderTrackingNumber() {

        return UUID.randomUUID().toString();
    }
}
