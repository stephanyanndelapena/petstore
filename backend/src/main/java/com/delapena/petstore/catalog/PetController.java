package com.delapena.petstore.catalog;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/delapena/v1/pets")
public class PetController {
    private final PetService petService;

    public PetController(PetService petService) { this.petService = petService; }

    @GetMapping
    public ResponseEntity<?> listPets(
            @RequestParam(required = false) List<String> species,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Integer min_price,
            @RequestParam(required = false) Integer max_price,
            @RequestParam(required = false) String availability,
            @RequestParam(required = false) String page_cursor,
            @RequestParam(required = false, defaultValue = "10") Integer limit
    ) {
        List<Pet> items = petService.listPets(species, search, min_price, max_price, availability, page_cursor, limit);
        return ResponseEntity.ok(items);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPetById(@PathVariable UUID id) {
        return petService.getPetById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createPet(@RequestBody Pet pet) {
        try {
            Pet createdPet = petService.createPet(pet);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdPet);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ErrorResponse("Failed to create pet: " + e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePet(@PathVariable UUID id, @RequestBody Pet petDetails) {
        return petService.updatePet(id, petDetails)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePet(@PathVariable UUID id) {
        boolean deleted = petService.deletePet(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    static class ErrorResponse {
        public String message;
        public ErrorResponse(String message) { this.message = message; }
    }
}
