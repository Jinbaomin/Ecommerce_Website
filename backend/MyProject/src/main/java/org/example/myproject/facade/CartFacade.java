package org.example.myproject.facade;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.example.myproject.model.dto.GenericApiResponse;
import org.example.myproject.model.entity.Cart;
import org.example.myproject.model.entity.CartItem;
import org.example.myproject.services.CartService;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CartFacade {
    CartService cartService;

    public GenericApiResponse<Cart> addProductToCart(Long productId) {
        return GenericApiResponse.<Cart>builder()
                .statusCode(200)
                .message("Add product to cart successfully")
                .data(cartService.addProductToCart(productId))
                .build();
    }

    public GenericApiResponse<Cart> updateCartItem(Long cartItemId, int quantity) {
        return GenericApiResponse.<Cart>builder()
                .statusCode(200)
                .message("Update cart item successfully")
                .data(cartService.updateCartItem(cartItemId, quantity))
                .build();
    }

    public GenericApiResponse<Cart> deleteCartItem(Long cartItemId) {
        return GenericApiResponse.<Cart>builder()
                .statusCode(200)
                .message("Delete cart item successfully")
                .data(cartService.deleteCartItem(cartItemId))
                .build();
    }

    public GenericApiResponse<Cart> findCartById(Long cartId) {
        return GenericApiResponse.<Cart>builder()
                .statusCode(200)
                .message("Find cart successfully")
                .data(cartService.findCartById(cartId))
                .build();
    }

    public GenericApiResponse<Cart> getCartByUser() {
        return GenericApiResponse.<Cart>builder()
                .statusCode(200)
                .message("Get cart successfully")
                .data(cartService.getCurrentCart())
                .build();
    }

    public GenericApiResponse<Void> clearCart() {
        cartService.clearCart();
        return GenericApiResponse.<Void>builder()
                .statusCode(200)
                .message("Clear cart successfully")
                .data(null)
                .build();
    }
}
