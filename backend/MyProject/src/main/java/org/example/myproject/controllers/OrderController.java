package org.example.myproject.controllers;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.example.myproject.facade.OrderFacade;
import org.example.myproject.model.dto.GenericApiResponse;
import org.example.myproject.model.dto.request.CheckOut;
import org.example.myproject.model.dto.request.UpdateStatusOrder;
import org.example.myproject.model.dto.response.OrderDTO;
import org.example.myproject.model.dto.response.PaginationResult;
import org.example.myproject.model.entity.Order;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/order")
public class OrderController {
    OrderFacade orderFacade;

    @GetMapping("")
    public ResponseEntity<GenericApiResponse<List<OrderDTO>>> getAllOrdersByUser() {
        return ResponseEntity.ok(orderFacade.getOrdersByUser());
    }

    @PostMapping("")
    public ResponseEntity<GenericApiResponse<OrderDTO>> checkout(
            @RequestBody CheckOut body
    ) {
        return ResponseEntity.ok(orderFacade.checkout(body));
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<GenericApiResponse<OrderDTO>> getOrderById(
            @PathVariable Long orderId
    ) {
        return ResponseEntity.ok(orderFacade.getOrderById(orderId));
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<GenericApiResponse<PaginationResult>> getOrderByUserId(
            @PathVariable Long id,
            @RequestParam(value = "page", required = false, defaultValue = "1") String page,
            @RequestParam(value = "pageSize", required = false, defaultValue = "5") String pageSize
    ) {
        return ResponseEntity.ok(orderFacade.getOrderByUserId(id, Integer.parseInt(page), Integer.parseInt(pageSize)));
    }

    @PutMapping("/{orderId}/status")
    public ResponseEntity<GenericApiResponse<OrderDTO>> updateStatusOrder(
            @PathVariable Long orderId,
            @RequestBody UpdateStatusOrder body
    ) {
        return ResponseEntity.ok(orderFacade.updateStatusOrder(orderId, body.getStatus()));
    }

    @GetMapping("/admin")
    public ResponseEntity<GenericApiResponse<PaginationResult>> getAllOrders(
            @RequestParam(value = "page", required = false, defaultValue = "1") String page,
            @RequestParam(value = "pageSize", required = false, defaultValue = "5") String pageSize,
            @RequestParam(value = "sortedBy", required = false, defaultValue = "createdAt,asc") String sortedBy,
            @RequestParam(value = "status", required = false, defaultValue = "") String status,
            @RequestParam(value = "searchByEmail", required = false, defaultValue = "") String email
    ) {
        return ResponseEntity.ok(orderFacade.getALlOrders(Integer.parseInt(page), Integer.parseInt(pageSize), sortedBy, status, email));
    }
}
