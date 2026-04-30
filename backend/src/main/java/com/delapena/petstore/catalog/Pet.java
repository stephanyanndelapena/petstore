package com.delapena.petstore.catalog;

import jakarta.persistence.*;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "pets")
public class Pet {
    @Id
    private UUID id;

    private String name;

    private String species;

    private Integer ageYears;

    private Integer priceCents;

    private String availabilityStatus;

    @Column(columnDefinition = "jsonb")
    private String images;

    private String shortDescription;

    private UUID sellerId;

    private OffsetDateTime createdAt;
    private OffsetDateTime updatedAt;

    // getters/setters omitted for brevity
}
