package org.example.myproject.model.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.example.myproject.model.entity.CartItem;
import org.example.myproject.model.entity.UserEntity;

import java.util.List;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CartDTO {
    Long cartId;

    Long total;

    List<CartItemDTO> cartItems;
}
