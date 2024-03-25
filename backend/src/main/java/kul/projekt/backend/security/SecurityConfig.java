package kul.projekt.backend.security;

import kul.projekt.backend.service.UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import javax.sql.DataSource;

@Configuration
public class SecurityConfig {
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UserDetailsManager userDetailsManager(DataSource dataSource){
        JdbcUserDetailsManager jdbcUserDetailsManager = new JdbcUserDetailsManager(dataSource);

        jdbcUserDetailsManager.setUsersByUsernameQuery(
                "SELECT username, password, enabled FROM users WHERE username =?"
//                "SELECT username, password, enabled FROM users WHERE username=?"
        );

        jdbcUserDetailsManager.setAuthoritiesByUsernameQuery(
                "SELECT u.username, p.permission_name FROM users u JOIN users_roles ur ON u.id = ur.user_id JOIN role_permission rp ON ur.role_id = rp.role_id JOIN permissions p ON rp.permission_id = p.permission_id WHERE u.username =?"
//                "SELECT u.username,p.permission_name FROM users u JOIN roles r ON u.role_id = r.role_id JOIN role_permission rp ON r.role_id = rp.role_id JOIN permissions p ON rp.permission_id = p.permission_id WHERE u.username =?"
        );


        return jdbcUserDetailsManager;

    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider(UserService userService) {
        DaoAuthenticationProvider auth = new DaoAuthenticationProvider();
        auth.setUserDetailsService(userService); //set the custom user details service
//        auth.setPasswordEncoder(passwordEncoder());
        return auth;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, AuthenticationSuccessHandler authenticationSuccessHandler) throws Exception{
        http.authorizeHttpRequests(configurer ->
                        configurer
                                .requestMatchers("/").hasAnyRole("USER", "ADMINISTRATOR")
                                .requestMatchers("/testAdminEndpoint").hasRole("ADMINISTRATOR")
                                .requestMatchers("/register/**").permitAll()
                                .anyRequest().authenticated()

                )
                .formLogin(form -> form
                        .successHandler(authenticationSuccessHandler)
                        .permitAll()
                )
                .logout(logout -> logout.permitAll()
                )
                .exceptionHandling(configurer ->
                        configurer.accessDeniedPage("/access-denied")
                );
        return http.build();
    }

}
