# Code Reuse Suggestion Tool – Intent (WHAT, not HOW)

1. Establish and continuously maintain a single, authoritative metadata store that indexes every reusable code artifact (React components, hooks, utilities, helpers, and TypeScript types/interfaces) that exists across all designated repositories.

2. Capture and store, for each artifact, the essential descriptive information needed to recognize it and compare it with other code, including but not limited to:
   • Its name and kind (component, hook, function, type, etc.).  
   • A representation of its public interface or signature.  
   • A concise snapshot of its code or JSX.  
   • Its file location and identifying revision data.  
   • Any available documentation text.

3. Detect—whenever new or modified code is authored or committed—whether that code is a potential duplicate or close functional match of an artifact already present in the metadata store.

4. When such a match is found, generate a clear, actionable suggestion that:
   • Identifies the existing artifact.  
   • Summarizes the relevant parts of its public interface.  
   • Indicates where it lives in the codebase.  
   • Highlights the overlap with the newly-written code.

5. Deliver these suggestions to developers through three complementary channels:
   • A command-line interface for local, ad-hoc, or pre-commit checks.  
   • An automated check within pull-request workflows that comments on code reviews.  
   • An integration with the developer’s IDE that provides real-time feedback while coding.

6. Keep the metadata store accurate and fresh at all times by automatically inserting, updating, or deprecating records whenever code is merged or deleted in any monitored repository.

7. Record developer feedback on suggestions (accepted or rejected) so the system can learn over time and reduce false positives.

8. Provide configuration options that allow teams to:
   • Set the similarity threshold that triggers a suggestion.  
   • Control how many suggestions are shown.  
   • Exclude specific paths or files from analysis.  
   • Enable or disable each delivery channel independently.  
   • Opt in or out of any processing that would leave local or trusted infrastructure.

9. Adhere to strict security and privacy requirements, ensuring no source code or proprietary information leaves approved environments unless explicitly authorized.

10. Meet performance expectations that keep the tool unobtrusive:
    • Real-time IDE suggestions must appear fast enough not to interrupt coding flow.  
    • Pull-request analysis must complete quickly enough to fit typical CI budgets.  
    • Repository-wide metadata refreshes must finish within an acceptable, bounded time even on large codebases.

11. Track and report objective metrics—such as suggestion accuracy, latency, and update durations—to gauge the tool’s effectiveness and guide continuous improvement.