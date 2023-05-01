package com.mercado.app.mercadol.models.dao;

import com.mercado.app.mercadol.models.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IRoleDao extends JpaRepository<Role, Long> {
}
