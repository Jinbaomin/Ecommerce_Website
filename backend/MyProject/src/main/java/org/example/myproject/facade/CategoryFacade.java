package org.example.myproject.facade;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.example.myproject.mapper.CategoryMapper;
import org.example.myproject.model.dto.GenericApiResponse;
import org.example.myproject.model.dto.response.CategoryDTO;
import org.example.myproject.model.entity.Category;
import org.example.myproject.services.CategoryService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CategoryFacade {
    CategoryService categoryService;

    public GenericApiResponse<Category> createNewCategory(Category category) {
        return GenericApiResponse.<Category>builder()
                .statusCode(200)
                .message("Create a new category successfully")
                .data(categoryService.createNewCategory(category))
                .build();
    }

    public GenericApiResponse<List<CategoryDTO>> getAllCategories() {
        List<Category> categories = categoryService.getALlCategories();
        List<CategoryDTO> categoryDTOList = categories.stream().map(CategoryMapper.INSTANCE::mapToCategoryDTO).toList();

        return GenericApiResponse.<List<CategoryDTO>>builder()
                .statusCode(200)
                .message("Get all categories successfully")
                .data(categoryDTOList)
                .build();
    }

    public GenericApiResponse<CategoryDTO> getCategoryById(Long categoryId) {
        return GenericApiResponse.<CategoryDTO>builder()
                .statusCode(200)
                .message("Get category successfully")
                .data(CategoryMapper.INSTANCE.mapToCategoryDTO(categoryService.getCategoryById(categoryId)))
                .build();
    }

    public GenericApiResponse<CategoryDTO> updateCategory(Long categoryId, Category category) {
        Category updatedCategory = categoryService.updateCategory(categoryId, category);
        return GenericApiResponse.<CategoryDTO>builder()
                .statusCode(200)
                .message("Update category successfully")
                .data(CategoryMapper.INSTANCE.mapToCategoryDTO(updatedCategory))
                .build();
    }

    public GenericApiResponse<Void> deleteCategory(Long categoryId) {
        categoryService.deleteCategory(categoryId);
        return GenericApiResponse.<Void>builder()
                .statusCode(200)
                .message("Delete category successfully")
                .data(null)
                .build();
    }
}
