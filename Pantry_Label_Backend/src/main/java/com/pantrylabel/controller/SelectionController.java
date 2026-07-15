package com.pantrylabel.controller;
import com.pantrylabel.dto.request.SelectionRequest;
import com.pantrylabel.service.SelectionService;
import jakarta.validation.Valid;
import java.security.Principal;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController @RequestMapping("/api/selections") public class SelectionController { private final SelectionService service; public SelectionController(SelectionService service) { this.service = service; } @PostMapping public ResponseEntity<Void> save(Principal principal, @Valid @RequestBody SelectionRequest request) { service.save(principal.getName(), request); return ResponseEntity.noContent().build(); } }
