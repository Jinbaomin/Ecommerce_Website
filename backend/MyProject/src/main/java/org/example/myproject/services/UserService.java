package org.example.myproject.services;
import org.example.myproject.model.dto.request.RegisterInfo;
import org.example.myproject.model.dto.response.UserDTO;
import org.example.myproject.model.entity.UserEntity;

import java.util.List;
import java.util.Optional;


public interface UserService {
    public UserDTO registerUser(RegisterInfo body);
    public UserEntity findUserByEmail(String email);
    public UserEntity findUserByUserName(String username);
    public UserEntity findUserByEmailOrUserName(String email);
    public void updateRefreshToken(String email, String token);
    public void resetPassword(String email, String newPassword);
    public void changePassword(String oldPassword, String newPassword);
    public void updateUser(Long id, String fullName, String email, String phone);
    public Optional<UserEntity> findUserById(Long id);
    public List<UserEntity> getAllUser();
}
