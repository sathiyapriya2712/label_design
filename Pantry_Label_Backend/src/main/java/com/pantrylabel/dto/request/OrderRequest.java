package com.pantrylabel.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequest {
    @NotNull(message = "Address ID is required")
    private Long addressId;

    @NotNull(message = "Cart ID is required")
    private Long cartId;
}
