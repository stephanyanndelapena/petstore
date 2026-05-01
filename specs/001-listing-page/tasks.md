# Tasks: Listing Page

Phase 1: Setup

- [ ] T001 [P] Create backend Maven skeleton and pom.xml at backend\pom.xml
- [ ] T002 [P] Create frontend React skeleton and package.json at frontend\package.json
- [ ] T003 [P] Create integration-tests folder and e2e config at integration-tests\e2e\config.js
- [ ] T004 [P] Add CI workflow file at .github\workflows\ci.yml (run tests, build)

Phase 2: Foundational (blocking)

- [ ] T005 Create DB migration V1__create_pets_table.sql at backend\src\main\resources\db\migration\V1__create_pets_table.sql
- [ ] T006 Create Pet JPA entity at backend\src\main\java\com\delapena\petstore\catalog\Pet.java
- [ ] T007 Create Seller JPA entity at backend\src\main\java\com\delapena\petstore\catalog\Seller.java
- [ ] T008 Create Inventory entity at backend\src\main\java\com\delapena\petstore\catalog\Inventory.java
- [ ] T009 Create PetRepository interface at backend\src\main\java\com\delapena\petstore\catalog\PetRepository.java
- [ ] T010 Create PetService class at backend\src\main\java\com\delapena\petstore\catalog\PetService.java
- [ ] T011 Create PetResponseDto at backend\src\main\java\com\delapena\petstore\catalog\PetResponseDto.java
- [ ] T012 Create PetController with GET /delapena/v1/pets at backend\src\main\java\com\delapena\petstore\catalog\PetController.java
- [ ] T013 Add application.yml with datasource config at backend\src\main\resources\application.yml
- [ ] T014 Add Flyway dependency and configuration to backend\pom.xml

Phase 3: User Stories

US1 (P1): View paginated listings

- [ ] T015 [US1] Implement listPets service method in backend\src\main\java\com\delapena\petstore\catalog\PetService.java
- [ ] T016 [US1] Implement GET /delapena/v1/pets controller handler in backend\src\main\java\com\delapena\petstore\catalog\PetController.java
- [ ] T017 [P] [US1] Implement apiClient.getPets in frontend\src\services\apiClient.js
- [X] T018 [US1] Create ListingPage component at frontend\src\components\ListingPage\ListingPage.jsx
- [ ] T019 [US1] Create unit test PetServiceTest at backend\src\test\java\com\delapena\petstore\catalog\PetServiceTest.java
- [ ] T020 [US1] Create integration test PetControllerTest at backend\src\test\java\com\delapena\petstore\catalog\PetControllerTest.java

US2 (P2): Filter, sort, pagination

- [ ] T021 [US2] Implement filtering in PetRepository/PetService (species, price, availability) at backend\src\main\java\com\delapena\petstore\catalog\PetRepositoryCustomImpl.java (implement methods: findByFilters(species, minPrice, maxPrice, availability, cursor, limit))
- [X] T022 [P] [US2] Implement UI filter controls at frontend\src\components\ListingPage\Filters.jsx
- [ ] T023 [US2] Implement sorting and cursor-based pagination in backend\src\main\java\com\delapena\petstore\catalog\PetService.java
- [ ] T024 [P] [US2] Implement frontend sort & pagination at frontend\src\components\ListingPage\Pagination.jsx
- [ ] T025 [US2] Create contract test for GET /delapena/v1/pets at backend\src\test\java\com\delapena\petstore\contracts\GetPetsContractTest.java

US3 (P3): Preview & Add-to-Cart

- [ ] T026 [US3] Implement GET /delapena/v1/pets/{id} controller handler at backend\src\main\java\com\delapena\petstore\catalog\PetController.java
- [ ] T027 [P] [US3] Implement ListingCard and PreviewModal components at frontend\src\components\ListingPage\ListingCard.jsx and frontend\src\components\ListingPage\PreviewModal.jsx
- [ ] T028 [US3] Implement add-to-cart client stub at frontend\src\services\cartClient.js
- [ ] T029 [US3] Create E2E test for listing→preview→add-to-cart at integration-tests\e2e\listing-add-to-cart.spec.js

Final Phase: Polish & Cross-cutting

- [ ] T030 Perform accessibility and automated WCAG AA checks for ListingPage components at frontend\src\components\ListingPage\accessibility.test.jsx
- [ ] T031 Add observability (structured logs + basic metrics) at backend\src\main\java\com\delapena\petstore\observability\ObservabilityConfig.java

Additional Foundational Tasks (constitutional & quality gates)

- [ ] T032 Generate OpenAPI spec at backend\src\main\resources\openapi.yaml (document GET /delapena/v1/pets contract)
- [ ] T033 Add CI step to publish OpenAPI artifact and run contract compatibility tests (BLOCKING on failure) at .github\workflows\ci.yml
- [ ] T034 Implement deterministic-sort & stability contract tests at backend\src\test\java\com\delapena\petstore\contracts\StabilityContractTest.java
- [ ] T035 Implement frontend URL filter persistence and tests at frontend\src\services\filterState.js and frontend\src\components\ListingPage\filters-url.test.jsx
- [ ] T036 Implement availability check on add-to-cart and tests at backend\src\main\java\com\delapena\petstore\cart\AvailabilityService.java and backend\src\test\java\com\delapena\petstore\cart\AvailabilityServiceTest.java
- [ ] T037 Add alerting rule for listing API latency/error at backend\src\main\resources\alerts\petstore-listings-alerts.yaml
- [ ] T038 Create runbook stub for listing incidents at docs\runbooks\listings-alert-runbook.md

Dependencies:
- Foundational tasks (T005..T014, T032..T038) MUST complete before US1..US3 implementation tasks.
- US1 is the recommended MVP (deliver first).

Parallel opportunities:
- Backend skeleton (T001), frontend skeleton (T002), and e2e scaffold (T003) are parallelizable.
- UI component work (T017,T018,T022,T024,T027) can be done in parallel with backend service implementation after foundational tasks complete.

Total tasks: 39
Tasks per story:
- Setup: 4
- Foundational: 16
- US1: 6
- US2: 5
- US3: 4
- Final/Cross-cutting: 3

Suggested MVP scope: Complete Foundational tasks (T005..T014, T032..T038) + US1 tasks (T015..T020)

Format validation: All tasks follow checklist format with Task IDs and file paths. Ensure implementers replace placeholder directories with real filenames where needed.
