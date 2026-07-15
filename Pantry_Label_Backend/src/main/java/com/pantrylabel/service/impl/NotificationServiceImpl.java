package com.pantrylabel.service.impl;
import com.pantrylabel.entity.Order;
import com.pantrylabel.service.NotificationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class NotificationServiceImpl implements NotificationService {
    private static final Logger log = LoggerFactory.getLogger(NotificationServiceImpl.class);
    private final JavaMailSender mailSender;

    public NotificationServiceImpl(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Override
    public void sendOtp(String recipient, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(recipient);
        message.setSubject("Your Pantry Label verification code");
        message.setText("Your OTP is " + otp + ". It expires in 10 minutes.");
        try {
            mailSender.send(message);
            log.info("OTP email sent successfully to {}", recipient);
        } catch (MailException ex) {
            // In local dev with placeholder credentials, log the OTP so you can still test
            log.warn("===================================================");
            log.warn("EMAIL SEND FAILED (check Gmail credentials in run config)");
            log.warn(">>> DEV MODE OTP for {}: {}", recipient, otp);
            log.warn("Copy the OTP above and paste it into the app to log in.");
            log.warn("===================================================");
        }
    }

    @Override
    public void sendOrderConfirmation(String recipient, Order order) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(recipient);
        message.setSubject("Pantry Label order confirmed");
        message.setText("Your order #" + order.getId() + " has been confirmed.");
        try {
            mailSender.send(message);
            log.info("Order confirmation email sent to {}", recipient);
        } catch (MailException ex) {
            log.warn("Email send failed for order confirmation (order #{}) to {} — check Gmail credentials.", order.getId(), recipient);
        }
    }
}
