package com.pantrylabel.service.impl;
import com.pantrylabel.dto.request.OtpRequest;
import com.pantrylabel.dto.request.OtpVerifyRequest;
import com.pantrylabel.dto.response.AuthResponse;
import com.pantrylabel.entity.User;
import com.pantrylabel.exception.OtpExpiredException;
import com.pantrylabel.mapper.DtoMapper;
import com.pantrylabel.repository.UserRepository;
import com.pantrylabel.security.JwtUtil;
import com.pantrylabel.service.AuthService;
import com.pantrylabel.service.NotificationService;
import com.pantrylabel.util.OtpGenerator;
import java.time.LocalDateTime;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
@Service public class AuthServiceImpl implements AuthService {
    private final UserRepository users; private final OtpGenerator otpGenerator; private final NotificationService notificationService; private final JwtUtil jwtUtil; private final DtoMapper mapper;
    public AuthServiceImpl(UserRepository users, OtpGenerator otpGenerator, NotificationService notificationService, JwtUtil jwtUtil, DtoMapper mapper) { this.users = users; this.otpGenerator = otpGenerator; this.notificationService = notificationService; this.jwtUtil = jwtUtil; this.mapper = mapper; }
    @Override @Transactional public void sendOtp(OtpRequest request) { String email = request.getEmail().trim().toLowerCase(); User user = users.findByEmail(email).orElseGet(() -> User.builder().email(email).profileCompleted(false).build()); String otp = otpGenerator.generate(); user.setOtp(otp); user.setOtpExpiry(LocalDateTime.now().plusMinutes(10)); users.save(user); notificationService.sendOtp(email, otp); }
    @Override @Transactional public AuthResponse verifyOtp(OtpVerifyRequest request) { User user = users.findByEmail(request.getEmail().trim().toLowerCase()).orElseThrow(() -> new OtpExpiredException("OTP is invalid or expired")); if (user.getOtp() == null || user.getOtpExpiry() == null || user.getOtpExpiry().isBefore(LocalDateTime.now()) || !user.getOtp().equals(request.getOtp())) throw new OtpExpiredException("OTP is invalid or expired"); user.setOtp(null); user.setOtpExpiry(null); users.save(user); return new AuthResponse(jwtUtil.generateToken(user.getEmail(), user.getId()), mapper.user(user)); }
}
