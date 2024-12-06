package org.example.myproject.services;

import org.example.myproject.model.entity.Category;
import org.example.myproject.model.entity.Product;

import java.util.List;

public interface ProductService {
    public Product createNewProduct(Product product);
    public List<Product> getAllProduct();
    public Product getProductById(Long productId);
    public Product updateProduct(Long productId, Product product);
    public void deleteProduct(Long productId);
}
