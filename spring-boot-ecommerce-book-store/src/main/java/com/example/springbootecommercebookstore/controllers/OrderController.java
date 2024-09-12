package com.example.springbootecommercebookstore.controllers;

import com.example.springbootecommercebookstore.dto.Purchase;
import com.example.springbootecommercebookstore.dto.PurchaseResponse;
import com.example.springbootecommercebookstore.entity.Order;
import com.example.springbootecommercebookstore.entity.Product;
import com.example.springbootecommercebookstore.services.interfaces.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/purchase")
    public PurchaseResponse placeOrder(@RequestBody Purchase purchase) {

        PurchaseResponse purchaseResponse = orderService.placeOrder(purchase);

        return purchaseResponse;
    }

    @GetMapping("/all")
    public Page<Order> getAllOrders(Pageable pageable){
        return orderService.getAllOrders(pageable);
    }

    @GetMapping("/history")
    public Page<Order> getOrderHistoryByUserEmail(@RequestParam String email, Pageable pageable){
        return orderService.getOrderHistoryByEmail(email,pageable);
    }
}