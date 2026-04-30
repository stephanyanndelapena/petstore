package com.delapena.petstore.catalog;

import java.util.List;
import java.util.UUID;

public class PetResponseDto {
    public UUID id;
    public String name;
    public String species;
    public Integer age;
    public Integer price;
    public String availabilityStatus;
    public String shortDescription;
    public List<ImageDto> images;
    public String sellerId;

    public static class ImageDto { public String id; public String url; public String altText; }
}
