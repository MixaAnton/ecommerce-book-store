package com.example.springbootecommercebookstore.dto;

import com.example.springbootecommercebookstore.entity.Address;
import com.example.springbootecommercebookstore.entity.Customer;
import com.example.springbootecommercebookstore.entity.Order;
import com.example.springbootecommercebookstore.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {

    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;
}
