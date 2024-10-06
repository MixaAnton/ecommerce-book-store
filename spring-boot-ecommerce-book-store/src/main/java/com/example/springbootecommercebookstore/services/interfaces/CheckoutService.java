package com.example.springbootecommercebookstore.services.interfaces;

import com.example.springbootecommercebookstore.dto.PaymentInfo;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;


public interface CheckoutService {

    PaymentIntent createPaymentIntent(PaymentInfo paymentInfo) throws StripeException;
}
