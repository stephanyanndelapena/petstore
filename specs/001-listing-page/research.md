# Research: Listing Page

## Decision: Pagination strategy
- Chosen: Cursor-based pagination for scalability and consistent results under concurrent writes.
- Rationale: Better for large datasets and avoids duplicates when items change. Offset pagination acceptable for small catalogs.
- Alternatives: Offset pagination (simpler), search-index-based paging (via Elastic) for advanced ranking.

## Decision: Search & Filtering
- Chosen: DB-backed filtering with indexed columns for species and availability; use simple full-text search in Postgres for title/description.
- Rationale: Simpler operationally and sufficient for MVP. Move to search index if query complexity or scale demands.

## Decision: Real-time availability
- Chosen: Event-driven inventory updates (publish-subscribe) with short TTL caching for listings; add-on: optimistic availability check on add-to-cart.
- Rationale: Balances freshness with performance.

## CDN & Image Loading
- Use CDN-hosted images with responsive srcset and lazy loading. Provide placeholders/skeletons for perceived performance.

## URL State
- Persist filter/sort/pagination in query params to allow sharing and bookmarking (e.g., ?species=dogs&min=100&max=500&page_cursor=xyz)


