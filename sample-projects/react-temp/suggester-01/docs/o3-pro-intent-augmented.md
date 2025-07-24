# Code Reuse Suggestion Tool – Augmented Intent (Approved Draft)

## 1. Purpose & Vision
Build an intelligent assistant that **actively eliminates code duplication** across our React ecosystem (micro-frontends, shared libraries, git submodules) by detecting potential reuse opportunities and delivering actionable suggestions to developers through CLI, IDE, and CI pipelines.

## 2. Success Metrics (Quantitative)
| Category | Metric | Target (MVP) | Target (GA) |
|----------|--------|--------------|-------------|
| Accuracy | False-positive suggestion rate | ≤ 5 % | ≤ 3 % |
| Accuracy | False-negative (missed duplicate) rate | ≤ 10 % | ≤ 5 % |
| Performance | IDE suggestion latency | ≤ 150 ms | ≤ 100 ms |
| Performance | PR analysis completion time (≤ 2 k LOC change set) | ≤ 60 s | ≤ 30 s |
| Performance | Full repo metadata refresh (≤ 5 k files) | ≤ 2 min | ≤ 1 min |
| Adoption | Suggestion acceptance rate (monitored teams) | ≥ 50 % | ≥ 70 % |
| Reliability | Crash-free CLI runs | ≥ 99 % | ≥ 99.5 % |

## 3. Scope
*In scope*
- Artifact types: React components, hooks, utilities/helpers, TS types/interfaces.
- Operating modes: CLI, IDE (VS Code ≥ 1.85), CI (GitHub Action).
- Local analysis by default with optional cloud workers if `allowRemote=true`.
- Continuous metadata sync on merges to `main` branches.

*Out of scope (v1)*
- Automatic refactoring of code to use shared artifacts.
- Support for non-TypeScript projects.
- Suggestion ranking based on ML feedback loops (will arrive post-GA).

## 4. Constraints & Boundaries
| Area | Constraint |
|------|------------|
| Target repositories | All repos listed in `repos.config.json` (initial list: `app-shell`, `ui-kit`, `marketing-site`). |
| Runtime | Node ≥ 20, npm ≥ 9. |
| Hardware | Must run within 4 vCPU / 8 GB RAM on developer laptops. |
| Compatibility | VS Code extension must support Windows 10+, macOS 11+, Ubuntu 20.04+. |
| Privacy | No source code leaves local/trusted infra unless `allowRemote` flag set. |
| Licenses | Tool and its dependencies must be MIT-compatible. |

## 5. Stakeholders & Roles
| Role | Name / Slack | Responsibilities | Approval Needed |
|------|--------------|------------------|----------------|
| Strategic Lead | *@product-lead* | Business value & scope | ✅ |
| Dev Lead | *@dev-lead* | Architecture & delivery | ✅ |
| AI Co-pilot (this repo) | *o3-pro* | Generation & advisory | — |
| QA Owner | *@qa-owner* | Quality gates & metrics | ✅ |
| Security | *@sec-lead* | Privacy & license compliance | ✅ |

## 6. Key Risks & Mitigations
| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| High suggestion noise annoys devs | Medium | High | Configurable threshold, gradual rollout, feedback collection. |
| AST parser fails on edge TS syntax | Medium | Medium | Use `ts-morph`; add fallback text diff; automated regression corpus. |
| Similarity search scalability | Low | High | Prototype with in-memory cosine sim, plan pgvector migration. |
| IDE extension perf regressions | Medium | Medium | Benchmark suite + VS Code profiling; lazy-load heavy modules. |

## 7. Acceptance Criteria / Definition of Done (MVP)
1. CLI: `reuse-suggest scan <paths>` returns suggestions with above accuracy metrics.
2. GitHub Action posts review comments on PR, with analysis time ≤ 60 s.
3. VS Code extension surfaces inline suggestions ≤ 150 ms (cold start excluded).
4. Metadata store persists artifact records (SQLite) and updates on `main` merges.
5. Configuration file `reuse-suggest.config.{json,ts}` supports threshold & path ignore.
6. All critical risks have implemented mitigations.
7. All success metrics tracked via telemetry dashboard.
8. Stakeholder sign-off obtained (table in §5).

## 8. High-Level Dependencies & Technology Choices
- **Parsing:** `ts-morph` for TypeScript AST extraction.
- **Similarity:** Initial Jaccard & Levenshtein, upgrade path to embedding + pgvector.
- **Storage:** SQLite (file-based) for MVP, migratable to Postgres.
- **CI:** GitHub Actions composite action.
- **IDE:** VS Code extension using `vscode-languageclient`.

## 9. Glossary
*Artifact* – any reusable code unit (component, hook, util, type).  
*Suggestion* – a recommendation pointing devs to an existing artifact.  
*Similarity threshold* – numeric value controlling when a suggestion is emitted.

---
**Revision history**
| Version | Date | Author | Notes |
|---------|------|--------|-------|
| v0.1 | 2025-07-23 | o3-pro | Initial augmented draft for stakeholder review | 