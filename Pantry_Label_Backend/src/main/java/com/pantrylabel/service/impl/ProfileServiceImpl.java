package com.pantrylabel.service.impl;
import com.pantrylabel.dto.request.ProfileRequest;
import com.pantrylabel.dto.response.UserDto;
import com.pantrylabel.entity.State;
import com.pantrylabel.entity.User;
import com.pantrylabel.exception.ResourceNotFoundException;
import com.pantrylabel.mapper.DtoMapper;
import com.pantrylabel.repository.StateRepository;
import com.pantrylabel.repository.UserRepository;
import com.pantrylabel.service.ProfileService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
@Service public class ProfileServiceImpl implements ProfileService {
    private final UserRepository users; private final StateRepository states; private final DtoMapper mapper;
    public ProfileServiceImpl(UserRepository users, StateRepository states, DtoMapper mapper) { this.users = users; this.states = states; this.mapper = mapper; }
    @Override @Transactional(readOnly = true) public UserDto getProfile(String email) { return mapper.user(user(email)); }
    @Override @Transactional public UserDto saveProfile(String email, ProfileRequest request) { User user = user(email); State state = states.findById(request.getStateId()).orElseThrow(() -> new ResourceNotFoundException("State not found")); user.setName(request.getName()); user.setGender(request.getGender()); user.setAge(request.getAge()); user.setKitchenType(request.getKitchenType()); user.setState(state); user.setProfileCompleted(true); return mapper.user(users.save(user)); }
    private User user(String email) { return users.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("User not found")); }
}
