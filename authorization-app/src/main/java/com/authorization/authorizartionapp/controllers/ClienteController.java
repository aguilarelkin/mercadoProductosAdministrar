package com.authorization.authorizartionapp.controllers;

import com.authorization.authorizartionapp.models.dao.IUsuarioDao;
import com.authorization.authorizartionapp.models.entity.Role;
import com.authorization.authorizartionapp.models.entity.Usuario;
import com.authorization.authorizartionapp.models.service.IRoleService;
import com.authorization.authorizartionapp.models.service.IUsuarioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/auth")
public class ClienteController {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private IUsuarioService usuarioService;
    @Autowired
    private IRoleService roleService;

    @PostMapping("/post")
    public ResponseEntity<?> createCliente(@Valid @RequestBody Usuario cliente, BindingResult result) {
       Usuario clienteCreate = new Usuario();
        Optional<Role> role = null;
        Map<String, Object> response = new HashMap<>();

        if (result.hasErrors()) {

            List<String> errors = result.getFieldErrors()
                    .stream()
                    .map(err -> "El campo '" + err.getField() + "' " + err.getDefaultMessage())
                    .collect(Collectors.toList());

            response.put("errors", errors);
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
        }
        try {

            Usuario existCliente = usuarioService.findClientEmail(cliente.getUsername());

            if (existCliente == null) {
                for (int i = 0; i < cliente.getRoles().size(); i++) {
                    role = roleService.findRole(cliente.getRoles().get(i).getId());
                    clienteCreate.addRole(role.get());
                }


                cliente.setPassword(passwordEncoder.encode(cliente.getPassword()));

                cliente.setRoles(clienteCreate.getRoles());
                clienteCreate = usuarioService.createClient(cliente);


                response.put("mensaje", "El producto ha sido creado con éxito!");
                response.put("cliente", clienteCreate);
            } else {
                response.put("mensaje", "El cliente ya esta registrado");
                response.put("cliente", clienteCreate);
            }


        } catch (DataAccessException e) {
            response.put("mensaje", "Error al realizar el insert en la base de datos");
            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

       /* Map<String, Object> response = new HashMap<>();
        response.put("mensaje", "El producto ha sido creado con éxito!");*/
        return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
    }

}
