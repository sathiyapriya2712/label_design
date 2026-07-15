package com.pantrylabel.service.impl;
import com.pantrylabel.dto.request.CartItemRequest;
import com.pantrylabel.dto.response.CartDto;
import com.pantrylabel.entity.*;
import com.pantrylabel.exception.ResourceNotFoundException;
import com.pantrylabel.mapper.DtoMapper;
import com.pantrylabel.repository.*;
import com.pantrylabel.service.CartService;
import com.pantrylabel.service.PriceCalculationService;
import java.math.BigDecimal;
import java.util.ArrayList;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
@Service public class CartServiceImpl implements CartService {
    private final UserRepository users; private final CartRepository carts; private final CartItemRepository items; private final ProductRepository products; private final PriceCalculationService prices; private final DtoMapper mapper;
    public CartServiceImpl(UserRepository users, CartRepository carts, CartItemRepository items, ProductRepository products, PriceCalculationService prices, DtoMapper mapper) { this.users = users; this.carts = carts; this.items = items; this.products = products; this.prices = prices; this.mapper = mapper; }
    @Override @Transactional public CartDto getCart(String email) { return dto(cartFor(email)); }
    @Override @Transactional public CartDto addItem(String email, CartItemRequest request) { Cart cart = cartFor(email); Product product = products.findById(request.getProductId()).orElseThrow(() -> new ResourceNotFoundException("Product not found")); CartItem item = CartItem.builder().cart(cart).product(product).build(); cart.getItems().add(item); prices.update(cart); return dto(carts.save(cart)); }
    @Override @Transactional public void removeItem(String email, Long itemId) { Cart cart = cartFor(email); CartItem item = items.findById(itemId).filter(value -> value.getCart().getId().equals(cart.getId())).orElseThrow(() -> new ResourceNotFoundException("Cart item not found")); cart.getItems().remove(item); prices.update(cart); carts.save(cart); }
    @Override @Transactional public void clear(String email) { Cart cart = cartFor(email); cart.getItems().clear(); prices.update(cart); carts.save(cart); }
    private Cart cartFor(String email) { User user = users.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("User not found")); return carts.findByUserId(user.getId()).orElseGet(() -> carts.save(Cart.builder().user(user).items(new ArrayList<>()).subTotal(BigDecimal.ZERO).gst(BigDecimal.ZERO).shipping(BigDecimal.ZERO).grandTotal(BigDecimal.ZERO).build())); }
    private CartDto dto(Cart cart) { return CartDto.builder().cartId(cart.getId()).items(cart.getItems().stream().map(mapper::cartItem).toList()).subTotal(cart.getSubTotal()).gst(cart.getGst()).shipping(cart.getShipping()).grandTotal(cart.getGrandTotal()).build(); }
}
