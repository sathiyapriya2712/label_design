package com.pantrylabel.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderDto {
    private Long id;
    private Long orderId; // alias for id
    private LocalDateTime createdDate;
    private LocalDateTime orderDate; // alias for createdDate
    private List<OrderItemDto> items;
    private BigDecimal subTotal;
    private BigDecimal gst;
    private BigDecimal shipping;
    private BigDecimal grandTotal;
    private BigDecimal totalAmount; // alias for grandTotal
    private String status;
    private AddressDto deliveryAddress;
    private AddressDto address; // alias for deliveryAddress
    private String font;
    private String shape;
    private String background;
}
