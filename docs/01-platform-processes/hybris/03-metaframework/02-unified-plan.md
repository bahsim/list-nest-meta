# Unified Plan: Meta-Framework for Legacy Platform Management

> **Type:** Implementation Plan  
> **Category:** Meta-Framework / Legacy Modernization  
> **Status:** Draft (Actionable Roadmap)  
> **Purpose:** Provide a concrete, feasible plan for building a meta-framework to manage, refactor, and migrate complex legacy platforms

---

## 1. Technical Design Overview

- **Goal:** Build a meta-framework that inventories, maps, and visualizes all subsystems, modules, files, and inner units (methods, beans, etc.) in a legacy platform, along with their dependencies and metadata.
- **Core Components:**
  - **Inventory Engine:** Automated scripts to crawl codebase and configs, extracting structure and metadata.
  - **Dependency Mapper:** Tools to parse and map relationships (imports, injections, config links).
  - **Metadata Extractor:** Gathers ownership, change history, documentation, and annotations.
  - **System Graph Model:** Unified graph representation of all nodes and edges, with attached metadata.
  - **Query & Visualization Layer:** CLI and/or UI for exploring, querying, and visualizing the system graph.

---

## 2. Phased Roadmap

### **Phase 1: Foundation & Inventory**
- Define data model and graph schema
- Build initial inventory scripts (modules, files, inner units)
- Store results in a simple database or graph format (e.g., Neo4j, SQLite, JSON)

### **Phase 2: Dependency & Metadata Extraction**
- Extend scripts to parse dependencies (imports, Spring configs, extensioninfo.xml)
- Extract and attach metadata (ownership, VCS history, docs)
- Validate and refine the graph model

### **Phase 3: Query & Visualization**
- Develop CLI tools for querying the graph (e.g., "What depends on X?", "Show all beans in module Y")
- Build a basic web UI or integrate with existing visualization tools (e.g., Graphviz, Neo4j Browser)

### **Phase 4: Orchestration & Refactoring Support**
- Add features for impact analysis, refactoring planning, and migration tracking
- Integrate with CI/CD or code review workflows as needed

---

## 3. Inventory & Dependency Extraction Script Plan

- **Language:** Prefer Python (rich ecosystem for parsing, graph, and data processing)
- **Inventory Scripts:**
  - Recursively scan directories for modules, files, and recognized config types
  - For each file, extract:
    - File type (Java, XML, Impex, etc.)
    - Inner units (classes, methods, beans, etc.)
    - Annotations and doc comments
- **Dependency Extraction:**
  - Parse Java imports, Spring bean references, extensioninfo.xml dependencies
  - Map interface-to-implementation bindings, event listeners, and config links
- **Metadata Extraction:**
  - Use VCS (e.g., git) to extract change frequency, authorship
  - Parse ownership tags, TODOs, and documentation links
- **Output:**
  - Store as JSON, CSV, or directly into a graph database (e.g., Neo4j)

---

## 4. Proposed Data Model for the System Graph

- **Node Types:**
  - Subsystem
  - Module
  - File
  - Inner Unit (class, method, bean, etc.)
- **Edge Types:**
  - Dependency (module-to-module, file-to-file, unit-to-unit)
  - Contains (hierarchical: module → file → unit)
  - Config Reference (e.g., bean injection, config link)
- **Node Metadata:**
  - Name, type, path
  - Ownership, business domain
  - Change frequency, last modified
  - Documentation links, known issues
- **Edge Metadata:**
  - Dependency type (import, injection, config)
  - Directionality, strength (optional)

---

## 5. Immediate Next Actions

1. **Finalize Data Model:** Draft and review the node/edge schema and metadata fields
2. **Prototype Inventory Script:** Build a Python script to scan modules/files and output initial JSON
3. **Dependency Parser:** Extend script to extract Java imports and config-based dependencies
4. **Graph Loader:** Load inventory and dependencies into a graph database or in-memory model
5. **Basic Query CLI:** Implement simple queries (e.g., list all modules, show dependencies for a file)
6. **Review & Iterate:** Validate results, refine scripts, and plan for visualization

---

This unified plan provides a concrete, actionable roadmap for the meta-framework initiative. Future documents will detail technical implementation, script examples, and integration patterns. 