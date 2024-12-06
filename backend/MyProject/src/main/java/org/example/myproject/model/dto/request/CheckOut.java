package org.example.myproject.model.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CheckOut {
    Long total;
    String shipTo;
    String shippingMethod;
}
