package com.pantrylabel.util;
import java.nio.charset.StandardCharsets;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import org.springframework.stereotype.Component;
@Component public class HmacUtil { public boolean matches(String orderId, String paymentId, String signature, String secret) { try { Mac mac = Mac.getInstance("HmacSHA256"); mac.init(new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), "HmacSHA256")); byte[] expected = mac.doFinal((orderId + "|" + paymentId).getBytes(StandardCharsets.UTF_8)); return java.security.MessageDigest.isEqual(expected, hexToBytes(signature)); } catch (Exception ex) { throw new IllegalStateException("Could not verify payment signature", ex); } } private byte[] hexToBytes(String value) { int length = value.length(); byte[] bytes = new byte[length / 2]; for (int i = 0; i < length; i += 2) bytes[i / 2] = (byte) ((Character.digit(value.charAt(i), 16) << 4) + Character.digit(value.charAt(i + 1), 16)); return bytes; } }
