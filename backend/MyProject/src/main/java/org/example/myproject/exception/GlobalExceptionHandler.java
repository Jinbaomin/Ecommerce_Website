package org.example.myproject.exception;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.DecodingException;
import io.jsonwebtoken.security.SignatureException;
import org.example.myproject.model.dto.GenericApiResponse;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(value = AppException.class)
    ResponseEntity<GenericApiResponse<?>> handleAppException(AppException ex) {
        int statusCode = ex.getErrorCode().getResponseCode().value();
        GenericApiResponse<?> res = GenericApiResponse.builder()
                .statusCode(statusCode)
                .error("App Exception Error")
                .message(ex.getMessage())
                .build();
        return ResponseEntity.status(statusCode).body(res);
    }

    @ExceptionHandler(value = BadCredentialsException.class)
    ResponseEntity<GenericApiResponse<?>> handleBadCredentialsException(BadCredentialsException ex) {
        int statusCode = 400;
        GenericApiResponse<?> res = GenericApiResponse.builder()
                .statusCode(statusCode)
                .error("BadCredentials Exception Error")
                .message(ex.getMessage())
                .build();
        return ResponseEntity.status(statusCode).body(res);
    }

    @ExceptionHandler(value = {
            SignatureException.class,
            MalformedJwtException.class,
            ExpiredJwtException.class,
            UnsupportedJwtException.class,
            IllegalArgumentException.class
    })
    public ResponseEntity<GenericApiResponse<?>> handleJwtException(Exception ex) {
        ErrorCode errorCode = ErrorCode.UNAUTHENTICATED;
        int statusCode = errorCode.getResponseCode().value();
        GenericApiResponse<?> res = GenericApiResponse.builder()
                .statusCode(statusCode)
                .error("Jwt Exception Error")
                .message(errorCode.getMessage())
                .build();
        return ResponseEntity.status(statusCode).body(res);
    }

    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    ResponseEntity<GenericApiResponse<?>> handleValidation(MethodArgumentNotValidException ex) {
        List<String> errors = new ArrayList<>();
        ex.getBindingResult().getAllErrors().forEach(it -> errors.add(it.getDefaultMessage()));
        int statusCode = ex.getStatusCode().value();
        GenericApiResponse<?> res = GenericApiResponse.builder()
                .statusCode(statusCode)
                .error("Validation Error")
                .message(errors.get(0))
                .build();
        return ResponseEntity.status(statusCode).body(res);
    }
}
