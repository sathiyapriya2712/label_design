package com.pantrylabel.controller;
import com.pantrylabel.dto.request.PaymentVerifyRequest;
import com.pantrylabel.dto.request.RazorpayOrderRequest;
import com.pantrylabel.service.PaymentService;
import jakarta.validation.Valid;
import java.security.Principal;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController @RequestMapping("/api/payments/razorpay") public class PaymentController { private final PaymentService service; public PaymentController(PaymentService service) { this.service = service; } @PostMapping("/create") public Map<String, Object> create(Principal p, @Valid @RequestBody RazorpayOrderRequest request) { return service.createRazorpayOrder(p.getName(), request.getOrderId()); } @PostMapping("/verify") public ResponseEntity<Map<String, Boolean>> verify(Principal p, @Valid @RequestBody PaymentVerifyRequest request) { service.verify(p.getName(), request); return ResponseEntity.ok(Map.of("success", true)); } }
