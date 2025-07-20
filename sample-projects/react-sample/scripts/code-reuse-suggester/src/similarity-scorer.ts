import { CodePattern, SimilarityResult } from './types';
import * as stringSimilarity from 'string-similarity';

export class SimilarityScorer {
  private structuralWeight: number = 0.6;
  private semanticWeight: number = 0.4;
  private threshold: number = 0.7;

  constructor(threshold?: number) {
    if (threshold !== undefined) {
      this.threshold = threshold;
    }
  }

  public findSimilarPatterns(
    newPattern: CodePattern,
    existingPatterns: CodePattern[]
  ): SimilarityResult[] {
    const results: SimilarityResult[] = [];

    for (const existingPattern of existingPatterns) {
      if (newPattern.type !== existingPattern.type) continue;

      const structuralScore = this.calculateStructuralSimilarity(newPattern, existingPattern);
      const semanticScore = this.calculateSemanticSimilarity(newPattern, existingPattern);
      const combinedScore = this.combineScores(structuralScore, semanticScore);

      if (combinedScore >= this.threshold) {
        results.push({
          pattern: existingPattern,
          structuralScore,
          semanticScore,
          combinedScore,
          reason: this.generateReason(newPattern, existingPattern, structuralScore, semanticScore)
        });
      }
    }

    // Sort by combined score (highest first)
    return results.sort((a, b) => b.combinedScore - a.combinedScore);
  }

  private calculateStructuralSimilarity(pattern1: CodePattern, pattern2: CodePattern): number {
    let score = 0;
    let totalChecks = 0;

    // Compare names (with some tolerance for naming variations)
    const nameSimilarity = stringSimilarity.compareTwoStrings(
      pattern1.name.toLowerCase(),
      pattern2.name.toLowerCase()
    );
    score += nameSimilarity;
    totalChecks++;

    // Compare props for components
    if (pattern1.type === 'component' && pattern2.type === 'component') {
      const propsScore = this.compareProps(pattern1.props || [], pattern2.props || []);
      score += propsScore;
      totalChecks++;
    }

    // Compare parameters for hooks and utilities
    if (pattern1.type !== 'component' && pattern2.type !== 'component') {
      const paramsScore = this.compareParameters(
        pattern1.parameters || [],
        pattern2.parameters || []
      );
      score += paramsScore;
      totalChecks++;
    }

    // Compare return types for hooks and utilities
    if (pattern1.returnType && pattern2.returnType) {
      const returnTypeSimilarity = stringSimilarity.compareTwoStrings(
        pattern1.returnType.toLowerCase(),
        pattern2.returnType.toLowerCase()
      );
      score += returnTypeSimilarity;
      totalChecks++;
    }

    return totalChecks > 0 ? score / totalChecks : 0;
  }

  private calculateSemanticSimilarity(pattern1: CodePattern, pattern2: CodePattern): number {
    if (!pattern1.description || !pattern2.description) {
      return 0;
    }

    return stringSimilarity.compareTwoStrings(
      pattern1.description.toLowerCase(),
      pattern2.description.toLowerCase()
    );
  }

  private compareProps(props1: any[], props2: any[]): number {
    if (props1.length === 0 && props2.length === 0) return 1;
    if (props1.length === 0 || props2.length === 0) return 0;

    const propNames1 = props1.map(p => p.name.toLowerCase());
    const propNames2 = props2.map(p => p.name.toLowerCase());

    const commonProps = propNames1.filter(name => propNames2.includes(name));
    const totalProps = new Set([...propNames1, ...propNames2]).size;

    return commonProps.length / totalProps;
  }

  private compareParameters(params1: any[], params2: any[]): number {
    if (params1.length === 0 && params2.length === 0) return 1;
    if (params1.length === 0 || params2.length === 0) return 0;

    const paramNames1 = params1.map(p => p.name.toLowerCase());
    const paramNames2 = params2.map(p => p.name.toLowerCase());

    const commonParams = paramNames1.filter(name => paramNames2.includes(name));
    const totalParams = new Set([...paramNames1, ...paramNames2]).size;

    return commonParams.length / totalParams;
  }

  private combineScores(structuralScore: number, semanticScore: number): number {
    return (structuralScore * this.structuralWeight) + (semanticScore * this.semanticWeight);
  }

  private generateReason(
    newPattern: CodePattern,
    existingPattern: CodePattern,
    structuralScore: number,
    semanticScore: number
  ): string {
    const reasons: string[] = [];

    if (structuralScore > 0.8) {
      reasons.push('high structural similarity');
    } else if (structuralScore > 0.6) {
      reasons.push('moderate structural similarity');
    }

    if (semanticScore > 0.8) {
      reasons.push('high semantic similarity');
    } else if (semanticScore > 0.6) {
      reasons.push('moderate semantic similarity');
    }

    if (reasons.length === 0) {
      reasons.push('similar naming and structure');
    }

    return reasons.join(', ');
  }

  public setThreshold(threshold: number): void {
    this.threshold = Math.max(0, Math.min(1, threshold));
  }

  public setWeights(structuralWeight: number, semanticWeight: number): void {
    this.structuralWeight = structuralWeight;
    this.semanticWeight = semanticWeight;
  }
} 