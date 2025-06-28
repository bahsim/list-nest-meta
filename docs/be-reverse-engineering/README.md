# Reverse Engineering for Backend Generation Viability

This folder documents the process of reverse-engineering an existing NestJS backend to extract mid-level instructions, atomic intents, or high-level intents. The goal is to validate the viability of backend generation using these instruction formats.

## Purpose
To validate backend generation viability by extracting mid-level instructions (or atomic/high-level intents as fallback) from a real-world NestJS backend.

## Success Criteria
- The process is successful if the backend can be regenerated from the extracted instructions (mid-level, atomic, or high-level) and the resulting codebase is consistent with the original implementation.
- The majority of backend features should be expressible as mid-level instructions; atomic or high-level intents are used only when necessary.
- Consistency is measured by comparing the regenerated backend with the original codebase for feature completeness, structure, and behavior.

## Approach
1. Analyze the codebase structure (controllers, services, entities, etc.) to identify features and backend logic.
2. For each feature/module:
   - Attempt to express it as a mid-level instruction using the pattern library.
   - If not possible, break it down into atomic intents.
   - If even that is not feasible, summarize as a high-level intent.
3. Document the mapping for a representative sample (or all, if feasible) to show coverage and any gaps.

## What Will NOT Be Done
- No unnecessary questions if information can be inferred from the codebase.
- No fallback to atomic or high-level unless mid-level is clearly not possible for a feature.
- No extra commentary—only actionable, structured results.

## Next Steps
- Begin with the most representative or core module in the backend unless a specific module or feature is specified. 