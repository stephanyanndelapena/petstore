package com.delapena.petstore.catalog;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/delapena/v1/pets")
public class PetController {
    private final PetService petService;

    public PetController(PetService petService) { this.petService = petService; }

    @GetMapping
    public ResponseEntity<?> listPets(
            @RequestParam(required = false) String species,
            @RequestParam(required = false) Integer min_price,
            @RequestParam(required = false) Integer max_price,
            @RequestParam(required = false) String availability,
            @RequestParam(required = false) String page_cursor,
            @RequestParam(required = false, defaultValue = "10") Integer limit
    ) {
        List<Pet> items = petService.listPets(species, min_price, max_price, availability, page_cursor, limit);
        return ResponseEntity.ok(items);
    }
}
