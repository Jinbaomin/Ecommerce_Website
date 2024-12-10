package org.example.myproject.services.Impl;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.example.myproject.exception.AppException;
import org.example.myproject.exception.ErrorCode;
import org.example.myproject.mapper.ProductMapper;
import org.example.myproject.model.dto.response.PaginationResult;
import org.example.myproject.model.entity.Category;
import org.example.myproject.model.entity.Product;
import org.example.myproject.repositories.CategoryRepository;
import org.example.myproject.repositories.ProductRepository;
import org.example.myproject.services.CategoryService;
import org.example.myproject.services.ProductService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
    public PaginationResult getAllProduct(int page, int pageSize, String sortBy, String option, String stock, String name) {
        Pageable pageable = PageRequest.of(page - 1, pageSize,
                option.equals("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending());
        Page<Product> listPage;
        if(!name.isEmpty() && !stock.isEmpty()) {
            if(stock.equals("in_stock")) {
                listPage = productRepository.findByStatusInStockAndWithPartOfName(name, pageable);
            } else {
                listPage = productRepository.findByStatusOutOfStockAndWithPartOfName(name, pageable);
            }
        } else if(!name.isEmpty()) {
            listPage = productRepository.findProductWithPartOfName(name, pageable);
        } else if(!stock.isEmpty()) {
            if(stock.equals("in_stock")) {
                listPage = productRepository.findByStatusInStock(pageable);
            } else {
                listPage = productRepository.findByStatusOutOfStock(pageable);
            }
        } else {
            listPage = productRepository.findAll(pageable);
        }

        PaginationResult.Meta meta = PaginationResult.Meta.builder()
                .page(listPage.getNumber() + 1)
                .pageSize(listPage.getSize())
                .amountPage(listPage.getTotalPages())
                .total(listPage.getTotalElements())
                .build();
        return PaginationResult.builder()
                .meta(meta)
                .data(listPage.getContent())
                .build();
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

        Optional<Category> categoryOptional = categoryRepository.findById(product.getCategory().getId());
        if(categoryOptional.isEmpty()) {
            throw new AppException(ErrorCode.CATEGORY_NOT_FOUND);
        }

        foundProduct.setCategory(categoryOptional.get());
        foundProduct.setProductName(product.getProductName());
        foundProduct.setQuantity(product.getQuantity());
        foundProduct.setPrice(product.getPrice());
        foundProduct.setSalePrice(product.getSalePrice());
        foundProduct.setDescription(product.getDescription());
        foundProduct.setProductInfo(product.getProductInfo());
        foundProduct.setImages(product.getImages());
        return productRepository.save(foundProduct);
    }

    @Override
    public void deleteProduct(Long productId) {
        Product product = getProductById(productId);
        productRepository.delete(product);
    }
}

