package com.authorization.authorizartionapp.models.service;

import com.authorization.authorizartionapp.models.entity.Role;

import java.util.Optional;

public interface IRoleService {
    public Optional<Role> findRole(Long id);
}
