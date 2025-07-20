### Simplified Workflow Diagram

This diagram shows two parallel workflows: a manual one for local development and an automated one for CI/CD integration. Both rely on the same core logic but are triggered differently.

```mermaid
graph TD
    subgraph "Shared Resources"
        Codebase["React Project Codebase"]
        Metadata["<b>Metadata Store</b><br/>(Knowledge Base as JSON files)"]
    end

    subgraph "Workflow 1: Local / Manual"
        direction TB
        Dev["Developer"]
        
        subgraph "A) Initial Setup (One-time full scan)"
            InitialScan["<b>1. Generate Metadata</b><br/>Scans entire codebase to build the initial knowledge base."]
        end
        
        subgraph "B) Development Loop"
            WriteCode["<b>2. Write New Code</b>"]
            AnalyzeLocal["<b>3. Find Similar Code</b><br/>Compares new code against the metadata store."]
            Suggestion["<b>4. Get Suggestion</b><br/>Receives direct feedback in the terminal."]
        end

        Dev -- "Runs command" --> InitialScan
        InitialScan -- "Parses" --> Codebase
        InitialScan -- "Creates/Updates" --> Metadata

        Dev --> WriteCode
        Dev -- "Runs command for analysis" --> AnalyzeLocal
        AnalyzeLocal -- "Reads from" --> Metadata
        AnalyzeLocal -- "Analyzes developer's" --> WriteCode
        AnalyzeLocal --> Suggestion
    end

    subgraph "Workflow 2: CI / CD Integration (Automated)"
        direction TB
        PR["<b>Event:</b><br/>Pull Request Opened"]
        Merge["<b>Event:</b><br/>PR Merged to Main"]

        subgraph "A) Suggestion on PR"
            AnalyzeCI["<b>1. Find Similar Code in Diff</b><br/>Compares changed files against the metadata store."]
            Comment["<b>2. Post PR Comment</b><br/>Flags potential duplication automatically."]
        end

        subgraph "B) Metadata Refresh"
            UpdateMetadata["<b>3. Update Metadata from Diff</b><br/>Scans only the merged changes to keep the knowledge base fresh."]
        end

        PR -- "Triggers" --> AnalyzeCI
        AnalyzeCI -- "Reads from" --> Metadata
        AnalyzeCI --> Comment

        Merge -- "Triggers" --> UpdateMetadata
        UpdateMetadata -- "Parses merged code" --> Codebase
        UpdateMetadata -- "Updates" --> Metadata
    end
```

### Workflow Description

This more focused diagram clearly distinguishes between:

1.  **Local Workflow:**
    *   **Initial Scan:** A developer manually runs a command to perform a one-time, full scan of the project to create the initial `Metadata Store`.
    *   **Development Loop:** As they write code, they can manually trigger an analysis on their new file. The tool compares this new "comparable part" against the `Metadata Store` and provides immediate suggestions.

2.  **CI Workflow:**
    *   **PR Analysis:** When a pull request is created, an automated job runs. It analyzes only the changed files (`git diff`) against the existing `Metadata Store` and posts a comment if it finds high similarity.
    *   **Metadata Refresh:** When a pull request is merged, another automated job is triggered. It scans the merged changes and updates the `Metadata Store`, ensuring the knowledge base is always synchronized with the main branch without needing a full re-scan every time. 