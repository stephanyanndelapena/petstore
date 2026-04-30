# Quickstart: Listing Page (Developer)

## Backend (Java Spring Boot)
1. Install JDK 17+ and PostgreSQL.
2. Set env vars:
   - DATABASE_URL=jdbc:postgresql://localhost:5432/petstore
   - SPRING_PROFILES_ACTIVE=local
3. From repo root:
   - cd backend
   - ./mvnw clean package
   - java -jar target/backend.jar
4. Run DB migrations (Flyway): configured to run at app startup; or run manually using flyway-cli against resources/db/migration.

## Frontend (React)
1. cd frontend
2. npm install
3. npm run dev
4. Frontend expects API at http://localhost:8080/delapena/v1

## Running Tests
- Backend: mvnw test
- Frontend: npm test
- E2E: run integration-tests/e2e after backend+frontend are running.

## Notes
- Use com.delapena.petstore as Java base package.
- Migrations live: backend/src/main/resources/db/migration
- ENV variables for Render: set DATABASE_URL and RENDER_SERVICE_URL as needed.