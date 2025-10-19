# Delivery notes for Práctica 4 - Routing Avanzado

Use this file to prepare the PR and attach it to your submission.

## What to include in the PR

- Branch: `feature/practice-4-complete` (or `sync/upstream-main` if you merged upstream)
- Files changed: `server.js`, `src/controllers/*`, `src/routes/*`, `src/data/flowersData.js`, `_docs/api/openapi.yml`, `tests/*`, `.github/workflows/ci.yml`
- README updated with run/test instructions

## Checklist (tick before submit)

- [ ] All 15 endpoints implemented and tested locally
- [ ] Validations (400) and 404 handling in place
- [ ] `pnpm test` passes locally
- [ ] `/api-docs` contains OpenAPI spec
- [ ] README explains how to run and test
- [ ] CI configured (GitHub Actions) to run tests

## Suggested PR description (copy into GitHub PR body)

Title: Complete Práctica 4 — Routing Avanzado (Flowers, Bouquets, Orders)

Description:

This PR completes the Bootcamp Practice 4: Routing Avanzado.

Changes included:

- Implemented 15 CRUD endpoints (5 per entity): Flowers, Bouquets, Orders.
- Added input validation for POST/PUT that returns 400 on missing fields.
- Added in-memory seed data with multiple Colombian-named records.
- Modular routing (`src/routes/*`) and controllers (`src/controllers/*`).
- Exported `app` from `server.js` to support tests.
- Added OpenAPI specification at `_docs/api/openapi.yml` and mounted at `/api-docs`.
- Wrote Jest + Supertest tests covering GET/POST/PUT/DELETE and basic validation (located in `tests/`).
- Added GitHub Actions workflow (`.github/workflows/ci.yml`) to run tests on push/PR.

How to run locally:

1. pnpm install
2. pnpm start
3. Open http://localhost:3000/api-docs
4. pnpm test

Notes:

- This project uses pnpm; please run tests with `pnpm test`.
- If you want me to push this branch and open the PR, provide remote access or run the git push commands below locally.

---

## Local commands to create branch and push (run locally)

```powershell
git checkout -b feature/practice-4-complete
git add .
git commit -m "Complete Práctica 4 — routing, controllers, tests, docs, CI"
git push origin feature/practice-4-complete
```
