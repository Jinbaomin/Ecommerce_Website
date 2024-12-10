package org.example.myproject.services;

import org.example.myproject.model.dto.response.PaginationResult;
import org.example.myproject.model.entity.Category;
import org.example.myproject.model.entity.Product;

import java.util.List;

public interface ProductService {
    public Product createNewProduct(Product product);
    public PaginationResult getAllProduct(int page, int pageSize, String sortBy, String option, String stock, String name);
    public Product getProductById(Long productId);
    public Product updateProduct(Long productId, Product product);
    public void deleteProduct(Long productId);
}
