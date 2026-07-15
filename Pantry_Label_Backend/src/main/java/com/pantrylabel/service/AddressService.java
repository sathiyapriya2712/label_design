package com.pantrylabel.service;
import com.pantrylabel.dto.request.AddressRequest;
import com.pantrylabel.dto.response.AddressDto;
import java.util.List;
public interface AddressService { List<AddressDto> getAddresses(String email); AddressDto saveAddress(String email, AddressRequest request); }
