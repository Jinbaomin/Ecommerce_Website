package org.example.myproject.repositories;

import org.example.myproject.model.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    public List<Order> findAllByOrderByIdDesc();
}
