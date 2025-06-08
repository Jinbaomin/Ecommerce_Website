package org.example.myproject.repositories;

import jakarta.validation.constraints.NotNull;
import org.example.myproject.model.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;


public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {
//    public Page<Product> findAll(Pageable pageable);
    public Page<Product> findAll(Specification<Product> spec, Pageable page);

    @Query("select u from Product u where u.productName like concat('%', :name, '%')")
    public Page<Product> findProductWithPartOfName(@Param("name") String name, Pageable pageable);

    @Query("select u from Product u where u.quantity != 0 and u.productName like concat('%', :name, '%')")
    public Page<Product> findByStatusInStock(@Param("name") String name, Pageable pageable);

    @Query("select u from Product u where u.quantity = 0 and u.productName like concat('%', :name, '%')")
    public Page<Product> findByStatusOutOfStock(@Param("name") String name, Pageable pageable);

    @Query("select u from Product u where u.quantity != 0 and u.productName like concat('%', :name, '%')")
    public Page<Product> findByStatusInStockAndWithPartOfName(@Param("name") String name, Pageable pageable);

    @Query("select u from Product u where u.quantity != 0 and u.productName like concat('%', :name, '%') and u.productInfo.brand in :brands")
    public Page<Product> findByStatusInStockAndContainingBrands(@Param("name") String name, @Param("brands") Collection<String> brands, Pageable pageable);

    @Query("select u from Product u where u.quantity = 0 and u.productName like concat('%', :name, '%')")
    public Page<Product> findByStatusOutOfStockAndWithPartOfName(@Param("name") String name, Pageable pageable);

    @Query("select u from Product u where u.quantity = 0 and u.productName like concat('%', :name, '%') and u.productInfo.brand in :brands")
    public Page<Product> findByStatusOutOfStockAndContainingBrands(@Param("name") String name, @Param("brands") Collection<String> brands, Pageable pageable);

    @Query(value = "select p from Product p where p.productName like concat('%', :name, '%') and p.productInfo.brand in :brands")
    public Page<Product> findProductWithPartOfNameAndBrand(@Param("name") String name, @Param("brands") Collection<String> brands, Pageable pageable);
}
