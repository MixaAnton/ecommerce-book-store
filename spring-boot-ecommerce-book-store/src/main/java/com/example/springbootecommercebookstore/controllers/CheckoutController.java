package com.example.springbootecommercebookstore.controllers;

import com.example.springbootecommercebookstore.dto.Purchase;
import com.example.springbootecommercebookstore.dto.PurchaseResponse;
import com.example.springbootecommercebookstore.entity.Order;
import com.example.springbootecommercebookstore.services.interfaces.CheckoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {

    @Autowired
    private CheckoutService checkoutService;

    @PostMapping("/purchase")
    public PurchaseResponse placeOrder(@RequestBody Purchase purchase) {

        PurchaseResponse purchaseResponse = checkoutService.placeOrder(purchase);

        return purchaseResponse;
    }

    @GetMapping("/all-orders")
    public List<Order> getAllOrders(){
        return checkoutService.getAllOrders();
    }
}
