package org.example.myproject.facade;

import lombok.AccessLevel;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.example.myproject.mapper.UserMapper;
import org.example.myproject.model.dto.GenericApiResponse;
import org.example.myproject.model.dto.request.LoginInfo;
import org.example.myproject.model.dto.response.AuthenticationResponse;
import org.example.myproject.model.dto.response.UserDTO;
import org.example.myproject.model.entity.UserEntity;
import org.example.myproject.security.JwtProvider;
import org.example.myproject.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserFacade {
    JwtProvider jwtProvider;

    UserService userService;

    public GenericApiResponse<?> changePassword(String oldPassword, String newPassword) {
        userService.changePassword(oldPassword, newPassword);
        return GenericApiResponse.<String>builder()
                .statusCode(200)
                .message("Change password successfully")
                .build();
    }

    public GenericApiResponse<?> updateUser(Long id, String fullName, String email, String phone) {
        userService.updateUser(id, fullName, email, phone);
        return GenericApiResponse.builder()
                .statusCode(200)
                .message("Update user successfully")
                .build();
    }
}
