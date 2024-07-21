package com.github.snimmagadda1.chatservice.controller;

import com.github.snimmagadda1.chatservice.service.KeycloakService;
import java.util.List;
import org.keycloak.representations.idm.RoleRepresentation;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

  private KeycloakService keycloakService;

  public UserController(KeycloakService keycloakService) {
    this.keycloakService = keycloakService;
  }

  @GetMapping("/roles")
  public List<RoleRepresentation> getRoles() {
    return keycloakService.getKeycloak().realm("chatappdev").roles().list();
  }
}
