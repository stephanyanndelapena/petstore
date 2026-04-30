# Runbook: Listing API Incident (petstore)

## Purpose
Short runbook for on-call responders to troubleshoot listing API latency/errors.

## Contacts
- On-call: @team-backend
- Pager: PagerDuty service (to be configured)

## Signals
- High p95 latency alert: PetstoreListingAPILatencyHigh
- 5xx error alert: PetstoreListingAPIErrors

## Immediate steps
1. Check service health endpoints and recent deployments.
2. Inspect logs (structured logs) for errors and stack traces.
3. Check DB connectivity and slow queries; run EXPLAIN on suspect queries.
4. Validate CDN/edge responses for image hosts.

## Mitigation
- If DB slow: scale read-replicas or rollback recent schema changes.
- If deploy caused regression: rollback to previous stable release.

## Postmortem
- Record incident timeline, root cause, and remediation in incident tracker.
- Update runbook with any new steps discovered.
