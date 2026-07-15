package com.pantrylabel.controller;
import com.pantrylabel.dto.request.CartItemRequest;
import com.pantrylabel.dto.response.CartDto;
import com.pantrylabel.service.CartService;
import jakarta.validation.Valid;
import java.security.Principal;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController @RequestMapping("/api/cart") public class CartController { private final CartService service; public CartController(CartService service) { this.service = service; } @GetMapping public CartDto get(Principal p) { return service.getCart(p.getName()); } @PostMapping("/items") public CartDto add(Principal p, @Valid @RequestBody CartItemRequest request) { return service.addItem(p.getName(), request); } @DeleteMapping("/items/{itemId}") public ResponseEntity<Void> remove(Principal p, @PathVariable Long itemId) { service.removeItem(p.getName(), itemId); return ResponseEntity.noContent().build(); } @DeleteMapping public ResponseEntity<Void> clear(Principal p) { service.clear(p.getName()); return ResponseEntity.noContent().build(); } }
