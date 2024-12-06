package org.example.myproject.exception;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public enum ErrorCode {
    // Error related to user
    USER_NOT_FOUND("User is not found", HttpStatus.NOT_FOUND),
    USER_EXISTS("Email or username is already exists", HttpStatus.BAD_REQUEST),
    EMAIL_OR_USERNAME_NOT_FOUND("Email or Username does not exist", HttpStatus.NOT_FOUND),
    INCORRECT_PASSWORD("Password is not correct", HttpStatus.BAD_REQUEST),
    INVALID_OTP("Otp is not valid", HttpStatus.BAD_REQUEST),

    // Unauthorized
    INVALID_TOKEN("Token is invalid", HttpStatus.UNAUTHORIZED),
    EXPIRED_OTP("Otp is expired", HttpStatus.UNAUTHORIZED),
    UNAUTHENTICATED("Unauthenticated", HttpStatus.UNAUTHORIZED),

    // Category
    CATEGORY_NOT_FOUND("Category is not found", HttpStatus.NOT_FOUND),

    // Product
    PRODUCT_NOT_FOUND("Product is not found", HttpStatus.NOT_FOUND),
    PRODUCT_NOT_ENOUGH("Product is not enough", HttpStatus.BAD_REQUEST),

    //Cart
    CART_NOT_FOUND("Cart is not found", HttpStatus.NOT_FOUND),

    // Cart item
    CART_ITEM_NOT_FOUND("Cart item is not found", HttpStatus.NOT_FOUND),

    // Order
    ORDER_NOT_FOUND("Order is not found", HttpStatus.NOT_FOUND);
    ErrorCode(String message, HttpStatusCode responseCode){
        this.message = message;
        this.responseCode = responseCode;
    }

    HttpStatusCode responseCode;
    String message;
}
