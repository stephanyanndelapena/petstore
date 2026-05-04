package com.delapena.petstore.catalog;

import java.util.List;

public interface PetRepositoryCustom {
    List<Pet> findByFilters(List<String> species, String search, Integer minPrice, Integer maxPrice, String availability, String cursor, int limit);
}
