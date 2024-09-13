package com.example.springbootecommercebookstore.services.interfaces;

import com.example.springbootecommercebookstore.dto.Purchase;
import com.example.springbootecommercebookstore.dto.PurchaseResponse;
import com.example.springbootecommercebookstore.entity.Order;
import org.aspectj.weaver.ast.Or;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface OrderService {

    PurchaseResponse placeOrder(Purchase purchase);
    Page<Order> getAllOrders(Pageable pageable);
    Page<Order> getOrderHistoryByEmail(String email, Pageable pageable);
    Order changeOrderStatus(Long orderId, String status);
}
