package org.example.myproject.repositories;

import org.example.myproject.model.entity.Cart;
import org.example.myproject.model.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart, Long> {
    public Cart findByUser(UserEntity user);
}
