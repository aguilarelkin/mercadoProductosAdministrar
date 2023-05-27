package com.mercado.app.mercadol.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/resource")
public class ResorceController {

    @GetMapping("/user")
    public ResponseEntity<?> userr(Authentication authentication) {

        Map<String, Object> response = new HashMap<>();
        response.put("mensaje", "Hola " + authentication.getName());
        response.put("user", authentication);

        return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
    }

    @GetMapping("/admin")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> admin(Authentication authentication) {

        Map<String, Object> response = new HashMap<>();
        response.put("mensaje", "Hola admin " + authentication.getName());
        response.put("user", authentication);
        return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
    }
}
