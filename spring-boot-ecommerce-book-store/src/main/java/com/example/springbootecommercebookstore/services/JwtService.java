package com.example.springbootecommercebookstore.services;

import com.example.springbootecommercebookstore.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class JwtService {


   // private static final String SECRET_KEY = "8c62f186ae11232af346903b536f2e215f77121548189f6427714fe5363edbcd7b3fcdea82979524bccdf7a03e16b3147812ca6d536acb4f5daf2eedc51a1a998549896852529caf3949eea95d741b16aa302e93e88ffe12d4d31225f270d88ddc86f614e1ad8b0b08fefbe8caad5562c74de55fe18419d4456c442fa979ed76fae9e30263596caf58a8aa71dd8e11691fa1fb809aa1beae8ee4da70e70e2104192bc8d304740d70e63c71e06a864dc819dfd7a55a85bc47f529dcc59da2457ad9ef9e5860dccedd5ec81a5c2c29b3d8726623a8737efe87b195e68416803dc77caab91b7d6d59c27f2c5cf473ceb1275f435f181b56b22201dbe487fdf18d93";
    @Value("${app.jwt-secret}")
    private  String SECRET_KEY;

    @Value("${app-jwt-expiration-milliseconds}")
    private long jwtExpirationDate;

    public String extractUsername(String token){
        return extractClaim(token,Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public String generateToken(User userDetails){
        return generateToken(new HashMap<>(),userDetails);
    }

    public String generateToken(Map<String,Object> extraClaims, User user){
        return Jwts
                .builder()
                .claims(extraClaims)
                .claim("roles", user.getAuthorities().stream()
                        .map(GrantedAuthority::getAuthority)
                        .collect(Collectors.toList()))
                .claim("userId",user.getId())
                .claim("user",user.getUserName())
                .subject(user.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis()+1000*60*60*24))
                .signWith(getSignInKey(),SignatureAlgorithm.HS256)
                .compact();

    }

    public boolean isTokenValid(String token,UserDetails userDetails){
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private Claims extractAllClaims(String token){
        return Jwts
                .parser()
                .verifyWith(getSignInKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    private SecretKey getSignInKey(){
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
