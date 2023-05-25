package com.authorization.authorizartionapp.models.service;

import com.authorization.authorizartionapp.models.dao.IUsuarioDao;
import com.authorization.authorizartionapp.models.entity.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsuarioImpl implements IUsuarioService{

    @Autowired
    private IUsuarioDao usuarioDao;

    @Override
    public Usuario createClient(Usuario cliente) {
        return usuarioDao.save(cliente);
    }

    @Override
    public Usuario findClientEmail(String username) {
        return usuarioDao.findByEmail(username);
    }
}
