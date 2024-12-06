package org.example.myproject.model.dto.request;

import lombok.*;

@Data
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AddProductToCart {
    Long productId;
}
