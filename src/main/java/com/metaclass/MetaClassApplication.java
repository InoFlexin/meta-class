package com.metaclass;

import com.metaclass.configuration.AppProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@EnableConfigurationProperties(AppProperties.class)
@SpringBootApplication
public class MetaClassApplication {

    public static void main(String[] args) {
        SpringApplication.run(MetaClassApplication.class);
    }

}
