package com.mercado.app.mercadol.models.dao;

import com.mercado.app.mercadol.models.entity.Usuario;
import org.springframework.data.repository.CrudRepository;

public interface IUsuarioDao extends CrudRepository<Usuario,Long> {

    public Usuario findByUsername(String username);

}
