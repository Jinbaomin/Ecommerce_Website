package org.example.myproject.services.Impl;

import jakarta.persistence.PreUpdate;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.apache.catalina.security.SecurityUtil;
import org.example.myproject.enums.Role;
import org.example.myproject.exception.AppException;
import org.example.myproject.exception.ErrorCode;
import org.example.myproject.mapper.UserMapper;
import org.example.myproject.model.dto.request.RegisterInfo;
import org.example.myproject.model.dto.response.UserDTO;
import org.example.myproject.model.entity.Cart;
import org.example.myproject.model.entity.UserEntity;
import org.example.myproject.repositories.UserRepository;
import org.example.myproject.security.JwtProvider;
import org.example.myproject.security.SecurityUtils;
import org.example.myproject.services.UserService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Security;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserServiceImpl implements UserService {
    UserRepository userRepository;

    PasswordEncoder passwordEncoder;

    JwtProvider jwtProvider;

    @Override
    public UserDTO registerUser(RegisterInfo body) {
        if(userRepository.existsByEmailOrUserName(body.getEmail(), body.getUserName())) {
            throw new AppException(ErrorCode.USER_EXISTS);
        }

        UserEntity user = UserMapper.INSTANCE.convertToUserEntity(body);

        if(user.getRoles() == null) {
            Set<Role> roles = new HashSet<>();
            roles.add(Role.USER);
            user.setRoles(roles);
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setCart(new Cart());

        UserEntity savedUser = userRepository.save(user);

        return UserMapper.INSTANCE.convertToUserDTO(savedUser);
    }

    @Override
    public UserEntity findUserByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(() -> new AppException(ErrorCode.EMAIL_OR_USERNAME_NOT_FOUND));
    }

    @Override
    public UserEntity findUserByUserName(String username) {
        return userRepository.findByUserName(username).orElseThrow(() -> new AppException(ErrorCode.EMAIL_OR_USERNAME_NOT_FOUND));
    }

    @Override
    public UserEntity findUserByEmailOrUserName(String email) {
        boolean isEmail = email.contains("@gmail.com");
        return (isEmail ? findUserByEmail(email): findUserByUserName(email));
    }

    @Override
    public void updateRefreshToken(String email, String token) {
        boolean isEmail = email.contains("@gmail.com");
        UserEntity user;
        if(isEmail) {
            user = findUserByEmail(email);
        } else {
            user = findUserByUserName(email);
        }
        user.setRefreshToken(token);
        userRepository.save(user);
    }

    @Override
    public void resetPassword(String email, String newPassword) {
        UserEntity user = findUserByEmailOrUserName(email);

        if(user == null) {
            throw new AppException(ErrorCode.USER_NOT_FOUND);
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    @Override
    @PreUpdate
    public void changePassword(String oldPassword, String newPassword) {
        String email = SecurityUtils.getCurrentUserLogin().get();
        UserEntity user = findUserByEmailOrUserName(email);

        if(!passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new AppException(ErrorCode.INCORRECT_PASSWORD);
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    @Override
    @PreUpdate
    public void updateUser(Long id, String fullName, String email, String phone) {
        Optional<UserEntity> optional = findUserById(id);
        UserEntity user = optional.get();

        user.setEmail(email);
        user.setFullName(fullName);
        user.setPhone(phone);

        userRepository.save(user);
    }

    @Override
    public Optional<UserEntity> findUserById(Long id) {
        return Optional.ofNullable(userRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND)));
    }
}
