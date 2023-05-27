package com.mercado.app.mercadol;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class MercadolApplication {

//1020 C4
	public static void main(String[] args) {
		SpringApplication.run(MercadolApplication.class, args);
	}


}
