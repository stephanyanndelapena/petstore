<!--
Sync Impact Report
Version change: unspecified → 1.0.0
Modified principles: (placeholders → concrete)
Added sections: Technology & Constraints, Development Workflow
Removed sections: none
Templates requiring updates:
  - .specify/templates/plan-template.md: ⚠ pending (verify Constitution Check gates align)
  - .specify/templates/spec-template.md: ⚠ pending (ensure tech-stack constraints are surfaced)
  - .specify/templates/tasks-template.md: ⚠ pending (task categories validated)
Follow-up TODOs:
  - TODO(RATIFICATION_DATE): confirm ratification authority if different from author
-->

# Petstore Constitution

## Core Principles

### I. Customer-first Commerce
All product and UX decisions MUST prioritize a safe, simple, and privacy-respecting shopping experience for customers. Checkout flows MUST be secure (HTTPS, CSRF protections), cart state MUST persist reliably, and accessibility standards (WCAG AA) MUST be met for all public-facing pages.

Rationale: User trust is core to e-commerce; measuring conversions and complaints will validate compliance.

### II. Test-First Quality (NON-NEGOTIABLE)
Code changes that introduce functionality MUST include automated tests before merge: unit tests for business logic, integration tests for API boundaries, and end-to-end tests for critical user journeys (signup, browse, add-to-cart, checkout). All CI pipelines MUST fail on test regressions.

Rationale: Prevent regressions and ensure safe, incremental delivery.

### III. Observability & Reliability
Services MUST emit structured logs, metrics, and traces. Error conditions MUST be captured with context sufficient to reproduce failures. Alerts MUST exist for high-severity failures (payment errors, DB connectivity loss, deployment rollbacks). Recovery runbooks MUST be documented for critical incidents.

Rationale: Fast detection and recovery reduce downtime and business impact.

### IV. API-First & Semantic Versioning
Public APIs and backend contracts MUST be designed and versioned explicitly. Backward-incompatible changes are MAJOR bumps; additive changes are MINOR; non-behavioral clarifications are PATCH. Contract changes MUST include migration plans and compatibility tests.

Rationale: Clear contracts enable safe evolution and integration with frontend and external services.

### V. Approved Tech Stack & Deployment Constraints
The canonical stack for Petstore is Java Spring Boot (backend), PostgreSQL (data), React + MUI + Tailwind (frontend). Deployments target Render. Use of alternative languages, frameworks, or hosting MUST be approved and documented.

Rationale: Consistency across projects reduces operational burden and accelerates onboarding.

## Technology & Constraints
- Database: PostgreSQL (managed). Migration tooling (e.g., Flyway or Liquibase) MUST be used for schema changes.
- Backend: Java 17+ with Spring Boot. Services MUST expose OpenAPI contracts for external integrations.
- Java package base: com.delapena.petstore (use this base package for all backend modules).
- Frontend: React (v18+) using MUI components and Tailwind for utility styles. UI components MUST be accessible and themable.
- CI/CD: Pipeline MUST run tests, linters, and build artifacts; deployments to Render MUST be gated on passing pipelines.

## Development Workflow
- Branching: Feature branches follow `[feature/<short-desc>]` naming. Pull requests MUST include a link to a spec or plan and reference relevant tasks.
- Reviews: At least one approving review is REQUIRED for non-trivial changes; critical changes (security, payments, DB migrations) require two reviewers.
- Infrastructure changes: DB migrations and infra modifications MUST be reviewed and accompanied by rollback instructions.
- Release process: Releases follow semantic versioning; a changelog entry is REQUIRED for MINOR and MAJOR releases.

## Governance
- Amendments: Amendments to this constitution require a documented proposal, review by at least two maintainers, and a majority approval. Major governance changes (removing or redefining principles) are MAJOR version bumps.
- Compliance: Every PR MUST include a short compliance checklist referencing affected principles. Build pipelines or reviewers MUST verify constitution gates where applicable.
- Versioning Policy: MAJOR for incompatible governance/principle removals or redefinitions; MINOR for added principles or material expansions; PATCH for clarifications, typos, or non-semantic refinements.

**Version**: 1.0.0 | **Ratified**: 2026-04-30 | **Last Amended**: 2026-04-30
