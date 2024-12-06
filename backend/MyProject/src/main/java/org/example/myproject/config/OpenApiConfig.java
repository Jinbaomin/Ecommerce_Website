package org.example.myproject.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenApi(
            @Value("${open.api.title}") String title,
            @Value("${open.api.version}") String version,
            @Value("${open.api.description}") String description,
            @Value("${open.api.serverUrl}") String serverURL,
            @Value("${open.api.serverName}") String serverName
    ) {
        return new OpenAPI()
                .info(new Info()
                        .title(title)
                        .version(version)
                        .description(description)
                        .contact(new Contact().name("Jinbaomin").email("jinbaomin0304@gmail.com")));
//                .servers(List.of(new Server().url(serverURL)
//                                .description(serverName)
//                ));
    }

//    @Bean
//    public GroupedOpenApi groupedOpenApi() {
//        return GroupedOpenApi.builder()
//                .group("api-service")
//                .packagesToScan("org.example.myproject.model")
//                .build();
//    }
}
