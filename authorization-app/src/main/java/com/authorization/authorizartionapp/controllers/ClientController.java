package com.authorization.authorizartionapp.controllers;

import com.authorization.authorizartionapp.models.entity.Client;
import com.authorization.authorizartionapp.models.entity.Role;
import com.authorization.authorizartionapp.models.entity.Usuario;
import com.authorization.authorizartionapp.models.service.ClientServiceImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
@RequestMapping("/client")
public class ClientController {

    @Autowired
    private ClientServiceImpl clientService;

    @PostMapping("/create")
    public ResponseEntity<?> createClient(@Valid @RequestBody Client cliente, BindingResult result) {
        Map<String, Object> response = new HashMap<>();

        try {
            clientService.create(cliente);

            response.put("mensaje", "El cliente ha sido creado con éxito!");
            response.put("cliente", cliente);


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
