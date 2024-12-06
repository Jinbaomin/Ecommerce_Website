package org.example.myproject.controllers;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.example.myproject.facade.OrderFacade;
import org.example.myproject.model.dto.GenericApiResponse;
import org.example.myproject.model.dto.request.CheckOut;
import org.example.myproject.model.dto.request.UpdateStatusOrder;
import org.example.myproject.model.dto.response.OrderDTO;
import org.example.myproject.model.entity.Order;
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

    @PutMapping("/status")
    public ResponseEntity<GenericApiResponse<Order>> updateStatusOrder(
            @RequestBody UpdateStatusOrder body
    ) {
        return ResponseEntity.ok(orderFacade.updateStatusOrder(body.getOrderId(), body.getStatus()));
    }
}
