package com.example.springbootecommercebookstore.dto;

import lombok.*;

import java.math.BigDecimal;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class OrderDetails {

    private int totalQuantity;
    private BigDecimal totalOrderPrice;

    Set<OrderItemDTO> orderItems;
}
