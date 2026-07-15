package com.pantrylabel.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JwtUtil {
    private final String secret;
    private final long expirationMs;
    public JwtUtil(@Value("${app.jwt.secret}") String secret, @Value("${app.jwt.expiration-ms}") long expirationMs) { this.secret = secret; this.expirationMs = expirationMs; }
    public String generateToken(String email, Long userId) { return Jwts.builder().subject(email).claim("userId", userId).issuedAt(new Date()).expiration(new Date(System.currentTimeMillis() + expirationMs)).signWith(key()).compact(); }
    public String extractEmail(String token) { return claims(token).getSubject(); }
    public boolean isValid(String token) { try { claims(token); return true; } catch (Exception ex) { return false; } }
    private Claims claims(String token) { return Jwts.parser().verifyWith(key()).build().parseSignedClaims(token).getPayload(); }
    private SecretKey key() { return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8)); }
}
