package com.pantrylabel.dto.response;

import java.math.BigDecimal;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CartDto {
    private Long cartId;
    private List<CartItemDto> items;
    private BigDecimal subTotal;
    private BigDecimal gst;
    private BigDecimal shipping;
    private BigDecimal grandTotal;
}
