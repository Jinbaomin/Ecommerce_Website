package org.example.myproject.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.example.myproject.security.SecurityUtils;

import java.time.Instant;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long Id;

    @Column(name = "product_name")
    String productName;

    @Column(name = "price")
    Long price;

    @Column(name = "sale_price")
    Long salePrice;

    @Column(name = "description", columnDefinition = "MEDIUMTEXT")
    String description;

    @Column(name = "quantity")
    int quantity;

    @ManyToOne
    @JoinColumn(name = "category_id")
    Category category;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "product_image", joinColumns = @JoinColumn(name = "product_id"))
    List<String> images;

    @Embedded
    ProductInfo productInfo;

    @ManyToMany(mappedBy = "wishList", fetch = FetchType.LAZY)
    @JsonIgnore
    List<UserEntity> users;

    Instant createdAt;

    String createdBy;

    Instant modifiedAt;

    String modifiedBy;

    @PrePersist
    public void handleBeforeSave() {
        this.createdAt = Instant.now();
        this.createdBy = SecurityUtils.getCurrentUserLogin().isPresent() ? SecurityUtils.getCurrentUserLogin().get() : null;
    }

    @PreUpdate
    public void handleBeforeUpdate() {
        this.modifiedAt = Instant.now();
        this.modifiedBy = SecurityUtils.getCurrentUserLogin().isPresent() ? SecurityUtils.getCurrentUserLogin().get() : null;
    }
}
