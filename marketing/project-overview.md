# IDGL - Intent-Driven Generative Lifecycle

A systematic approach to AI-assisted software development through platform-specific processes.

## What is IDGL?

IDGL is a software development framework that organizes work around outcome-focused intentions rather than task lists. It uses AI-assisted generation with human strategic guidance through systematic processes.

The core insight: instead of breaking work into hundreds of micro-tasks (which leads to analysis paralysis), define systematic processes for each technology platform that generate complete, working software systems.

## The problem it solves

Traditional AI-assisted development often results in:
- Dozens of disconnected code snippets that don't work together
- Hours spent on boilerplate setup and configuration  
- Context switching between micro-tasks instead of building features
- Analysis paralysis from over-planning and under-implementing

Evidence: The ListNest project had 186 atomic instruction files but produced no working code.

## The IDGL approach

Instead of 186 fragmented files, define one comprehensive process per platform:

```typescript
// Single configuration replaces hundreds of micro-tasks
const backendConfig = {
  project: { name: "my-api", description: "REST API" },
  entities: [
    { name: "User", fields: [
      { name: "email", type: "string", validation: { email: true, unique: true } },
      { name: "password", type: "string", validation: { min: 8 } }
    ]}
  ],
  authentication: { enabled: true, strategy: "jwt" }
};

// Result: Complete working backend with authentication, validation, tests
```

Time to working software: hours instead of weeks.

## Core principles

1. Platform-specific processes - Systematic approaches tailored to each technology stack
2. Complete generation - Working software systems, not code fragments  
3. Human-AI partnership - Strategic humans, tactical AI
4. Intent over instructions - Focus on outcomes, not step-by-step tasks
5. Evidence-based - Every principle backed by real case studies

## Current status

Production ready:
- NestJS backend process - Complete TypeScript backend generation
- Core documentation - Philosophy, methodology, and implementation guides
- Evidence base - Case studies proving effectiveness

In development:
- React frontend process - Component-based UI generation
- Additional platform processes - Python FastAPI, Vue.js, Flutter
- Tool integration - CLI tools and IDE extensions

## How to contribute

Why contribute:
- Learn effective AI collaboration patterns for real development
- Build reusable processes for your technology platforms
- Join a community focused on working software over process overhead
- Share proven approaches that help other developers

Contribution areas:
- Platform processes - Create systematic generation approaches for new technologies
- Documentation - Case studies, tutorials, and implementation guides
- Tools - CLI tools, IDE extensions, and automation scripts
- Research - Effectiveness studies and pattern analysis

## Getting started

1. Read the documentation at `../docs/README.md`
2. Study the NestJS process to see a complete example
3. Try creating a process for your preferred technology platform
4. Share your experience and document what works

## Community standards

- Evidence-based contributions - Back claims with working examples
- Complete implementations - No partial or theoretical processes
- Practical focus - Working software over process documentation
- Honest assessment - Include limitations and challenges alongside successes

IDGL is a practical framework proven through real use. It helps developers generate working software systems instead of managing task lists. 