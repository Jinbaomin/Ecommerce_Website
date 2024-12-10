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

import java.util.List;
import java.util.Optional;

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

    public GenericApiResponse<List<UserDTO>> getAllUser() {
        List<UserEntity> users = userService.getAllUser();
        List<UserDTO> userDTOS = users.stream().map(UserMapper.INSTANCE::convertToUserDTO).toList();
        return GenericApiResponse.<List<UserDTO>>builder()
                .statusCode(200)
                .message("Get all user successfully")
                .data(userDTOS)
                .build();
    }

    public GenericApiResponse<UserDTO> getUserById(Long userId) {
        Optional<UserEntity> user = userService.findUserById(userId);
        return GenericApiResponse.<UserDTO>builder()
                .statusCode(200)
                .message("Get all user successfully")
                .data(UserMapper.INSTANCE.convertToUserDTO(user.get()))
                .build();
    }
}
