package com.mercado.app.mercadol.models.service;

import com.mercado.app.mercadol.models.entity.Role;

import java.util.Optional;

public interface IRoleService {

    public Optional<Role> findRole(Long id);


}
