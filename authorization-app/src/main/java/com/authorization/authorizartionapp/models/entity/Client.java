package com.authorization.authorizartionapp.models.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.ClientAuthenticationMethod;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClient;
import org.springframework.security.oauth2.server.authorization.settings.ClientSettings;

import java.time.Instant;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "client")
@Getter@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String clientId;
    private String clientSecret;

    @Column(length = 1000)
    @ElementCollection(fetch = FetchType.EAGER)
    private Set<ClientAuthenticationMethod> clientAuthenticationMethods;

    @Column(length = 1000)
    @ElementCollection(fetch = FetchType.EAGER)
    private Set<AuthorizationGrantType> authorizationGrantTypes;

    @Column(length = 1000)
    @ElementCollection(fetch = FetchType.EAGER)
    private Set<String> redirectUris;

    @Column(length = 1000)
    private Set<String> scopes;
    private Boolean requireProofKey;

    public static RegisteredClient registeredClient(Client client){
        RegisteredClient.Builder builder = RegisteredClient.withId(client.getClientId())
                .clientId(client.getClientId())
                .clientSecret(client.getClientSecret())
                .clientIdIssuedAt(new Date().toInstant())
                .clientAuthenticationMethods(am -> am.addAll(client.getClientAuthenticationMethods()))
                .authorizationGrantTypes(agt ->agt.addAll(client.getAuthorizationGrantTypes()))
                .redirectUris(ru -> ru.addAll(client.getRedirectUris()))
                .scopes(sc ->sc.addAll(client.getScopes()))
                .clientSettings(ClientSettings.builder().requireProofKey(client.getRequireProofKey()).build());
        return builder.build();
    }
}
