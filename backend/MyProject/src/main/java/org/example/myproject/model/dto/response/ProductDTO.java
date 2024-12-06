package org.example.myproject.model.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.example.myproject.model.entity.Category;
import org.example.myproject.model.entity.ProductInfo;

import java.time.Instant;
import java.util.List;

@Data
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductDTO {
    Long productId;

    String productName;

    Long price;

    Long salePrice;

    String description;

    int quantity;

    Category category;

    List<String> images;

    ProductInfo productInfo;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss a", timezone = "GMT+7")
    Instant createdAt;

    String createdBy;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss a", timezone = "GMT+7")
    Instant modifiedAt;

    String modifiedBy;
}
