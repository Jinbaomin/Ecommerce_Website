package org.example.myproject.services;

import org.example.myproject.model.dto.response.PaginationResult;
import org.example.myproject.model.entity.Category;
import org.example.myproject.model.entity.Product;

import java.util.Collection;
import java.util.List;

public interface ProductService {
    public Product createNewProduct(Product product);
    public PaginationResult getAllProduct(int page, int pageSize, String sortBy, String option, String stock, String name, Collection<String> brands);
    public PaginationResult getAllProducts(int page, int pageSize, String sortBy, String options, String stock, String name, List<String> brands, String hasRam, String hasRom, String minPrice, String maxPrice);
    public Product getProductById(Long productId);
    public Product updateProduct(Long productId, Product product);
    public void deleteProduct(Long productId);
}
