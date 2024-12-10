package org.example.myproject.controllers;

import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.example.myproject.facade.UserFacade;
import org.example.myproject.model.dto.GenericApiResponse;
import org.example.myproject.model.dto.request.ChangePasswordRequest;
import org.example.myproject.model.dto.request.ResetPasswordRequest;
import org.example.myproject.model.dto.request.UpdateUserRequest;
import org.example.myproject.model.dto.response.UserDTO;
import org.example.myproject.model.entity.UserEntity;
import org.example.myproject.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserController {
    UserFacade userFacade;

    @PostMapping("/password")
    public ResponseEntity<GenericApiResponse<?>> changePassword(@RequestBody @Valid ChangePasswordRequest body) {
        return ResponseEntity.ok(userFacade.changePassword(body.getOldPassword(), body.getNewPassword()));
    }

    @PostMapping("/{id}")
    public ResponseEntity<GenericApiResponse<?>> updateUser(
            @RequestBody @Valid UpdateUserRequest body,
            @PathVariable String id
    ) {
        return ResponseEntity.ok(userFacade.updateUser(Long.parseLong(id), body.getFullName(), body.getEmail(), body.getPhone()));
    }

    @GetMapping("")
    public ResponseEntity<GenericApiResponse<List<UserDTO>>> getAllUser() {
        return ResponseEntity.ok(userFacade.getAllUser());
    }

    @GetMapping("/{id}")
    public ResponseEntity<GenericApiResponse<UserDTO>> getUserById(
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(userFacade.getUserById(id));
    }
}
