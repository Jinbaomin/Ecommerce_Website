package org.example.myproject.facade;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.example.myproject.model.dto.GenericApiResponse;
import org.example.myproject.model.entity.UserEntity;
import org.example.myproject.services.WishListService;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class WishListFacade {
    WishListService wishListService;

    public GenericApiResponse<UserEntity> addProductToWishList(Long productId) {
        return GenericApiResponse.<UserEntity>builder()
                .statusCode(200)
                .message("Add product to wish list successfully")
                .data(wishListService.addProductToWishList(productId))
                .build();
    }

    public GenericApiResponse<UserEntity> deleteProductFromWishList(Long productId) {
        return GenericApiResponse.<UserEntity>builder()
                .statusCode(200)
                .message("Delete product from wish list successfully")
                .data(wishListService.deleteProductFromWishList(productId))
                .build();
    }
}
