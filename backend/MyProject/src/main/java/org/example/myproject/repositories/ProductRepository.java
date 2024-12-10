package org.example.myproject.repositories;

import org.example.myproject.model.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query("select u from Product u where u.productName like concat('%', :name, '%')")
    public Page<Product> findProductWithPartOfName(@Param("name") String name, Pageable pageable);

    @Query("select u from Product u where u.quantity != 0")
    public Page<Product> findByStatusInStock(Pageable pageable);

    @Query("select u from Product u where u.quantity = 0")
    public Page<Product> findByStatusOutOfStock(Pageable pageable);

    @Query("select u from Product u where u.quantity != 0 and u.productName like concat('%', :name, '%')")
    public Page<Product> findByStatusInStockAndWithPartOfName(@Param("name") String name, Pageable pageable);

    @Query("select u from Product u where u.quantity = 0 and u.productName like concat('%', :name, '%')")
    public Page<Product> findByStatusOutOfStockAndWithPartOfName(@Param("name") String name, Pageable pageable);
}
