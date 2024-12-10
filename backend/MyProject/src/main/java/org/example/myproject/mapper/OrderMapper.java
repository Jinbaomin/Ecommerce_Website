package org.example.myproject.mapper;

import org.example.myproject.model.dto.response.OrderDTO;
import org.example.myproject.model.dto.response.OrderItemDTO;
import org.example.myproject.model.dto.response.ProductDTO;
import org.example.myproject.model.dto.response.UserDTO;
import org.example.myproject.model.entity.Order;
import org.example.myproject.model.entity.OrderItem;
import org.example.myproject.model.entity.Product;
import org.example.myproject.model.entity.UserEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface OrderMapper {
    OrderMapper INSTANCE = Mappers.getMapper(OrderMapper.class);

    @Mapping(source = "id", target = "productId")
    ProductDTO mapProductToProductDTO(Product product);

    @Mapping(source = "id", target = "orderItemId")
    OrderItemDTO mapOrderItemToOrderItemDTO(OrderItem orderItem);

    List<OrderItemDTO> mapOrderItemToOrderItemDTO(List<OrderItem> orderItems);

    @Mapping(source = "id", target = "userId")
    @Mapping(source = "wishList", target = "wishList", ignore = true)
    UserDTO mapToUserDTO(UserEntity user);

    @Mapping(source = "id", target = "orderId")
    OrderDTO convertToOrderDTO(Order order);

}
