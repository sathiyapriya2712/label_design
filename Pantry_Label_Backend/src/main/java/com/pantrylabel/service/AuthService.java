package com.pantrylabel.service;
import com.pantrylabel.dto.request.OtpRequest;
import com.pantrylabel.dto.request.OtpVerifyRequest;
import com.pantrylabel.dto.response.AuthResponse;
public interface AuthService { void sendOtp(OtpRequest request); AuthResponse verifyOtp(OtpVerifyRequest request); }
