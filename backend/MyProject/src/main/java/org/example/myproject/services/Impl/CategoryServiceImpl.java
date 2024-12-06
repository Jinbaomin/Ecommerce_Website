package org.example.myproject.services.Impl;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.example.myproject.exception.AppException;
import org.example.myproject.exception.ErrorCode;
import org.example.myproject.model.entity.Category;
import org.example.myproject.repositories.CategoryRepository;
import org.example.myproject.services.CategoryService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CategoryServiceImpl implements CategoryService {
    CategoryRepository categoryRepository;

    @Override
    public Category createNewCategory(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public List<Category> getALlCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Category getCategoryById(Long categoryId) {
        Optional<Category> optionalCategory = categoryRepository.findById(categoryId);

        if(optionalCategory.isEmpty()) {
            throw new AppException(ErrorCode.CATEGORY_NOT_FOUND);
        }

        return optionalCategory.get();
    }

    @Override
    public Category updateCategory(Long categoryId, Category category) {
        Category foundCategory = getCategoryById(categoryId);
        foundCategory.setCategoryName(category.getCategoryName());
        return categoryRepository.save(foundCategory);
    }

    @Override
    public void deleteCategory(Long categoryId) {
        Category deletedCategory = getCategoryById(categoryId);
        categoryRepository.delete(deletedCategory);
    }
}
