package org.example.myproject.model.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.example.myproject.enums.Role;

import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RegisterInfo {
    @NotNull(message = "Please enter your full name")
    @NotBlank(message = "Full name is not blank")
    String fullName;

    @NotNull(message = "Please enter your username")
    @NotBlank(message = "Username is not blank")
    String userName;

    @NotNull(message = "Please enter your email")
    @NotBlank(message = "Email is not blank")
    String email;

    @NotNull(message = "Please enter your phone")
    @NotBlank(message = "Phone is not blank")
    String phone;

    @NotNull(message = "Please enter your password")
    @NotBlank(message = "Password is not blank")
    String password;

    Set<Role> roles;
}
