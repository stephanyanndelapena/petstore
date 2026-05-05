package com.delapena.petstore.catalog;

import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class PetService {
    private final PetRepository petRepository;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public PetService(PetRepository petRepository) {
        this.petRepository = petRepository;
    }

    @Transactional(readOnly = true)
    public List<Pet> listPets(List<String> species, String search, Integer minPrice, Integer maxPrice, String availability, String cursor, int limit) {
        return petRepository.findByFilters(species, search, minPrice, maxPrice, availability, cursor, limit);
    }

    @Transactional(readOnly = true)
    public Optional<Pet> getPetById(UUID id) {
        return petRepository.findById(id);
    }

    public Pet createPet(Pet pet) {
        if (pet.getId() == null) {
            pet.setId(UUID.randomUUID());
        }
        pet.setCreatedAt(OffsetDateTime.now());
        pet.setUpdatedAt(OffsetDateTime.now());
        return petRepository.save(pet);
    }

    public Optional<Pet> updatePet(UUID id, Pet petDetails) {
        return petRepository.findById(id).map(existingPet -> {
            if (petDetails.getName() != null) {
                existingPet.setName(petDetails.getName());
            }
            if (petDetails.getSpecies() != null) {
                existingPet.setSpecies(petDetails.getSpecies());
            }
            if (petDetails.getAgeYears() != null) {
                existingPet.setAgeYears(petDetails.getAgeYears());
            }
            if (petDetails.getPriceCents() != null) {
                existingPet.setPriceCents(petDetails.getPriceCents());
            }
            if (petDetails.getAvailabilityStatus() != null) {
                existingPet.setAvailabilityStatus(petDetails.getAvailabilityStatus());
            }
            if (petDetails.getImages() != null) {
                existingPet.setImages(petDetails.getImages());
            }
            if (petDetails.getImageUrl() != null) {
                existingPet.setImageUrl(petDetails.getImageUrl());
            }
            if (petDetails.getShortDescription() != null) {
                existingPet.setShortDescription(petDetails.getShortDescription());
            }
            if (petDetails.getSellerId() != null) {
                existingPet.setSellerId(petDetails.getSellerId());
            }
            existingPet.setUpdatedAt(OffsetDateTime.now());
            return petRepository.save(existingPet);
        });
    }

    public boolean deletePet(UUID id) {
        if (petRepository.existsById(id)) {
            petRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
