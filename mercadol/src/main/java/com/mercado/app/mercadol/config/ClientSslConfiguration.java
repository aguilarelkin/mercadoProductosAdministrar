package com.mercado.app.mercadol.config;

/*
import org.apache.http.client.HttpClient;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.ssl.SSLContextBuilder;

 */
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.web.client.RestTemplate;

import javax.net.ssl.SSLContext;

//@Configuration
public class ClientSslConfiguration {
  /*
    @Value("${server.ssl.key-store}")
    private Resource trustStore;
    @Value("${server.ssl.key-store-password}")
    private String trustStorePassword;
    String protocol = "TLSv1.2";
    @Bean
    RestTemplate restTemplate() throws Exception {
        SSLContext sslContext = new SSLContextBuilder()
                .loadTrustMaterial(
                        trustStore.getURL(),
                        trustStorePassword.toCharArray()
                ).build();
        SSLConnectionSocketFactory socketFactory =
                new SSLConnectionSocketFactory(sslContext);
        HttpClient httpClient = HttpClients.custom()
                .setSSLSocketFactory(socketFactory).build();
        HttpComponentsClientHttpRequestFactory factory =
                new HttpComponentsClientHttpRequestFactory(httpClient);
        return new RestTemplate(factory);
    }

   */
}