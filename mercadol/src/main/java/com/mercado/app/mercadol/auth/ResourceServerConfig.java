package com.mercado.app.mercadol.auth;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;

@Configuration
@EnableResourceServer//configuraciones para el cliente
public class ResourceServerConfig extends ResourceServerConfigurerAdapter {

    @Override
    public void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests().antMatchers(HttpMethod.POST, "/api/v1/cliente/**").permitAll()
                .antMatchers(HttpMethod.GET, "/api/v1/uploads/img/{nombreFoto:.+}").permitAll()

                //  .antMatchers(HttpMethod.GET, "/api/v1/uploads/img/{nombreFoto:.+}").hasAnyRole("USER", "ADMIN")
                .antMatchers("/img/**","/**","/images/**","/static/**", "/", "/home", "/create/**", "/home/page/**", "/du", "/dd", "/dt", "/dc").permitAll()
                /* .antMatchers(HttpMethod.GET, "/api/v1/products").hasAnyRole("USER", "ADMIN")
                 .antMatchers(HttpMethod.GET, "/api/v1//product/{id}").hasRole("ADMIN")
                 .antMatchers(HttpMethod.GET, "/api/v1/product/p/{nombre}").hasRole("ADMIN")
                 .antMatchers(HttpMethod.POST, "/api/v1/product/c").hasRole("ADMIN")
                 .antMatchers(HttpMethod.PUT, "/api/v1/product/u/{id}").hasRole("ADMIN")
                 .antMatchers(HttpMethod.DELETE, "/api/v1/product/d/{id}").hasRole("ADMIN") */
                .anyRequest().authenticated()
                .and().cors().configurationSource(corsConfigurationSource());
    }

    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000","http://127.0.0.1:5500" ,"http://20.228.179.23:8080","http://localhost:8080","https://lemon-hill-02bded510.2.azurestaticapps.net"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowCredentials(true);
        configuration.setAllowedHeaders(Arrays.asList("Content-Type", "Authorization"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

    @Bean
    public FilterRegistrationBean<CorsFilter> corsFilter() {
        FilterRegistrationBean<CorsFilter> bean = new FilterRegistrationBean<CorsFilter>(new CorsFilter(corsConfigurationSource()));
        bean.setOrder(Ordered.HIGHEST_PRECEDENCE);

        return bean;
    }
}
