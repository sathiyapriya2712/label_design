package com.pantrylabel.service.impl;
import com.pantrylabel.dto.request.OrderRequest;
import com.pantrylabel.dto.response.OrderDto;
import com.pantrylabel.entity.*;
import com.pantrylabel.exception.ResourceNotFoundException;
import com.pantrylabel.mapper.DtoMapper;
import com.pantrylabel.repository.*;
import com.pantrylabel.service.OrderService;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
@Service public class OrderServiceImpl implements OrderService {
    private final UserRepository users; private final CartRepository carts; private final AddressRepository addresses; private final OrderRepository orders; private final SelectionRepository selections; private final DtoMapper mapper;
    public OrderServiceImpl(UserRepository users, CartRepository carts, AddressRepository addresses, OrderRepository orders, SelectionRepository selections, DtoMapper mapper) { this.users = users; this.carts = carts; this.addresses = addresses; this.orders = orders; this.selections = selections; this.mapper = mapper; }
    @Override @Transactional public OrderDto create(String email, OrderRequest request) { User user = user(email); Cart cart = carts.findById(request.getCartId()).filter(value -> value.getUser().getId().equals(user.getId())).orElseThrow(() -> new ResourceNotFoundException("Cart not found")); if (cart.getItems().isEmpty()) throw new IllegalArgumentException("Cart is empty"); Address address = addresses.findById(request.getAddressId()).filter(value -> value.getUser().getId().equals(user.getId())).orElseThrow(() -> new ResourceNotFoundException("Address not found")); Selection selection = selections.findFirstByUserIdOrderByCreatedDateDesc(user.getId()).orElse(null); Order order = Order.builder().user(user).address(address).subTotal(cart.getSubTotal()).gst(cart.getGst()).shipping(cart.getShipping()).grandTotal(cart.getGrandTotal()).status("PENDING_PAYMENT").font(selection == null ? null : selection.getFont()).shape(selection == null ? null : selection.getShape()).background(selection == null ? null : selection.getBackground()).build(); for (CartItem item : cart.getItems()) order.getItems().add(OrderItem.builder().order(order).product(item.getProduct()).build()); return dto(orders.save(order)); }
    @Override @Transactional(readOnly = true) public OrderDto get(String email, Long id) { return dto(orders.findById(id).filter(order -> order.getUser().getEmail().equals(email)).orElseThrow(() -> new ResourceNotFoundException("Order not found"))); }
    @Override @Transactional(readOnly = true) public List<OrderDto> getAll(String email) { return orders.findByUserIdOrderByCreatedDateDesc(user(email).getId()).stream().map(this::dto).toList(); }
    private User user(String email) { return users.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("User not found")); }
    private OrderDto dto(Order order) { return OrderDto.builder().id(order.getId()).orderId(order.getId()).createdDate(order.getCreatedDate()).orderDate(order.getCreatedDate()).items(order.getItems().stream().map(mapper::orderItem).toList()).subTotal(order.getSubTotal()).gst(order.getGst()).shipping(order.getShipping()).grandTotal(order.getGrandTotal()).totalAmount(order.getGrandTotal()).status(order.getStatus()).deliveryAddress(mapper.address(order.getAddress())).address(mapper.address(order.getAddress())).font(order.getFont()).shape(order.getShape()).background(order.getBackground()).build(); }
}
