package org.example.myproject.controllers;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.example.myproject.facade.CategoryFacade;
import org.example.myproject.model.dto.GenericApiResponse;
import org.example.myproject.model.entity.Category;
import org.example.myproject.services.CategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/category")
public class CategoryController {
    CategoryFacade categoryFacade;

    @PostMapping("")
    public ResponseEntity<GenericApiResponse<Category>> createNewCategory(@RequestBody Category body) {
        return ResponseEntity.ok(categoryFacade.createNewCategory(body));
    }

    @GetMapping("")
    public ResponseEntity<GenericApiResponse<List<Category>>> getAllCategories() {
        return ResponseEntity.ok(categoryFacade.getAllCategories());
    }

    @GetMapping("/{id}")
    public ResponseEntity<GenericApiResponse<Category>> getCategoryById(
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(categoryFacade.getCategoryById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<GenericApiResponse<Category>> updateCategory(
            @RequestBody Category category,
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(categoryFacade.updateCategory(id, category));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<GenericApiResponse<Void>> updateCategory(
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(categoryFacade.deleteCategory(id));
    }
}
