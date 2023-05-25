package com.authorization.authorizartionapp.models.service;

import com.authorization.authorizartionapp.models.entity.Usuario;

public interface IUsuarioService {
    public Usuario createClient(Usuario cliente);
    public Usuario findClientEmail(String username);
}
