package org.example.myproject.model.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class LoginInfo {
    @NotNull(message = "Please enter your email")
    @NotBlank(message = "Email is not blank")
    String email;

    @NotNull(message = "Please enter your password")
    @NotBlank(message = "Password is not blank")
    String password;
}
