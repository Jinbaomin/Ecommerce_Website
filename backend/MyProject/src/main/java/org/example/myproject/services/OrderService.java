package org.example.myproject.services;

import org.example.myproject.model.dto.request.CheckOut;
import org.example.myproject.model.dto.response.OrderDTO;
import org.example.myproject.model.dto.response.PaginationResult;
import org.example.myproject.model.entity.Order;
import org.hibernate.annotations.Check;

import java.util.List;

public interface OrderService {
    public Order checkout(CheckOut body);
    public List<Order> getOrderByUser();
    public Order updateStatusOrder(Long orderId, String status);
    public Order getOrderById(Long orderId);
    public PaginationResult getOrderByUserId(Long userId, int page, int pageSize);
    public PaginationResult getAllOrders(int page, int pageSize, String sortedBy, String option, String status, String email);
}
