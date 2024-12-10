package org.example.myproject.model.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.example.myproject.enums.Role;
import org.example.myproject.model.entity.Product;

import java.time.Instant;
import java.util.List;
import java.util.Set;

@Data
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserDTO {
    Long userId;

    String fullName;

    String email;

    String phone;

    String userName;

    Set<Role> roles;

    CartDTO cart;

    List<ProductDTO> wishList;

//    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss", shape = JsonFormat.Shape.STRING)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss a", timezone = "GMT+7")
    Instant createdDate;

//    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss", shape = JsonFormat.Shape.STRING)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss a", timezone = "GMT+7")
    Instant lastModifiedDate;

    String modifiedBy;
}
