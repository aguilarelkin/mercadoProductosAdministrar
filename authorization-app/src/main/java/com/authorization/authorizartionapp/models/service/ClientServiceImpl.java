package com.authorization.authorizartionapp.models.service;

import com.authorization.authorizartionapp.models.dao.IClientDao;
import com.authorization.authorizartionapp.models.entity.Client;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClient;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClientRepository;
import org.springframework.stereotype.Service;

@Service
public class ClientServiceImpl implements RegisteredClientRepository {

    @Autowired
    private IClientDao clientDao;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private Client clientAu(Client cl) {
        Client client = Client.builder()
                .clientId(cl.getClientId())
                .clientSecret(passwordEncoder.encode(cl.getClientSecret()))
                .clientAuthenticationMethods(cl.getClientAuthenticationMethods())
                .authorizationGrantTypes(cl.getAuthorizationGrantTypes())
                .redirectUris(cl.getRedirectUris())
                .scopes(cl.getScopes())
                .requireProofKey(cl.getRequireProofKey())
                .build();
        return client;
    }

    @Override
    public void save(RegisteredClient registeredClient) {

    }

    public String create(Client registeredClient) {
        Client client = clientAu(registeredClient);
                clientDao.save(client);

        return "Client " + client.getId() + " saved";
    }

    @Override
    public RegisteredClient findById(String id) {
        Client client = clientDao.findByClientId(id)
                .orElseThrow(() -> new RuntimeException("Client not found"));
        return Client.registeredClient(client);
    }

    @Override
    public RegisteredClient findByClientId(String clientId) {
        Client client = clientDao.findByClientId(clientId)
                .orElseThrow(() -> new RuntimeException("Client not found"));
        return Client.registeredClient(client);
    }
}
