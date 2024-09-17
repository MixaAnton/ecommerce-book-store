package com.example.springbootecommercebookstore.dao;

import com.example.springbootecommercebookstore.entity.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order,Long> {

    Page<Order> findByCustomerEmailOrderByDateCreatedDesc(@Param("email") String email, Pageable pageable);
    @Query("SELECT o FROM Order o " +
            "JOIN FETCH o.customer " +
            "JOIN FETCH o.shippingAddress " +
            "JOIN FETCH o.billingAddress " +
            "JOIN FETCH o.orderItems")
    Page<Order> findAllOrdersWithDetailsOrderByDateCreatedDesc(Pageable pageable);

    @Query("SELECT o FROM Order o WHERE o.id = :id")
    Order findOrderByOrderId(@Param("id") Long id);



}
