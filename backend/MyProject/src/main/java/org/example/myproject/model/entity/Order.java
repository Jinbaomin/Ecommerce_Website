package org.example.myproject.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long Id;

    @ManyToOne
    @JsonIgnoreProperties(value = {"orders", "cart", "wishList"})
//    @JsonIgnore
    UserEntity user;

    @Column(name = "total")
    Long total;

    @OneToMany(mappedBy = "order", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    List<OrderItem> orderItems;

    @Column(name = "status")
    String status;

    @Embedded
    OrderInfo orderInfo;

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
