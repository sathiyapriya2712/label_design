package com.pantrylabel.dto.response;

import java.math.BigDecimal;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductDto {
    private Long id;
    private String name;
    private String bilingualName;
    private BigDecimal price;
    private String imageUrl;
    private Long stateId;
    private Long categoryId;
}
