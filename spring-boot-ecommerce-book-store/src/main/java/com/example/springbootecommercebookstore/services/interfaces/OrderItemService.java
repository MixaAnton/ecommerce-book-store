package com.example.springbootecommercebookstore.services.interfaces;

import com.example.springbootecommercebookstore.entity.Order;
import com.example.springbootecommercebookstore.entity.OrderItem;
import org.springframework.stereotype.Service;

import java.util.Set;


public interface OrderItemService {

    void saveAll(Set<OrderItem> orderItemList, Order order);
}
