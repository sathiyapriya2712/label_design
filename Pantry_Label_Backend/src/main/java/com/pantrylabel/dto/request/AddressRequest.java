package com.pantrylabel.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddressRequest {
    @NotBlank(message = "Receiver name is required")
    private String name;

    @NotBlank(message = "Contact phone number is required")
    private String phone;

    @NotBlank(message = "Flat/House/Apartment number is required")
    private String flatHouseNo;

    @NotBlank(message = "Area/Street name is required")
    private String areaStreetName;

    private String landmark;

    @NotBlank(message = "City is required")
    private String city;

    @NotBlank(message = "State is required")
    private String state;

    @NotBlank(message = "Pincode is required")
    private String pincode;
}
