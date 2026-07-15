package com.pantrylabel.service;
import com.pantrylabel.dto.request.PaymentVerifyRequest;
import java.util.Map;
public interface PaymentService { Map<String, Object> createRazorpayOrder(String email, Long orderId); void verify(String email, PaymentVerifyRequest request); }
