package org.example.myproject.controllers;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.example.myproject.facade.ProductFacade;
import org.example.myproject.model.dto.GenericApiResponse;
import org.example.myproject.model.dto.response.ProductDTO;
import org.example.myproject.model.entity.Product;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/product")
public class ProductController {
    ProductFacade productFacade;

    @GetMapping("")
    public ResponseEntity<GenericApiResponse<List<ProductDTO>>> getAllProduct() {
        return ResponseEntity.ok(productFacade.getAllProduct());
    }

    @PostMapping("")
    public ResponseEntity<GenericApiResponse<Product>> createNewProduct(@RequestBody Product body) {
        return ResponseEntity.ok(productFacade.createNewProduct(body));
    }

    @GetMapping("/{id}")
    public ResponseEntity<GenericApiResponse<ProductDTO>> getProductById(
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(productFacade.getProductById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<GenericApiResponse<ProductDTO>> updateProduct(
            @PathVariable Long id,
            @RequestBody Product product
    ) {
        return ResponseEntity.ok(productFacade.updateProduct(id, product));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<GenericApiResponse<Void>> deleteProduct(
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(productFacade.deleteProduct(id));
    }
}
