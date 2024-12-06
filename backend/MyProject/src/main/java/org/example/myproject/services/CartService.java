package org.example.myproject.services;

import org.example.myproject.model.entity.Cart;
import org.example.myproject.model.entity.CartItem;

public interface CartService {
    public Cart getCurrentCart();
    public Cart updateCartItem(Long cartItemId, int quantity);
    public Cart deleteCartItem(Long cartItemId);
    public Cart addProductToCart(Long productId);
    public Cart findCartById(Long cartId);
    public Cart getCartByUser();
    public void clearCart();
}
