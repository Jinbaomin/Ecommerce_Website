package org.example.myproject.facade;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.example.myproject.model.dto.GenericApiResponse;
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

    public GenericApiResponse<List<Category>> getAllCategories() {
        return GenericApiResponse.<List<Category>>builder()
                .statusCode(200)
                .message("Get all categories successfully")
                .data(categoryService.getALlCategories())
                .build();
    }

    public GenericApiResponse<Category> getCategoryById(Long categoryId) {
        return GenericApiResponse.<Category>builder()
                .statusCode(200)
                .message("Get category successfully")
                .data(categoryService.getCategoryById(categoryId))
                .build();
    }

    public GenericApiResponse<Category> updateCategory(Long categoryId, Category category) {
        Category updatedCategory = categoryService.updateCategory(categoryId, category);
        return GenericApiResponse.<Category>builder()
                .statusCode(200)
                .message("Update category successfully")
                .data(updatedCategory)
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
