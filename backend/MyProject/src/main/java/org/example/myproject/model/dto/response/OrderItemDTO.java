package org.example.myproject.model.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.example.myproject.model.entity.Order;
import org.example.myproject.model.entity.Product;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderItemDTO {
    Long orderItemId;

    ProductDTO product;

    int quantity;

    Long total;

}
