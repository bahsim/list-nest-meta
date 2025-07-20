export interface CodePattern {
  id: string;
  filePath: string;
  name: string;
  type: 'component' | 'hook' | 'utility';
  description: string;
  hash: string;
  props?: PropInfo[];
  signature?: string;
  parameters?: ParameterInfo[];
  returnType?: string;
}

export interface PropInfo {
  name: string;
  type: string;
  required: boolean;
}

export interface ParameterInfo {
  name: string;
  type: string;
  required: boolean;
}

export interface SimilarityResult {
  pattern: CodePattern;
  structuralScore: number;
  semanticScore: number;
  combinedScore: number;
  reason: string;
}

export interface AnalysisResult {
  filePath: string;
  patterns: CodePattern[];
  suggestions: SimilarityResult[];
}

export interface MetadataStore {
  components: CodePattern[];
  hooks: CodePattern[];
  utilities: CodePattern[];
} 