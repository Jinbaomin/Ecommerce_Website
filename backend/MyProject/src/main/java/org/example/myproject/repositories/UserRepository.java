package org.example.myproject.repositories;

import org.example.myproject.model.entity.UserEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByEmail(String email);
    Optional<UserEntity> findByUserName(String username);
    boolean existsByEmailOrUserName(String email, String username);
    List<UserEntity> findByEmailOrUserName(String email, String username);
    Page<UserEntity> findByEmailOrUserName(String email, String username, Pageable pageable);
}
