package org.example.myproject.services.Impl;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.example.myproject.exception.AppException;
import org.example.myproject.exception.ErrorCode;
import org.example.myproject.mapper.ProductMapper;
import org.example.myproject.model.entity.Category;
import org.example.myproject.model.entity.Product;
import org.example.myproject.repositories.CategoryRepository;
import org.example.myproject.repositories.ProductRepository;
import org.example.myproject.services.CategoryService;
import org.example.myproject.services.ProductService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ProductServiceImpl implements ProductService {
    ProductRepository productRepository;

    CategoryRepository categoryRepository;

    CategoryService categoryService;

    @Override
    public Product createNewProduct(Product product) {
        Category category = categoryService.getCategoryById(product.getCategory().getId());
        product.setCategory(category);

        return productRepository.save(product);
    }

    @Override
    public List<Product> getAllProduct() {
        return productRepository.findAll();
    }

    @Override
    public Product getProductById(Long productId) {
        Optional<Product> optionalProduct = productRepository.findById(productId);

        if(optionalProduct.isEmpty()) {
            throw new AppException(ErrorCode.PRODUCT_NOT_FOUND);
        }

        return optionalProduct.get();
    }

    @Override
    public Product updateProduct(Long productId, Product product) {
        Product foundProduct = getProductById(productId);
        foundProduct.setProductName(product.getProductName());
        foundProduct.setQuantity(product.getQuantity());
        foundProduct.setPrice(product.getPrice());
        foundProduct.setSalePrice(product.getSalePrice());
        foundProduct.setDescription(product.getDescription());
        foundProduct.setProductInfo(product.getProductInfo());
        return productRepository.save(foundProduct);
    }

    @Override
    public void deleteProduct(Long productId) {
        Product product = getProductById(productId);
        productRepository.delete(product);
    }
}

