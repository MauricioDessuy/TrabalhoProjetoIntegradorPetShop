package com.petshop.main.webconfig;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * Classe utilizada para adicionar configurações nas mensagens REST.<br>
 * Pois a validação CORS não estava permitindo mandar mensagens em um mesmo servidor porém utilizando portas diferentes.<br>
 * Por exemplo: localhost:4200 para localhost:8080.
 * @author MuMau
 */
@Configuration
@EnableWebMvc
public class WebConfig extends WebMvcConfigurerAdapter {

    @Override
    /**
     * Método que adiciona as permissões no header da mensagens REST.
     */
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD", "TRACE", "CONNECT");
    }
}
