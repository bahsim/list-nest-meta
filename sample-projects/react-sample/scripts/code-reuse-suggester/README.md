# Code Reuse Suggester

A proactive tool that suggests code reuse opportunities in React projects by analyzing TypeScript/TSX files and identifying similar patterns.

## Features

- **AST-based Analysis**: Uses TypeScript's Abstract Syntax Tree to extract structural information about components, hooks, and utilities
- **Hybrid Similarity Scoring**: Combines structural and semantic analysis to find similar code patterns
- **CLI Interface**: Easy-to-use command-line interface for local development
- **Metadata Storage**: Maintains a knowledge base of existing code patterns in JSON format
- **Configurable Thresholds**: Adjustable similarity thresholds for different use cases

## Installation

```bash
# Install dependencies
npm install

# Build the project
npm run build
```

## Usage

### 1. Generate Metadata

First, scan your React project to build the metadata store:

```bash
npm run build
node dist/index.js generate-metadata <path-to-react-project>
```

Example:
```bash
node dist/index.js generate-metadata ../../src
```

This will:
- Scan all `.ts` and `.tsx` files in the project
- Extract components, hooks, and utilities
- Save metadata to `metadata/` directory

### 2. Analyze Files

Analyze a specific file for code reuse opportunities:

```bash
node dist/index.js analyze <path-to-file> --project <project-path> --threshold <0-1>
```

Example:
```bash
node dist/index.js analyze src/components/NewComponent.tsx --project . --threshold 0.7
```

Options:
- `--project`: Path to the React project (default: current directory)
- `--threshold`: Similarity threshold from 0 to 1 (default: 0.7)

### 3. Example Output

```
🔍 Analyzing file: src/components/NewComponent.tsx

📋 Found 1 patterns in NewComponent.tsx:

🔍 Analyzing component: NewComponent

💡 Found 1 similar patterns:

   📌 UserProfileCard (85% similarity)
      File: src/components/UserProfileCard.tsx
      Description: Displays user profile information
      Reason: high structural similarity, moderate semantic similarity
      Structural: 90%
      Semantic: 75%

🎯 Total suggestions: 1
💡 Consider reusing existing code to maintain consistency and reduce duplication.
```

## How It Works

### 1. Pattern Extraction
The tool uses `ts-morph` to parse TypeScript/TSX files and extract:
- **React Components**: Function components with PascalCase names
- **Custom Hooks**: Functions starting with "use"
- **Utility Functions**: Other functions

### 2. Similarity Analysis
For each pattern, the tool calculates:
- **Structural Similarity**: Compares prop names, parameter types, return types
- **Semantic Similarity**: Compares JSDoc descriptions using string similarity
- **Combined Score**: Weighted combination of structural and semantic scores

### 3. Metadata Storage
Patterns are stored in separate JSON files:
- `metadata/components.json`
- `metadata/hooks.json`
- `metadata/utilities.json`

## Configuration

### Similarity Thresholds
- **Conservative (0.8+)**: Only suggests very similar patterns
- **Moderate (0.6-0.8)**: Suggests patterns with good similarity
- **Aggressive (0.4-0.6)**: Suggests patterns with some similarity

### Scoring Weights
The tool uses these default weights:
- Structural similarity: 60%
- Semantic similarity: 40%

## Development

```bash
# Run in development mode
npm run dev generate-metadata <project-path>

# Build and run
npm run build && npm start analyze <file-path>
```

## Architecture

The tool consists of several core components:

1. **AST Parser**: Extracts structural information from TypeScript files
2. **Similarity Scorer**: Compares patterns using hybrid scoring
3. **Metadata Store**: Manages JSON-based pattern storage
4. **CLI Interface**: Provides user-friendly commands

## Future Enhancements

- IDE plugin integration
- CI/CD bot for automated PR comments
- LLM-based semantic analysis
- Support for more code patterns
- Integration with popular React frameworks

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

ISC 