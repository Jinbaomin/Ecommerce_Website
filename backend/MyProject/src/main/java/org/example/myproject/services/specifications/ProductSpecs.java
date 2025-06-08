package org.example.myproject.services.specifications;

import jakarta.persistence.criteria.Expression;
import jakarta.persistence.criteria.Path;
import org.example.myproject.model.entity.Product;
import org.example.myproject.model.entity.ProductInfo;
import org.example.myproject.model.entity.ProductInfo_;
import org.example.myproject.model.entity.Product_;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.Collection;

public class ProductSpecs {
    public static Specification<Product> nameLike(String name) {
        return (root, query, criteriaBuilder)
                -> criteriaBuilder.like(root.get(Product_.PRODUCT_NAME), "%" + name + "%");
    }

    public static Specification<Product> brandInArrayList(Collection<String> brands) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.in(root.get(Product_.PRODUCT_INFO).get(ProductInfo_.BRAND)).value(brands);
//        return (root, query, criteriaBuilder) -> {
//            Path<Product> productPath = root.get(Product_.PRODUCT_INFO).get(ProductInfo_.BRAND);
//            return productPath.in(brands);
//        };
    }

    public static Specification<Product> productIsStock(String isStock) {
        if(isStock.equals("in_stock")) {
            return (root, query, criteriaBuilder)
                    -> criteriaBuilder.gt(root.get(Product_.QUANTITY), 0);
        } else {
            return (root, query, criteriaBuilder)
                    -> criteriaBuilder.equal(root.get(Product_.QUANTITY), 0);
        }
    }

    public static Specification<Product> productHasRam(String ram) {
        return (root, query, criteriaBuilder)
                -> criteriaBuilder.like(
                        criteriaBuilder.lower(root.get(Product_.PRODUCT_INFO).get(ProductInfo_.RAM)), "%" + ram.trim().toLowerCase() + "%"
        );
    }

    public static Specification<Product> productHasRom(String rom) {
        return (root, query, criteriaBuilder)
                -> criteriaBuilder.like(
                        criteriaBuilder.lower(root.get(Product_.PRODUCT_INFO).get(ProductInfo_.ROM)), "%" + rom.trim().toLowerCase() + "%"
        );
    }

    public static Specification<Product> productHasPriceInRange(Integer minPrice, Integer maxPrice) {
        if(minPrice != null && maxPrice != null) {
            return (root, query, criteriaBuilder)
                    -> criteriaBuilder.between(root.get(Product_.SALE_PRICE), minPrice, maxPrice);
        } else if(minPrice != null) {
            return (root, query, criteriaBuilder)
                    -> criteriaBuilder.greaterThanOrEqualTo(root.get(Product_.SALE_PRICE), minPrice);
        } else if(maxPrice != null) {
            return (root, query, criteriaBuilder)
                    -> criteriaBuilder.lessThanOrEqualTo(root.get(Product_.SALE_PRICE), maxPrice);
        }

        return null;
    }
}
