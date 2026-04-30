package com.delapena.petstore.catalog;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
@Profile("local")
public class DataInitializer implements CommandLineRunner {
    private final JdbcTemplate jdbc;

    public DataInitializer(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    @Override
    public void run(String... args) throws Exception {
        // Insert a few sample pets for local development
        String sql = "INSERT INTO pets (id, name, species, age_years, price_cents, availability_status, images, short_description, seller_id, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?,?,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)";

        jdbc.update(sql, UUID.randomUUID().toString(), "Buddy", "DOG", 3, 19999, "AVAILABLE", "[]", "Friendly dog", null);
        jdbc.update(sql, UUID.randomUUID().toString(), "Whiskers", "CAT", 2, 9999, "AVAILABLE", "[]", "Playful cat", null);
        jdbc.update(sql, UUID.randomUUID().toString(), "Tweety", "BIRD", 1, 4999, "AVAILABLE", "[]", "Small bird", null);
        jdbc.update(sql, UUID.randomUUID().toString(), "Goldie", "FISH", 1, 1999, "AVAILABLE", "[]", "Goldfish", null);
    }
}
