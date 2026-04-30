# Contract: GET /delapena/v1/pets

**Endpoint**: `GET /delapena/v1/pets`  
**Purpose**: Retrieve a paginated, filterable, sortable list of available pets.  
**Version**: 1.0.0

## Request

### Query Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| species | string | No | (none) | Filter by pet species: `dogs`, `cats`, `birds`, `fishes` |
| min_price | number | No | 0 | Filter by minimum price (inclusive) |
| max_price | number | No | 999999 | Filter by maximum price (inclusive) |
| availability | string | No | `in_stock` | Filter by stock: `in_stock`, `low_stock`, `out_of_stock`, or `all` |
| sort | string | No | `relevance` | Sort results by: `relevance`, `newest`, `price_asc`, `price_desc` |
| page_cursor | string | No | (none) | Cursor for pagination; omit for first page |
| limit | integer | No | 10 | Items per page (min: 1, max: 100) |

### Example Request
```
GET /delapena/v1/pets?species=dogs&min_price=100&max_price=500&availability=in_stock&sort=price_asc&limit=10
```

## Response

### Success Response (200 OK)

```json
{
  "items": [
    {
      "id": "pet-001",
      "name": "Buddy",
      "species": "dogs",
      "age": 2,
      "price": 299.99,
      "availability_status": "in_stock",
      "short_description": "Friendly golden retriever, great with families",
      "images": [
        {
          "id": "img-001",
          "url": "https://cdn.petstore.com/pets/pet-001/main.jpg",
          "alt_text": "Buddy the golden retriever"
        }
      ],
      "seller_id": "seller-123",
      "seller_name": "Happy Paws Ranch"
    }
  ],
  "pagination": {
    "next_cursor": "cursor-xyz",
    "has_more": true,
    "total_count": 245
  },
  "filters_applied": {
    "species": "dogs",
    "min_price": 100,
    "max_price": 500,
    "availability": "in_stock"
  }
}
```

### Field Descriptions

| Field | Type | Description |
|-------|------|-------------|
| items[] | array | List of pet listings |
| items[].id | string | Unique identifier for the pet |
| items[].name | string | Pet name |
| items[].species | string | Pet species (dogs, cats, birds, fishes) |
| items[].age | integer | Pet age in years |
| items[].price | number | Price in USD |
| items[].availability_status | string | in_stock, low_stock, out_of_stock |
| items[].short_description | string | Brief description of the pet |
| items[].images[] | array | Pet images with CDN URLs |
| items[].seller_id | string | ID of the seller |
| items[].seller_name | string | Name of the seller |
| pagination.next_cursor | string | Cursor for next page (null if no more pages) |
| pagination.has_more | boolean | Whether more results available |
| pagination.total_count | integer | Total number of matching items |
| filters_applied | object | Echo of applied filters |

### Error Responses

#### 400 Bad Request
```json
{
  "error": "invalid_parameter",
  "message": "Invalid species value: 'hamsters'. Allowed: dogs, cats, birds, fishes",
  "code": "INVALID_SPECIES"
}
```

#### 500 Internal Server Error
```json
{
  "error": "internal_error",
  "message": "Failed to fetch listings. Please try again later.",
  "code": "DB_ERROR"
}
```

## Validation Rules

- **species**: must be one of `dogs`, `cats`, `birds`, `fishes`
- **min_price** & **max_price**: must be non-negative numbers; min_price ≤ max_price
- **limit**: must be between 1 and 100
- **sort**: must be one of `relevance`, `newest`, `price_asc`, `price_desc`
- **availability**: must be one of `in_stock`, `low_stock`, `out_of_stock`, `all`

## Performance SLA

- Response time: < 1 second (p95) for standard queries (no pagination cursor required)
- Availability: 99.5% uptime
- Rate limit: 100 requests/minute per client (by IP or auth token)

## Compatibility

- **DEPRECATED**: None yet
- **BREAKING CHANGES**: Version will bump to 2.0.0 if endpoint path changes or required response fields removed
