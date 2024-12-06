package org.example.myproject.services.Impl;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.example.myproject.exception.AppException;
import org.example.myproject.exception.ErrorCode;
import org.example.myproject.model.dto.request.CheckOut;
import org.example.myproject.model.entity.*;
import org.example.myproject.repositories.OrderItemRepository;
import org.example.myproject.repositories.OrderRepository;
import org.example.myproject.repositories.ProductRepository;
import org.example.myproject.repositories.UserRepository;
import org.example.myproject.security.SecurityUtils;
import org.example.myproject.services.CartService;
import org.example.myproject.services.OrderService;
import org.example.myproject.services.UserService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class OrderServiceImpl implements OrderService {
    CartService cartService;

    UserService userService;

    UserRepository userRepository;

    OrderRepository orderRepository;

    OrderItemRepository orderItemRepository;

    ProductRepository productRepository;

    @Override
    public Order checkout(CheckOut body) {
        Cart cart = cartService.getCartByUser();
        Order order = new Order();
        String email = SecurityUtils.getCurrentUserLogin().get();
        UserEntity user = userService.findUserByEmailOrUserName(email);

        //Long totalOrder = 0L;
        List<OrderItem> orderItems = new ArrayList<>();
        for(CartItem cartItem : cart.getCartItems()) {
            OrderItem orderItem = new OrderItem();
            orderItem.setProduct(cartItem.getProduct());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setTotal(cartItem.getTotal());
            orderItem.setOrder(order);

            if(cartItem.getProduct().getQuantity() < cartItem.getQuantity()) {
                throw new AppException(ErrorCode.PRODUCT_NOT_ENOUGH);
            }

            orderItems.add(orderItem);
        }

        for(OrderItem orderItem : orderItems) {
            Product product = orderItem.getProduct();
            product.setQuantity(product.getQuantity() - orderItem.getQuantity());
            productRepository.save(product);
        }

        OrderInfo orderInfo = OrderInfo.builder()
                .shipTo(body.getShipTo())
                .shippingMethod(body.getShippingMethod())
                .build();

        order.setOrderInfo(orderInfo);
        order.setOrderItems(orderItems);
        order.setTotal(body.getTotal());
        order.setStatus("PENDING");
        order.setUser(user);

        cartService.clearCart();

        return orderRepository.save(order);
    }

    @Override
    public List<Order> getOrderByUser() {
        String email = SecurityUtils.getCurrentUserLogin().get();
        UserEntity user = userService.findUserByEmailOrUserName(email);
        List<Order> orders = user.getOrders();
        Collections.reverse(orders);
        return orders;
    }

    @Override
    public Order updateStatusOrder(Long orderId, String status) {
        Optional<Order> orderOptional = orderRepository.findById(orderId);

        if(orderOptional.isEmpty()) {
            throw new AppException(ErrorCode.ORDER_NOT_FOUND);
        }

        Order order = orderOptional.get();
        order.setStatus(status);
        return orderRepository.save(order);
    }

    @Override
    public Order getOrderById(Long orderId) {
        Optional<Order> orderOptional = orderRepository.findById(orderId);

        if(orderOptional.isEmpty()) {
            throw new AppException(ErrorCode.ORDER_NOT_FOUND);
        }

        return orderOptional.get();
    }
}
