package com.delapena.petstore.catalog;

import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class PetRepositoryCustomImpl implements PetRepositoryCustom {
    @Override
    public List<Pet> findByFilters(String species, Integer minPrice, Integer maxPrice, String availability, String cursor, int limit) {
        // TODO: implement query with cursor-based pagination and deterministic ordering
        return List.of();
    }
}
