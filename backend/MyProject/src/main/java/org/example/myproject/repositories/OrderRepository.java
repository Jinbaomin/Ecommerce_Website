package org.example.myproject.repositories;

import org.example.myproject.model.entity.Order;
import org.example.myproject.model.entity.UserEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    public List<Order> findAllByOrderByIdDesc();
    public Page<Order> findByUser(UserEntity user, Pageable pageable);
    public Page<Order> findByStatus(String status, Pageable pageable);
    public Page<Order> findByUserAndStatus(UserEntity user, String status, Pageable pageable);
}
