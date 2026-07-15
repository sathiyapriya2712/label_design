package com.pantrylabel.dto.request;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
@Data public class RazorpayOrderRequest { @NotNull(message = "Order ID is required") private Long orderId; }
