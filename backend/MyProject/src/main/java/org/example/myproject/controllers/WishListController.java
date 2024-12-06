package org.example.myproject.controllers;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.example.myproject.facade.WishListFacade;
import org.example.myproject.model.dto.GenericApiResponse;
import org.example.myproject.model.dto.request.WishListRequest;
import org.example.myproject.model.entity.UserEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/wishlist")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class WishListController {
    WishListFacade wishListFacade;

    @PostMapping("/{productId}")
    public ResponseEntity<GenericApiResponse<UserEntity>> addProductToWishList(
            //@RequestBody WishListRequest body
            @PathVariable Long productId
    ) {
        return ResponseEntity.ok(wishListFacade.addProductToWishList(productId));
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<GenericApiResponse<UserEntity>> deleteProductFromWishList(
            //@RequestBody WishListRequest body
            @PathVariable Long productId
    ) {
        return ResponseEntity.ok(wishListFacade.deleteProductFromWishList(productId));
    }
}
