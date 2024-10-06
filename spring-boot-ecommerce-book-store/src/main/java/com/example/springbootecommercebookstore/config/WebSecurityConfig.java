package com.example.springbootecommercebookstore.config;


import com.example.springbootecommercebookstore.enums.RoleEnum;
import com.example.springbootecommercebookstore.services.UserInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class WebSecurityConfig {

    private static final String[] WHITE_LIST_URL = {
            "/api/auth/**",
            "/api/states/**",
            "/api/product-category/**",
            "/api/language/**",
            "/api/email/send-email",
            "/api/countries/**",
            "api/author/**"
            //"/api/users/single/**"

    };
    private static final String[] WHITE_PRODUCT_LIST_URL = {
            "/api/products/all",
            "/api/products/single",
            "/api/products/by-category",
            "/api/products/by-categories",
            "/api/products/find-by-name",
            "/api/products/find-by-name-or-author",
            "/api/products/last-three-products",
            "/api/products/filter-by-price"
    };
    private static final String[] ADMIN_MANAGER_LIST_URL = {
            "/api/products/create",
            "/api/products/update/**",
            "/api/orders/change-status"
    };
    private static final String[] MANAGER_LIST_URL = {
            "/api/users/all",
            "/api/users/change-status/**",
            "/api/users/roles",
            "/api/products/delete/**"
    };
    private static  final String[] USER_LIST_URL = {
            "/api/orders/purchase"
    };

    private final JwtAuthFilter authFilter;
    private final UserInfoService userDetailsService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .csrf(AbstractHttpConfigurer::disable)// Disable CSRF for stateless APIs
                .authorizeHttpRequests(auth -> auth
                                .requestMatchers(WHITE_LIST_URL).permitAll()
                                .requestMatchers(WHITE_PRODUCT_LIST_URL).permitAll()
                                .requestMatchers(ADMIN_MANAGER_LIST_URL).hasAnyRole(RoleEnum.ADMIN.getRole(),RoleEnum.MANAGER.getRole())
                                .requestMatchers(MANAGER_LIST_URL).hasRole(RoleEnum.MANAGER.getRole())
                                .requestMatchers(USER_LIST_URL).hasRole(RoleEnum.USER.getRole())
                                .anyRequest().authenticated()
                )
                .sessionManagement(sess -> sess
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS) // No sessions
                )
                .authenticationProvider(authenticationProvider()) // Custom authentication provider
                .addFilterBefore(authFilter, UsernamePasswordAuthenticationFilter.class); // Add JWT filter

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // Password encoding
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsService);
        authenticationProvider.setPasswordEncoder(passwordEncoder());
        return authenticationProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
