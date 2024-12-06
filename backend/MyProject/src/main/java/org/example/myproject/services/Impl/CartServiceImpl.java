package org.example.myproject.services.Impl;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.example.myproject.exception.AppException;
import org.example.myproject.exception.ErrorCode;
import org.example.myproject.model.entity.Cart;
import org.example.myproject.model.entity.CartItem;
import org.example.myproject.model.entity.Product;
import org.example.myproject.model.entity.UserEntity;
import org.example.myproject.repositories.CartItemRepository;
import org.example.myproject.repositories.CartRepository;
import org.example.myproject.security.SecurityUtils;
import org.example.myproject.services.CartService;
import org.example.myproject.services.ProductService;
import org.example.myproject.services.UserService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CartServiceImpl implements CartService {
    UserService userService;

    ProductService productService;

    CartItemRepository cartItemRepository;

    CartRepository cartRepository;

    @Override
    public Cart getCurrentCart() {
        String email = SecurityUtils.getCurrentUserLogin().get();
        UserEntity user = userService.findUserByEmailOrUserName(email);
        return user.getCart();
    }

    @Override
    public Cart updateCartItem(Long cartItemId, int quantity) {
        // Update Cart Item
        Optional<CartItem> cartItemOptional = cartItemRepository.findById(cartItemId);

        if(cartItemOptional.isEmpty()) {
            throw new AppException(ErrorCode.CART_ITEM_NOT_FOUND);
        }

        CartItem cartItem = cartItemOptional.get();

        if(cartItem.getQuantity() == 1 && quantity == -1) {
            return deleteCartItem(cartItemId);
        }

        int newQuantity = cartItem.getQuantity() + quantity;
        cartItem.setQuantity(newQuantity);
        cartItem.setTotal(newQuantity * (cartItem.getProduct().getSalePrice() != null ?
                cartItem.getProduct().getSalePrice() :
                cartItem.getProduct().getPrice()));
        CartItem updatedCartItem = cartItemRepository.save(cartItem);

        // Update Cart
        Cart cart = getCurrentCart();
        Long totalCart = cart.getTotal();
        totalCart += (updatedCartItem.getProduct().getSalePrice() != null ?
                updatedCartItem.getProduct().getSalePrice() :
                updatedCartItem.getProduct().getPrice()) * quantity;
        cart.setTotal(totalCart);

        return cartRepository.save(cart);
    }

    @Override
    public Cart deleteCartItem(Long cartItemId) {
        Optional<CartItem> cartItemOptional = cartItemRepository.findById(cartItemId);

        if(cartItemOptional.isEmpty()) {
            throw new AppException(ErrorCode.CART_ITEM_NOT_FOUND);
        }

        CartItem cartItem = cartItemOptional.get();

        cartItemRepository.delete(cartItemOptional.get());

        // Update Cart
        Cart cart = getCurrentCart();
        Long totalCart = cart.getTotal();
        totalCart -= (cartItem.getProduct().getSalePrice() != null ?
                cartItem.getProduct().getSalePrice() :
                cartItem.getProduct().getPrice()) * cartItem.getQuantity();
        cart.setTotal(totalCart);

        return cartRepository.save(cart);
    }

    @Override
    public Cart addProductToCart(Long productId) {
        Product product = productService.getProductById(productId);

        Cart cart = getCurrentCart();
        Long totalCart = cart.getCartItems().isEmpty() ? 0L : cart.getTotal();

        for(CartItem cartItem : cart.getCartItems()) {
            if(cartItem.getProduct().equals(product)) {
                return updateCartItem(cartItem.getId(), 1);
            }
        }

        CartItem cartItem = CartItem.builder()
                .cart(cart)
                .product(product)
                .quantity(1)
                .total(product.getSalePrice() != null ?
                        product.getSalePrice() :
                        product.getPrice())
                .build();
        CartItem savedCartItem = cartItemRepository.save(cartItem);

        totalCart += savedCartItem.getTotal();
        cart.setTotal(totalCart);
        cart.getCartItems().add(cartItem);

        return cartRepository.save(cart);
    }

    @Override
    public Cart findCartById(Long cartId) {
        Optional<Cart> optionalCart = cartRepository.findById(cartId);

        if(optionalCart.isEmpty()) {
            throw new AppException(ErrorCode.CART_NOT_FOUND);
        }

        return optionalCart.get();
    }

    @Override
    public Cart getCartByUser() {
        String email = SecurityUtils.getCurrentUserLogin().get();
        UserEntity user = userService.findUserByEmailOrUserName(email);
        return cartRepository.findByUser(user);
    }

    @Override
    public void clearCart() {
        Cart cart = getCurrentCart();
        cart.getCartItems().clear();
        cart.setTotal(0L);
        cartRepository.save(cart);
    }
}
