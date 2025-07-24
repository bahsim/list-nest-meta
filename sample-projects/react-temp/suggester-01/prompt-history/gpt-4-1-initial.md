# Prompt 

We have many github interconnected repos, including microfrontends and related submodules.
The codebase huge and fragmented from both human and AI-agent perspective
Build a tool that proactively suggests reusing existing code (components, hooks, utilities, etc.) instead of introducing duplicates in a React codebase, leveraging pre-generated metadata of code patterns. across given projects

# Result

This is an excellent initiative. Building a tool to foster code reuse in a large, distributed codebase can significantly improve maintainability and development velocity. As a senior software engineer, I recognize the challenges and potential of such a system.

To ensure I design and build a tool that meets your needs, I'm entering **Planner Mode**. I'll start by asking some clarifying questions to understand the full scope of the project.

Here are a few questions to get us started:

1.  **Metadata Generation:** How do you envision the "pre-generated metadata" being created? Should this tool be responsible for scanning the repositories and generating it (e.g., by parsing the code and creating Abstract Syntax Trees), or is there an existing process that creates this metadata?
2.  **Repository Access:** How will the tool access the various interconnected repositories? Are they available on the local filesystem in a monorepo or multi-repo setup, or would the tool need to clone them from a source like GitHub?
3.  **Suggestion Workflow:** How and when should the tool present its suggestions to a developer? For example, should it be a VS Code extension that provides real-time feedback, a command-line tool to be run manually, or perhaps a CI/CD pipeline step or a pre-commit hook that checks for potential code duplication?
4.  **Similarity-Detection:** What's our starting point for defining "reusable" or "duplicate" code? Should we begin with simple checks like matching component/hook names and export signatures, or are you thinking of a more advanced semantic analysis to find structurally similar code even if names differ?
5.  **Technology Stack:** What's your preferred technology stack for building this tool itself? A Node.js-based solution is common for JavaScript ecosystem tooling, but I'm open to your preferences.
6.  **Developer Interaction:** When the tool identifies an opportunity for code reuse, what should the ideal interaction look like? Should it simply log a message pointing to the existing code, or should it offer more advanced actions like auto-generating import statements or even refactoring the code?

Your answers will help me draft a comprehensive plan to build this proactive code suggestion tool. I look forward to your thoughts.