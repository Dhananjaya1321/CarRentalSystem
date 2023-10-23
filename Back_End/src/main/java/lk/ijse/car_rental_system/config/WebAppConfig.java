package lk.ijse.car_rental_system.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@Configuration
@EnableWebMvc
@ComponentScan(basePackages = "lk.ijse.car_rental_system.controller")
public class WebAppConfig {

}
