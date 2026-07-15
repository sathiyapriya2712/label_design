package com.pantrylabel.controller;
import com.pantrylabel.dto.request.OrderRequest;
import com.pantrylabel.dto.response.OrderDto;
import com.pantrylabel.service.OrderService;
import jakarta.validation.Valid;
import java.security.Principal;
import java.util.List;
import org.springframework.web.bind.annotation.*;
@RestController @RequestMapping("/api/orders") public class OrderController { private final OrderService service; public OrderController(OrderService service) { this.service = service; } @PostMapping public OrderDto create(Principal p, @Valid @RequestBody OrderRequest request) { return service.create(p.getName(), request); } @GetMapping public List<OrderDto> all(Principal p) { return service.getAll(p.getName()); } @GetMapping("/{id}") public OrderDto get(Principal p, @PathVariable Long id) { return service.get(p.getName(), id); } }
