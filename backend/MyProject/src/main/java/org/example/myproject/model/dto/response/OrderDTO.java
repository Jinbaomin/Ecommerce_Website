package org.example.myproject.model.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.example.myproject.model.entity.OrderInfo;
import org.example.myproject.model.entity.OrderItem;
import org.example.myproject.model.entity.UserEntity;

import java.time.Instant;
import java.util.List;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderDTO {
    Long orderId;

    Long total;

    List<OrderItem> orderItems;

    String status;

    @JsonIgnoreProperties(value = {"orders", "cart", "wishList"})
    UserEntity user;

    OrderInfo orderInfo;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+7")
    Instant createdAt;

    String createdBy;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+7")
    Instant modifiedAt;

    String modifiedBy;
}
