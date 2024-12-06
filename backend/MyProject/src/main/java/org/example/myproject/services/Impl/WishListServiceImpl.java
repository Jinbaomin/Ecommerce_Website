package org.example.myproject.services.Impl;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.example.myproject.model.entity.Product;
import org.example.myproject.model.entity.UserEntity;
import org.example.myproject.repositories.UserRepository;
import org.example.myproject.security.SecurityUtils;
import org.example.myproject.services.ProductService;
import org.example.myproject.services.UserService;
import org.example.myproject.services.WishListService;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class WishListServiceImpl implements WishListService {
    ProductService productService;

    UserService userService;

    UserRepository userRepository;

    @Override
    public UserEntity addProductToWishList(Long productId) {
        Product product = productService.getProductById(productId);

        // get current user
        String email = SecurityUtils.getCurrentUserLogin().get();
        UserEntity user = userService.findUserByEmailOrUserName(email);

        user.getWishList().add(product);

        return userRepository.save(user);
    }

    @Override
    public UserEntity deleteProductFromWishList(Long productId) {
        Product product = productService.getProductById(productId);

        // get current user
        String email = SecurityUtils.getCurrentUserLogin().get();
        UserEntity user = userService.findUserByEmailOrUserName(email);

        user.getWishList().remove(product);

        return userRepository.save(user);
    }
}
