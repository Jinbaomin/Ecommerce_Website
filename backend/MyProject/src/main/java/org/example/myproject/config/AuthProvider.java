package org.example.myproject.config;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.example.myproject.exception.AppException;
import org.example.myproject.exception.ErrorCode;
import org.example.myproject.security.UserDetailService;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthProvider implements AuthenticationProvider {
    PasswordEncoder passwordEncoder;

    UserDetailService userDetailService;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        boolean isEmail = authentication.getName().contains("@gmail.com");
        UserDetails userDetails;
        if(isEmail) {
            userDetails = userDetailService.loadUserByEmail(authentication.getName());
        } else {
            userDetails = userDetailService.loadUserByUsername(authentication.getName());
        }

        if(passwordEncoder.matches(authentication.getCredentials().toString(), userDetails.getPassword())) {
            return new UsernamePasswordAuthenticationToken(authentication.getName(),
                    authentication.getCredentials().toString(), userDetails.getAuthorities());
        } else {
            throw new AppException(ErrorCode.INCORRECT_PASSWORD);
        }
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return (UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication));
    }
}
