package com.authorization.authorizartionapp.models.service;

import com.authorization.authorizartionapp.models.dao.IRoleDao;
import com.authorization.authorizartionapp.models.entity.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RoleImpl implements IRoleService{
    @Autowired
    private IRoleDao roleDao;
    @Override
    public Optional<Role> findRole(Long id) {
        return roleDao.findById(id);
    }
}
