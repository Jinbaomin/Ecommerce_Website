package org.example.myproject.mapper;

import org.example.myproject.model.dto.response.OrderDTO;
import org.example.myproject.model.entity.Order;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface OrderMapper {
    OrderMapper INSTANCE = Mappers.getMapper(OrderMapper.class);

    @Mapping(source = "id", target = "orderId")
    OrderDTO convertToOrderDTO(Order order);
}
