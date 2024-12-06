package org.example.myproject.filter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.SignatureException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.example.myproject.security.JwtProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Component
@FieldDefaults(level = AccessLevel.PRIVATE)
public class JwtValidationFilter extends OncePerRequestFilter {
    @Value("${jwt.auth_header}")
    String auth_header;

    final JwtProvider jwtProvider;

    final HandlerExceptionResolver handlerExceptionResolver;

    public JwtValidationFilter(JwtProvider jwtProvider, HandlerExceptionResolver handlerExceptionResolver) {
        this.jwtProvider = jwtProvider;
        this.handlerExceptionResolver = handlerExceptionResolver;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String jwt = request.getHeader(auth_header);

        if(jwt == null || !jwt.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        try {
            jwt = jwt.substring(7);
            Claims claims = jwtProvider.extractAllClaims(jwt);
            String email = String.valueOf(claims.getSubject());
            Set<GrantedAuthority> roles = new HashSet<>();
            List<String> authorities = (List<String>) claims.get("authorities");
            authorities.forEach(it -> roles.add(new SimpleGrantedAuthority("ROLE_" + it)));
            Authentication authentication = new UsernamePasswordAuthenticationToken(email, jwt, roles);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        } catch (SignatureException | MalformedJwtException | ExpiredJwtException | UnsupportedJwtException | IllegalArgumentException ex) {
            handlerExceptionResolver.resolveException(request, response, null, ex);
            return;
        }

        filterChain.doFilter(request, response);
    }
}
