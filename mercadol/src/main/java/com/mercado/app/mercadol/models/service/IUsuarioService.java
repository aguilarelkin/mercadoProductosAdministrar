package com.mercado.app.mercadol.models.service;

import com.mercado.app.mercadol.models.entity.Usuario;

public interface IUsuarioService {

    public Usuario findByUsername(String username);

}
