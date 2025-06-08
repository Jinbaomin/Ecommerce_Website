package org.example.myproject.services.Impl;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.example.myproject.exception.AppException;
import org.example.myproject.exception.ErrorCode;
import org.example.myproject.model.dto.response.PaginationResult;
import org.example.myproject.model.entity.Category;
import org.example.myproject.model.entity.Product;
import org.example.myproject.repositories.CategoryRepository;
import org.example.myproject.repositories.ProductRepository;
import org.example.myproject.services.CategoryService;
import org.example.myproject.services.ProductService;
import org.example.myproject.services.specifications.ProductSpecs;
import org.example.myproject.services.specifications.SpecificationCombiner;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
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
    public PaginationResult getAllProduct(int page, int pageSize, String sortBy, String option, String stock, String name, Collection<String> brands) {
        Pageable pageable = PageRequest.of(page - 1, pageSize,
                option.equals("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending());
        Page<Product> listPage;
        if(brands != null && !stock.isEmpty()) {
            if(stock.equals("in_stock")) {
                listPage = productRepository.findByStatusInStockAndContainingBrands(name, brands, pageable);
            } else {
                listPage = productRepository.findByStatusOutOfStockAndContainingBrands(name, brands, pageable);
            }
        } else if(brands != null) {
            listPage = productRepository.findProductWithPartOfNameAndBrand(name, brands, pageable);
//            listPage = productRepository.findAll(ProductSpecs.brandInArrayList(brands), pageable);
        } else if(!stock.isEmpty()) {
            if(stock.equals("in_stock")) {
                listPage = productRepository.findByStatusInStock(name, pageable);
            } else {
                listPage = productRepository.findByStatusOutOfStock(name, pageable);
            }
        } else {
            listPage = productRepository.findProductWithPartOfName(name, pageable);
//            listPage = productRepository.findAll(ProductSpecs.nameLike(name), pageable);
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
    public PaginationResult getAllProducts(
            int page,
            int pageSize,
            String sortBy,
            String option,
            String stock,
            String name,
            List<String> brands,
            String hasRam,
            String hasRom,
            String minPrice,
            String maxPrice
    ) {
        Pageable pageable = PageRequest.of(page - 1, pageSize,
                option.equals("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending());
//        Specification<Product> spec = Specification.where(null);
//
//        if(name.isEmpty()) {
//            spec = spec.and(ProductSpecs.nameLike(name));
//        } else if (brands.isEmpty()) {
//            spec = spec.and(ProductSpecs.brandInArrayList(brands));
//        }
//
//        Page<Product> listPage = productRepository.findAll(spec, pageable);

        List<Specification<Product>> specs = new ArrayList<>();

        if(!name.isEmpty()) specs.add(ProductSpecs.nameLike(name));
        if(brands != null) specs.add(ProductSpecs.brandInArrayList(brands));
        if(!stock.isEmpty()) specs.add(ProductSpecs.productIsStock(stock));
        if(!hasRam.isEmpty()) specs.add(ProductSpecs.productHasRam(hasRam));
        if(!hasRom.isEmpty()) specs.add(ProductSpecs.productHasRom(hasRom));

        specs.add(ProductSpecs.productHasPriceInRange(
                minPrice.isEmpty() ? null : Integer.parseInt(minPrice),
                maxPrice.isEmpty() ? null : Integer.parseInt(maxPrice)
        ));

        Specification<Product> combinedSpec = SpecificationCombiner.and(specs);

        Page<Product> listPage = productRepository.findAll(combinedSpec, pageable);

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

