package com.github.snimmagadda1.chatservice.config;

import jakarta.servlet.http.HttpServletRequest;
import java.util.Collections;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.config.oauth2.client.CommonOAuth2Provider;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.registration.InMemoryClientRegistrationRepository;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

@Configuration
public class SecurityConfig {

  @Bean
  SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
    http.securityContext((context) -> context.requireExplicitSave(false))
        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.ALWAYS))
        .csrf()
        .disable() // TODO
        .cors(
            corsCustomizer ->
                corsCustomizer.configurationSource(
                    new CorsConfigurationSource() {
                      @Override
                      public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
                        CorsConfiguration config = new CorsConfiguration();
                        config.setAllowedOrigins(
                            Collections.singletonList("http://localhost:4200"));
                        config.setAllowedMethods(Collections.singletonList("*"));
                        config.setAllowCredentials(true);
                        config.setAllowedHeaders(Collections.singletonList("*"));
                        config.setMaxAge(3600L);
                        return config;
                      }
                    }))
        .authorizeHttpRequests(
            (requests) ->
                requests.requestMatchers("/login").permitAll().anyRequest().authenticated())
        .oauth2Login(Customizer.withDefaults())
        .httpBasic(Customizer.withDefaults());
    return http.build();
  }

  @Bean
  public ClientRegistrationRepository clientRepository() {
    ClientRegistration clientReg = clientRegistration();
    return new InMemoryClientRegistrationRepository(clientReg);
  }

  private ClientRegistration clientRegistration() {
    return CommonOAuth2Provider.GITHUB
        .getBuilder("github")
        .clientId("TODO")
        .clientSecret("TODO")
        .build();
  }
}
