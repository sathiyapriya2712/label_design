package com.pantrylabel.service;
import com.pantrylabel.dto.request.CartItemRequest;
import com.pantrylabel.dto.response.CartDto;
public interface CartService { CartDto getCart(String email); CartDto addItem(String email, CartItemRequest request); void removeItem(String email, Long itemId); void clear(String email); }
