package com.pantrylabel.service;
import com.pantrylabel.dto.request.ProfileRequest;
import com.pantrylabel.dto.response.UserDto;
public interface ProfileService { UserDto getProfile(String email); UserDto saveProfile(String email, ProfileRequest request); }
