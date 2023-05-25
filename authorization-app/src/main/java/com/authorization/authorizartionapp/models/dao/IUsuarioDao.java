package com.authorization.authorizartionapp.models.dao;

import com.authorization.authorizartionapp.models.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IUsuarioDao extends JpaRepository<Usuario, Long> {

    Usuario findByEmail(String email);

}
