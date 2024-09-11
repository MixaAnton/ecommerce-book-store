package com.example.springbootecommercebookstore.services;

import com.example.springbootecommercebookstore.dao.OrderItemRepository;
import com.example.springbootecommercebookstore.entity.Order;
import com.example.springbootecommercebookstore.entity.OrderItem;
import com.example.springbootecommercebookstore.services.interfaces.OrderItemService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class OrderItemServiceImpl implements OrderItemService {

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Override
    @Transactional
    public void saveAll(Set<OrderItem> orderItemList, Order order) {

        orderItemList.forEach(x->{
           // x.setOrder(order);
            orderItemRepository.save(x);
        });
    }
}
