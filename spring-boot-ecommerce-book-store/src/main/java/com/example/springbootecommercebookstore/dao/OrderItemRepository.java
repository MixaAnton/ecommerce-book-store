package com.example.springbootecommercebookstore.dao;

import com.example.springbootecommercebookstore.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem,Long> {
}
