Intent: What the “Code Reuse Suggestion Tool” must accomplish

1. Continuously maintain an up-to-date, centralized metadata store that indexes every reusable artifact (components, hooks, utilities, types, etc.) across all React repositories in the ecosystem.  
2. Detect when new or modified code is functionally similar to existing artifacts by comparing the candidate code against the metadata store.  
3. Present reuse suggestions to developers whenever similarity exceeds a configurable threshold, including links or references to the existing abstractions.  
4. Operate in three user-facing modes—CLI, IDE assistant, and CI/CD bot—delivering suggestions in the context most useful to each workflow.  
5. Keep the metadata store synchronized with repository changes by updating it on every merge (adding new artifacts, deprecating removed ones).  
6. Track developer feedback on suggestions (accepted, rejected) to refine future recommendations and improve accuracy over time.  
7. Provide configurable thresholds, ignore paths, and privacy controls so teams can tailor detection sensitivity and data-handling policies.  
8. Ensure all code analysis remains within approved infrastructure, protecting sensitive source code and complying with organizational security standards.  
9. Supply comprehensive documentation—including setup instructions, usage examples, and architecture diagrams—for developers and maintainers.