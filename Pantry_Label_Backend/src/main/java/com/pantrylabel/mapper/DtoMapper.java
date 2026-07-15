package com.pantrylabel.mapper;

import com.pantrylabel.dto.response.*;
import com.pantrylabel.entity.*;
import org.springframework.stereotype.Component;

@Component
public class DtoMapper {
    public UserDto user(User value) { return UserDto.builder().id(value.getId()).email(value.getEmail()).name(value.getName()).gender(value.getGender()).age(value.getAge()).kitchenType(value.getKitchenType()).stateId(value.getState() == null ? null : value.getState().getId()).profileCompleted(value.isProfileCompleted()).build(); }
    public StateDto state(State value) { return StateDto.builder().id(value.getId()).name(value.getName()).build(); }
    public CategoryDto category(Category value) { return CategoryDto.builder().id(value.getId()).name(value.getName()).description(value.getDescription()).build(); }
    public ProductDto product(Product value) { return ProductDto.builder().id(value.getId()).name(value.getName()).bilingualName(value.getBilingualName()).price(value.getPrice()).imageUrl(value.getImageUrl()).stateId(value.getState().getId()).categoryId(value.getCategory().getId()).build(); }
    public AddressDto address(Address value) { return AddressDto.builder().id(value.getId()).name(value.getName()).phone(value.getPhone()).flatHouseNo(value.getFlatHouseNo()).areaStreetName(value.getAreaStreetName()).landmark(value.getLandmark()).city(value.getCity()).state(value.getState()).pincode(value.getPincode()).build(); }
    public CartItemDto cartItem(CartItem value) { return CartItemDto.builder().cartItemId(value.getId()).product(product(value.getProduct())).build(); }
    public OrderItemDto orderItem(OrderItem value) { return OrderItemDto.builder().id(value.getId()).product(product(value.getProduct())).build(); }
}
