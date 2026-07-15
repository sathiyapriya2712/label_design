package com.pantrylabel.controller;
import com.pantrylabel.dto.request.AddressRequest;
import com.pantrylabel.dto.response.AddressDto;
import com.pantrylabel.service.AddressService;
import jakarta.validation.Valid;
import java.security.Principal;
import java.util.List;
import org.springframework.web.bind.annotation.*;
@RestController @RequestMapping("/api/addresses") public class AddressController { private final AddressService service; public AddressController(AddressService service) { this.service = service; } @GetMapping public List<AddressDto> get(Principal p) { return service.getAddresses(p.getName()); } @PostMapping public AddressDto save(Principal p, @Valid @RequestBody AddressRequest request) { return service.saveAddress(p.getName(), request); } }
