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
import lombok.extern.slf4j.Slf4j;
import org.example.myproject.security.JwtProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Component
@Slf4j(topic = "CUSTOMIZE-FILTER")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class JwtValidationFilter extends OncePerRequestFilter {
    @Value("${jwt.auth_header}")
    String auth_header;

    final JwtProvider jwtProvider;

    final HandlerExceptionResolver handlerExceptionResolver;

    final UserDetailsService userDetailsService;

//    final AuthenticationProvider authenticationProvider;

    public JwtValidationFilter(JwtProvider jwtProvider, HandlerExceptionResolver handlerExceptionResolver, @Lazy UserDetailsService userDetailsService) {
        this.jwtProvider = jwtProvider;
        this.handlerExceptionResolver = handlerExceptionResolver;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        log.info("{} {}", request.getMethod(), request.getRequestURI());

        String jwt = request.getHeader(auth_header);

        if(jwt == null || !jwt.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        try {
            jwt = jwt.substring(7);

            // extract all claims
            Claims claims = jwtProvider.extractAllClaims(jwt);
            String email = String.valueOf(claims.getSubject());

            Set<GrantedAuthority> roles = new HashSet<>();
            List<String> authorities = (List<String>) claims.get("authorities");

//            authorities.forEach(it -> roles.add(new SimpleGrantedAuthority("ROLE_" + it)));
            authorities.forEach(role -> roles.add(new SimpleGrantedAuthority(role)));

            // authenticate user and set authentication in Spring SecurityContext
//            Authentication authentication = authenticationProvider.authenticate(new UsernamePasswordAuthenticationToken(email, null, roles));
            UserDetails user = userDetailsService.loadUserByUsername(email);
            Authentication authentication = new UsernamePasswordAuthenticationToken(user, null, roles);

            SecurityContextHolder.getContext().setAuthentication(authentication);
        } catch (SignatureException | MalformedJwtException | ExpiredJwtException |
                 UnsupportedJwtException | IllegalArgumentException ex) {
            handlerExceptionResolver.resolveException(request, response, null, ex);
            return;
        }

        filterChain.doFilter(request, response);
    }
}
