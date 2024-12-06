package org.example.myproject.security;


import io.jsonwebtoken.*;
import io.jsonwebtoken.io.DecodingException;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.example.myproject.exception.AppException;
import org.example.myproject.exception.ErrorCode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE)
public class JwtProvider {
    @Value("${jwt.secret_key}")
    String secret_key;

    @Value("${jwt.expiration_time}")
    String expiration_time;

    public static SecretKey getSignKey(String key) {
        byte[] keyByte = key.getBytes();
        return Keys.hmacShaKeyFor(keyByte);
    }

    public String generateAccessToken(Authentication auth) {
        List<String> authorities = auth.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        return Jwts.builder()
                .signWith(getSignKey(secret_key))
                .setSubject(auth.getName())
                .claim("authorities", authorities)
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime() + Long.parseLong(expiration_time)))
                .compact();
    }

    public String generateRefreshToken(Authentication auth) {
        List<String> authorities = auth.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        return Jwts.builder()
                .signWith(getSignKey(secret_key))
                .setSubject(auth.getName())
                .claim("authorities", authorities)
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime() + Long.parseLong(expiration_time) * 100L))
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(getSignKey(secret_key))
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (SignatureException e) {
//            logger.error("Invalid JWT signature -> Message: ", e);
        } catch (MalformedJwtException e) {
//            logger.error("Invalid format Token -> Message: ", e);
        } catch (ExpiredJwtException e) {
//            logger.error("Expired JWT Token -> Message: ", e);
        } catch (UnsupportedJwtException e) {
//            logger.error("Unsupported JWT Token -> Message: ", e);
        } catch (IllegalArgumentException | DecodingException e) {
//            logger.error("JWT claims string is empty -> Message: ", e);
        }
        return false;
    }

    public Claims extractAllClaims(String token) {
        return  Jwts
                .parserBuilder()
                .setSigningKey(getSignKey(secret_key))
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public String reduceTokenExpiration(String token) {
        // extract all claims from decoded token
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(getSignKey(secret_key))
                .build()
                .parseClaimsJws(token)
                .getBody();

        // Reduce the expiration time by setting it to a past date
        claims.setExpiration(new Date(0));

        // Generate a new token with the updated expiration time
        return Jwts.builder()
                .signWith(getSignKey(secret_key))
                .setClaims(claims)
                .compact();
    }
}
