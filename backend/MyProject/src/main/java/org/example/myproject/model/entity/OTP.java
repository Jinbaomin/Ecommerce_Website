package org.example.myproject.model.entity;


import jakarta.persistence.Embeddable;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@FieldDefaults(level = AccessLevel.PRIVATE)
@Embeddable
public class OTP {
    String otpValue;
    Instant otpExpireDate;
}
