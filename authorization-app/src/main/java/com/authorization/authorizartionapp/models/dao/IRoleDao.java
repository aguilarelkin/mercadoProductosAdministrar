package com.authorization.authorizartionapp.models.dao;

import com.authorization.authorizartionapp.models.entity.Role;
import com.authorization.authorizartionapp.models.entity.Usuario;
import com.authorization.authorizartionapp.models.enums.RoleNum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IRoleDao extends JpaRepository<Role, Long> {

    Optional<Role> findByNombre(RoleNum nombre);
}
