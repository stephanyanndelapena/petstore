package com.delapena.petstore.catalog;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PetService {
    private final PetRepository petRepository;

    public PetService(PetRepository petRepository) {
        this.petRepository = petRepository;
    }

    public List<Pet> listPets(String species, Integer minPrice, Integer maxPrice, String availability, String cursor, int limit) {
        return petRepository.findByFilters(species, minPrice, maxPrice, availability, cursor, limit);
    }
}
