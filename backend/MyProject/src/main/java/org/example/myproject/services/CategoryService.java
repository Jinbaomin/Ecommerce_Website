package org.example.myproject.services;

import org.example.myproject.model.entity.Category;

import java.util.List;

public interface CategoryService {
    public Category createNewCategory(Category category);
    public List<Category> getALlCategories();
    public Category getCategoryById(Long categoryId);
    public Category updateCategory(Long categoryId, Category category);
    public void deleteCategory(Long categoryId);
}
