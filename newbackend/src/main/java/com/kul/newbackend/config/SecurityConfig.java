package com.kul.newbackend.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final UserAuthenticationEntryPoint userAuthenticationEntryPoint;
    private final UserAuthProvider userAuthenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .exceptionHandling().authenticationEntryPoint(userAuthenticationEntryPoint)
                .and()
                .addFilterBefore(new JwtAuthFilter(userAuthenticationProvider), BasicAuthenticationFilter.class)
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeHttpRequests((requests) -> requests
                        .requestMatchers(HttpMethod.POST, "/login", "/register").permitAll()
                                .requestMatchers(HttpMethod.POST,"/api/orders").hasAuthority("PERM_ADD_ORDER")
                                .requestMatchers(HttpMethod.GET,"/api/orders/**").hasAuthority("PERM_VIEW_ORDER")
                                .requestMatchers(HttpMethod.PUT,"/api/orders/**").hasAuthority("PERM_EDIT_ORDER")
                                .requestMatchers(HttpMethod.DELETE,"/api/orders/**").hasAuthority("PERM_DELETE_ORDER")
                                .requestMatchers(HttpMethod.POST,"/api/products").hasAuthority("PERM_ADD_PRODUCTS")
                                .requestMatchers(HttpMethod.GET,"/api/products/**").hasAuthority("PERM_VIEW_PRODUCTS")
                                .requestMatchers(HttpMethod.PUT,"/api/products/**").hasAuthority("PERM_EDIT_PRODUCTS")
                                .requestMatchers(HttpMethod.DELETE,"/api/products/**").hasAuthority("PERM_DELETE_PRODUCTS")
                                .requestMatchers(HttpMethod.POST,"/api/productTypes").hasAuthority("PERM_ADD_TYPES")
                                .requestMatchers(HttpMethod.GET,"/api/productTypes/**").hasAuthority("PERM_VIEW_TYPES")
                                .requestMatchers(HttpMethod.PUT,"/api/productTypes/**").hasAuthority("PERM_EDIT_TYPES")
                                .requestMatchers(HttpMethod.DELETE,"/api/productTypes/**").hasAuthority("PERM_DELETE_TYPES")
                                .requestMatchers(HttpMethod.POST,"/api/warehouses").hasAuthority("PERM_ADD_WAREHOUSES")
                                .requestMatchers(HttpMethod.GET,"/api/warehouses/**").hasAuthority("PERM_VIEW_WAREHOUSES")
                                .requestMatchers(HttpMethod.PUT,"/api/warehouses/**").hasAuthority("PERM_EDIT_WAREHOUSES")
                                .requestMatchers(HttpMethod.DELETE,"/api/warehouses/**").hasAuthority("PERM_DELETE_WAREHOUSES")
                                .requestMatchers(HttpMethod.POST,"/api/warehousesStatus").hasAuthority("PERM_ADD_STATUS")
                                .requestMatchers(HttpMethod.GET,"/api/warehousesStatus/**").hasAuthority("PERM_VIEW_STATUS")
                                .requestMatchers(HttpMethod.PUT,"/api/warehousesStatus/**").hasAuthority("PERM_EDIT_STATUS")
                                .requestMatchers(HttpMethod.DELETE,"/api/warehousesStatus/**").hasAuthority("PERM_DELETE_STATUS")
                                .requestMatchers(HttpMethod.POST,"/api/clients").hasAuthority("PERM_ADD_CLIENTS")
                                .requestMatchers(HttpMethod.GET,"/api/clients/**").hasAuthority("PERM_VIEW_CLIENTS")
                                .requestMatchers(HttpMethod.PUT,"/api/clients/**").hasAuthority("PERM_EDIT_CLIENTS")
                                .requestMatchers(HttpMethod.DELETE,"/api/clients/**").hasAuthority("PERM_DELETE_CLIENTS")
                                .anyRequest().authenticated())
//                        .requestMatchers("/api/products/**").authenticated()
//                        .requestMatchers("api/productTypes/**").authenticated()
//                        .requestMatchers("/api/warehouses/**").authenticated()
//                        .requestMatchers("/api/warehousesStatus/**").authenticated()
//                        .requestMatchers("/api/orders/**").authenticated()
//                        .requestMatchers( "/api/orders/**").authenticated()
//                        .requestMatchers("/api/orderItems/**").authenticated()
//                        .requestMatchers("/api/users/**").authenticated()
//                        .anyRequest().authenticated())
        ;
        return http.build();
    }
}
