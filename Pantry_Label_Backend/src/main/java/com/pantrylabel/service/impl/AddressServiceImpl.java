package com.pantrylabel.service.impl;
import com.pantrylabel.dto.request.AddressRequest;
import com.pantrylabel.dto.response.AddressDto;
import com.pantrylabel.entity.Address;
import com.pantrylabel.entity.User;
import com.pantrylabel.exception.ResourceNotFoundException;
import com.pantrylabel.mapper.DtoMapper;
import com.pantrylabel.repository.AddressRepository;
import com.pantrylabel.repository.UserRepository;
import com.pantrylabel.service.AddressService;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
@Service public class AddressServiceImpl implements AddressService {
    private final AddressRepository addresses; private final UserRepository users; private final DtoMapper mapper;
    public AddressServiceImpl(AddressRepository addresses, UserRepository users, DtoMapper mapper) { this.addresses = addresses; this.users = users; this.mapper = mapper; }
    @Override @Transactional(readOnly = true) public List<AddressDto> getAddresses(String email) { return addresses.findByUserId(user(email).getId()).stream().map(mapper::address).toList(); }
    @Override @Transactional public AddressDto saveAddress(String email, AddressRequest request) { Address address = Address.builder().user(user(email)).name(request.getName()).phone(request.getPhone()).flatHouseNo(request.getFlatHouseNo()).areaStreetName(request.getAreaStreetName()).landmark(request.getLandmark()).city(request.getCity()).state(request.getState()).pincode(request.getPincode()).build(); return mapper.address(addresses.save(address)); }
    private User user(String email) { return users.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("User not found")); }
}
