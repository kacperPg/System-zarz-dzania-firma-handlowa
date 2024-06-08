package com.kul.newbackend.config;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.kul.newbackend.dto.PermissionDto;
import com.kul.newbackend.dto.RoleDto;
import com.kul.newbackend.dto.UserDto;
import com.kul.newbackend.entities.Permission;
import com.kul.newbackend.entities.Role;
import com.kul.newbackend.services.UserService;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Component
public class UserAuthProvider {

    @Value("${security.jwt.token.secret-key:secret-value}")
    private String secretKey;

    private final UserService userService;

    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public String createToken(UserDto user) {
        Date now = new Date();
        Date validity = new Date(now.getTime() + 24 * 60 * 60 * 1000);

        List<String> roles = user.getRole() != null ?
                Collections.singletonList(user.getRole().getRoleName()) :
                Collections.emptyList();

        List<String> permissions = user.getRole() != null ?
                user.getRole().getPermissions().stream()
                        .map(Permission::getPermissionName)
                        .collect(Collectors.toList()) :
                Collections.emptyList();

        String token = JWT.create()
                .withIssuer(user.getEmail())
                .withClaim("roles", roles)
                .withClaim("permissions", permissions)
                .withIssuedAt(now)
                .withExpiresAt(validity)
                .sign(Algorithm.HMAC256(secretKey));

        user.setToken(token); // Set the token in the UserDto object

        return token;
    }


    public Authentication validateToken(String token) {
        JWTVerifier verifier = JWT.require(Algorithm.HMAC256(secretKey)).build();

        DecodedJWT decoded = verifier.verify(token);

        UserDto user = userService.findByEmail(decoded.getIssuer());
        List<String> roles = decoded.getClaim("roles").asList(String.class);
        List<String> permissions = decoded.getClaim("permissions").asList(String.class);

        Set<SimpleGrantedAuthority> grantedAuthorities = new HashSet<>();
        roles.forEach(role -> grantedAuthorities.add(new SimpleGrantedAuthority(role)));
        permissions.forEach(permission -> grantedAuthorities.add(new SimpleGrantedAuthority(permission)));

            return new UsernamePasswordAuthenticationToken(user, null,grantedAuthorities);
    }
}
