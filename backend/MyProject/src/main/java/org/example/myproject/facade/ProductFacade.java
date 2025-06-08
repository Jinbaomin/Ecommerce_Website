package org.example.myproject.facade;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.example.myproject.mapper.ProductMapper;
import org.example.myproject.model.dto.GenericApiResponse;
import org.example.myproject.model.dto.response.PaginationResult;
import org.example.myproject.model.dto.response.ProductDTO;
import org.example.myproject.model.entity.Product;
import org.example.myproject.services.ProductService;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ProductFacade {
    ProductService productService;

    public GenericApiResponse<Product> createNewProduct(Product product) {
        return GenericApiResponse.<Product>builder()
                .statusCode(200)
                .message("Create a product successfully")
                .data(productService.createNewProduct(product))
                .build();
    }

    public GenericApiResponse<PaginationResult> getAllProduct(
            int page,
            int pageSize,
            String sortedBy,
            String stock,
            String name,
            String brand,
            String hasRam,
            String hasRom,
            String minPrice,
            String maxPrice
    ) {
        List<String> arr = List.of(sortedBy.split(","));
//        Collection<String> brands = brand.isEmpty() ? null : List.of(brand.split(","));
        List<String> brands = brand.isEmpty() ? null : List.of(brand.split(","));
        PaginationResult result = productService.getAllProducts(
                page,
                pageSize,
                arr.get(0),
                arr.get(1),
                stock,
                name,
                brands,
                hasRam,
                hasRom,
                minPrice,
                maxPrice
        );
        List<Product> products = (List<Product>) result.getData();
        List<ProductDTO> productDTOS = products.stream().map(ProductMapper.INSTANCE::convertToProductDTO).collect(Collectors.toList());
        result.setData(productDTOS);
        return GenericApiResponse.<PaginationResult>builder()
                .statusCode(200)
                .message("Get all products successfully")
                .data(result)
                .build();
    }

    public GenericApiResponse<ProductDTO> getProductById(Long productId) {
        Product product = productService.getProductById(productId);
        ProductDTO productDTO = ProductMapper.INSTANCE.convertToProductDTO(product);
        return GenericApiResponse.<ProductDTO>builder()
                .statusCode(200)
                .message("Get product successfully")
                .data(productDTO)
                .build();
    }

    public GenericApiResponse<ProductDTO> updateProduct(Long productId, Product product) {
        Product updatedProduct = productService.updateProduct(productId, product);
        ProductDTO productDTO = ProductMapper.INSTANCE.convertToProductDTO(updatedProduct);
        return GenericApiResponse.<ProductDTO>builder()
                .statusCode(200)
                .message("Update product successfully")
                .data(productDTO)
                .build();
    }

    public GenericApiResponse<Void> deleteProduct(Long productId) {
        productService.deleteProduct(productId);
        return GenericApiResponse.<Void>builder()
                .statusCode(200)
                .message("Delete product successfully")
                .data(null)
                .build();
    }
}
