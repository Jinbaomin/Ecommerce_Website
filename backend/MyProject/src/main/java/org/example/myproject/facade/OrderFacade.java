package org.example.myproject.facade;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.example.myproject.mapper.OrderMapper;
import org.example.myproject.model.dto.GenericApiResponse;
import org.example.myproject.model.dto.request.CheckOut;
import org.example.myproject.model.dto.response.OrderDTO;
import org.example.myproject.model.entity.Order;
import org.example.myproject.services.OrderService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class OrderFacade {
    OrderService orderService;

    public GenericApiResponse<List<OrderDTO>> getOrdersByUser() {
        List<Order> orders = orderService.getOrderByUser();
        List<OrderDTO> orderDTOS = orders.stream().map(OrderMapper.INSTANCE::convertToOrderDTO).collect(Collectors.toList());
        return GenericApiResponse.<List<OrderDTO>>builder()
                .statusCode(200)
                .message("Get orders by user")
                .data(orderDTOS)
                .build();
    }

    public GenericApiResponse<OrderDTO> checkout(CheckOut body) {
        OrderDTO orderDTO = OrderMapper.INSTANCE.convertToOrderDTO(orderService.checkout(body));
        return GenericApiResponse.<OrderDTO>builder()
                .statusCode(200)
                .message("Check out successfully")
                .data(orderDTO)
                .build();
    }

    public GenericApiResponse<Order> updateStatusOrder(Long orderId, String status) {
        return GenericApiResponse.<Order>builder()
                .statusCode(200)
                .message("Update status successfully")
                .data(orderService.updateStatusOrder(orderId, status))
                .build();
    }

    public GenericApiResponse<OrderDTO> getOrderById(Long orderId) {
        return GenericApiResponse.<OrderDTO>builder()
                .statusCode(200)
                .message("Get order by id successfully")
                .data(OrderMapper.INSTANCE.convertToOrderDTO(orderService.getOrderById(orderId)))
                .build();
    }
}
