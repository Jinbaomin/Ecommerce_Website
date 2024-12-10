package org.example.myproject.mapper;

import org.example.myproject.model.dto.request.RegisterInfo;
import org.example.myproject.model.dto.response.CartDTO;
import org.example.myproject.model.dto.response.CartItemDTO;
import org.example.myproject.model.dto.response.ProductDTO;
import org.example.myproject.model.dto.response.UserDTO;
import org.example.myproject.model.entity.Cart;
import org.example.myproject.model.entity.CartItem;
import org.example.myproject.model.entity.Product;
import org.example.myproject.model.entity.UserEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    @Mapping(source = "id", target = "productId")
    ProductDTO mapProductToProductDTO(Product product);

    List<ProductDTO> mapProductListToProductDTOList(List<Product> products);

    @Mapping(source = "id", target = "cartItemId")
    CartItemDTO mapToCartItemDTO(CartItem cartItem);

    @Mapping(source = "id", target = "cartId")
    CartDTO mapToCartDTO(Cart cart);

    @Mapping(source = "id", target = "userId")
    UserDTO convertToUserDTO(UserEntity user);

    UserEntity convertToUserEntity(RegisterInfo info);
}
