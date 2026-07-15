package com.pantrylabel.controller;
import com.pantrylabel.dto.request.ProfileRequest;
import com.pantrylabel.dto.response.UserDto;
import com.pantrylabel.service.ProfileService;
import jakarta.validation.Valid;
import java.security.Principal;
import org.springframework.web.bind.annotation.*;
@RestController @RequestMapping("/api/profile") public class ProfileController { private final ProfileService service; public ProfileController(ProfileService service) { this.service = service; } @GetMapping public UserDto get(Principal principal) { return service.getProfile(principal.getName()); } @PostMapping public UserDto create(Principal principal, @Valid @RequestBody ProfileRequest request) { return service.saveProfile(principal.getName(), request); } @PutMapping public UserDto update(Principal principal, @Valid @RequestBody ProfileRequest request) { return service.saveProfile(principal.getName(), request); } }
