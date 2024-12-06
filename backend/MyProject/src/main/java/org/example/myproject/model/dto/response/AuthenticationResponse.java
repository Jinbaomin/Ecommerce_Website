package org.example.myproject.model.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.example.myproject.enums.Role;

import java.util.List;
import java.util.Set;

@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AuthenticationResponse {
    @JsonProperty(value = "access_token")
    String accessToken;
    boolean authenticated;
    UserDTO user;
}
