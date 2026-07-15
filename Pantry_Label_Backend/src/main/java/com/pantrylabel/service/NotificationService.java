package com.pantrylabel.service;
import com.pantrylabel.entity.Order;
public interface NotificationService { void sendOtp(String recipient, String otp); void sendOrderConfirmation(String recipient, Order order); }
