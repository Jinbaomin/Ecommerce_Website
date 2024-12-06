package org.example.myproject.services;

import org.example.myproject.model.entity.UserEntity;

public interface WishListService {
    public UserEntity addProductToWishList(Long productId);
    public UserEntity deleteProductFromWishList(Long productId);
}
