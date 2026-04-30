package com.delapena.petstore.catalog;

import java.util.List;

public interface PetRepositoryCustom {
    List<Pet> findByFilters(String species, Integer minPrice, Integer maxPrice, String availability, String cursor, int limit);
}
