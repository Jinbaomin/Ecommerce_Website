package org.example.myproject.mapper;

import org.example.myproject.model.dto.response.ProductDTO;
import org.example.myproject.model.entity.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ProductMapper {
    ProductMapper INSTANCE = Mappers.getMapper(ProductMapper.class);

    @Mapping(source = "id", target = "productId")
    ProductDTO convertToProductDTO(Product product);

    Product convertProductEachOther(Product product);
}
