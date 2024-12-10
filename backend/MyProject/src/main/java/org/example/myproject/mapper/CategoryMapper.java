package org.example.myproject.mapper;

import org.example.myproject.model.dto.response.CategoryDTO;
import org.example.myproject.model.entity.Category;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface CategoryMapper {
    CategoryMapper INSTANCE = Mappers.getMapper(CategoryMapper.class);

    @Mapping(source = "id", target = "categoryId")
    CategoryDTO mapToCategoryDTO(Category category);
}
