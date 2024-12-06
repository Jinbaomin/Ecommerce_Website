package org.example.myproject.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.example.myproject.enums.Role;
import java.time.Instant;
import java.util.List;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Table(name = "users")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long Id;

    String fullName;

    String email;

    String phone;

    String userName;

    String password;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "roles", joinColumns = @JoinColumn(name = "user_id"))
    @Enumerated(EnumType.STRING)
    Set<Role> roles;

    @JsonIgnoreProperties(value = {"user"})
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    List<Address> addressList;

    @Column(columnDefinition = "MEDIUMTEXT")
    String refreshToken;

    @Embedded
    OTP otp;

    @OneToOne(cascade = CascadeType.ALL)
    Cart cart;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    List<Order> orders;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "product_wishlist",
            joinColumns = @JoinColumn(name = "wishlist_id"),
            inverseJoinColumns = @JoinColumn(name = "product_id")
    )
    List<Product> wishList;

    Instant createdDate;

    Instant lastModifiedDate;

    String modifiedBy;

    @PrePersist
    public void handleBeforePersist() {
        this.createdDate = Instant.now();
    }

    @PreUpdate
    public void handleBeforeUpdate() {
        this.lastModifiedDate = Instant.now();
    }
}
