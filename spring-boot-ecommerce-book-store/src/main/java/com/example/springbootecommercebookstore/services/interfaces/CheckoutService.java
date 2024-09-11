package com.example.springbootecommercebookstore.services.interfaces;

import com.example.springbootecommercebookstore.dto.Purchase;
import com.example.springbootecommercebookstore.dto.PurchaseResponse;
import com.example.springbootecommercebookstore.entity.Order;

import java.util.List;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);
    List<Order> getAllOrders();
}
