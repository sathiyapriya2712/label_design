package com.pantrylabel.controller;
import com.pantrylabel.service.InvoiceService;
import java.security.Principal;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController @RequestMapping("/api/invoices") public class InvoiceController { private final InvoiceService service; public InvoiceController(InvoiceService service) { this.service = service; } @GetMapping("/{orderId}/download") public ResponseEntity<byte[]> download(Principal p, @PathVariable Long orderId) { return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=invoice-" + orderId + ".pdf").contentType(MediaType.APPLICATION_PDF).body(service.generate(p.getName(), orderId)); } }
