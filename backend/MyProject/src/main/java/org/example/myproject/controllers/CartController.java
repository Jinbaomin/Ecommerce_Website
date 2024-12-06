package org.example.myproject.controllers;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.example.myproject.facade.CartFacade;
import org.example.myproject.model.dto.GenericApiResponse;
import org.example.myproject.model.dto.request.AddProductToCart;
import org.example.myproject.model.dto.request.UpdateCartItem;
import org.example.myproject.model.entity.Cart;
import org.example.myproject.model.entity.CartItem;
import org.example.myproject.services.CartService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/cart")
public class CartController {
    CartFacade cartFacade;

    @PostMapping("")
    public ResponseEntity<GenericApiResponse<Cart>> addProductToCart(
            @RequestBody AddProductToCart body
            ) {
        return ResponseEntity.ok(cartFacade.addProductToCart(body.getProductId()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<GenericApiResponse<Cart>> findCartById(
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(cartFacade.findCartById(id));
    }

    @GetMapping("")
    public ResponseEntity<GenericApiResponse<Cart>> getCartByUser() {
        return ResponseEntity.ok(cartFacade.getCartByUser());
    }

    @PutMapping("/cartItem/{cartItemId}")
    public ResponseEntity<GenericApiResponse<Cart>> updateCartItem(
            @PathVariable Long cartItemId,
            @RequestBody UpdateCartItem body
    ) {
        return ResponseEntity.ok(cartFacade.updateCartItem(cartItemId, body.getQuantity()));
    }

    @DeleteMapping("/cartItem/{cartItemId}")
    public ResponseEntity<GenericApiResponse<Cart>> deleteCartItem(
            @PathVariable Long cartItemId
    ) {
        return ResponseEntity.ok(cartFacade.deleteCartItem(cartItemId));
    }

    @DeleteMapping("")
    public ResponseEntity<GenericApiResponse<Void>> clearCart() {
        return ResponseEntity.ok(cartFacade.clearCart());
    }
}
