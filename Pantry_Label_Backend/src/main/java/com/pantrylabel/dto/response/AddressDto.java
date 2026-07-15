package com.pantrylabel.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AddressDto {
    private Long id;
    private String name;
    private String phone;
    private String flatHouseNo;
    private String areaStreetName;
    private String landmark;
    private String city;
    private String state;
    private String pincode;
}
