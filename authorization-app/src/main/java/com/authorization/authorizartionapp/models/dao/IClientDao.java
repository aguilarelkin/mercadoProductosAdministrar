package com.authorization.authorizartionapp.models.dao;

import com.authorization.authorizartionapp.models.entity.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IClientDao extends JpaRepository<Client, String> {
                    //151 c3
    Optional<Client> findByClientId(String clientId);
}
