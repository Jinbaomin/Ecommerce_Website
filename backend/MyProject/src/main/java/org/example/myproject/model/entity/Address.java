package org.example.myproject.model.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "addresses")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long Id;

    String street;

    String ward;

    String district;

    String city;

    boolean active;

    @ManyToOne
    @JoinColumn(name = "user_id")
    UserEntity user;
}
