#!/usr/bin/env node

import { Command } from 'commander';
import * as path from 'path';
import * as fs from 'fs';
import { ExpertASTParser } from './expert-ast-parser';
import { SimilarityScorer } from './similarity-scorer';
import { MetadataStoreManager } from './metadata-store';
import { CodePattern, AnalysisResult } from './types';

const program = new Command();

program
  .name('code-reuse-suggester')
  .description('A tool to suggest code reuse opportunities in React projects')
  .version('1.0.0');

program
  .command('generate-metadata')
  .description('Generate metadata from a React project')
  .argument('<project-path>', 'Path to the React project')
  .option('-o, --output <dir>', 'Output directory for metadata', 'metadata')
  .action(async (projectPath: string, options: { output: string }) => {
    try {
      console.log(`🔍 Scanning project: ${projectPath}`);
      
      const metadataManager = new MetadataStoreManager(projectPath);
      const parser = new ExpertASTParser();
      
      // Find all TypeScript/TSX files
      const sourceFiles = findSourceFiles(projectPath);
      const allPatterns: CodePattern[] = [];
      
      for (const file of sourceFiles) {
        try {
          const patterns = parser.parseFile(file);
          allPatterns.push(...patterns);
          console.log(`✅ Parsed ${patterns.length} patterns from ${path.relative(projectPath, file)}`);
        } catch (error) {
          console.warn(`⚠️  Error parsing ${file}:`, error);
        }
      }
      
      // Save metadata
      metadataManager.saveMetadata(allPatterns);
      
      console.log(`\n📊 Generated metadata for ${allPatterns.length} patterns:`);
      console.log(`   Components: ${allPatterns.filter(p => p.type === 'component').length}`);
      console.log(`   Hooks: ${allPatterns.filter(p => p.type === 'hook').length}`);
      console.log(`   Utilities: ${allPatterns.filter(p => p.type === 'utility').length}`);
      console.log(`\n💾 Metadata saved to: ${metadataManager.getMetadataDir()}`);
      
    } catch (error) {
      console.error('❌ Error generating metadata:', error);
      process.exit(1);
    }
  });

program
  .command('analyze')
  .description('Analyze a file for code reuse opportunities')
  .argument('<file-path>', 'Path to the file to analyze')
  .option('-p, --project <path>', 'Path to the React project (for metadata)', '.')
  .option('-t, --threshold <number>', 'Similarity threshold (0-1)', '0.7')
  .action(async (filePath: string, options: { project: string; threshold: string }) => {
    try {
      console.log(`🔍 Analyzing file: ${filePath}`);
      
      const threshold = parseFloat(options.threshold);
      const metadataManager = new MetadataStoreManager(options.project);
      const parser = new ExpertASTParser();
      const scorer = new SimilarityScorer(threshold);
      
      // Load existing metadata
      metadataManager.loadMetadata();
      const existingPatterns = metadataManager.getAllPatterns();
      
      if (existingPatterns.length === 0) {
        console.log('⚠️  No metadata found. Run "generate-metadata" first.');
        return;
      }
      
      // Parse the target file
      const newPatterns = parser.parseFile(filePath);
      
      if (newPatterns.length === 0) {
        console.log('ℹ️  No patterns found in the target file.');
        return;
      }
      
      console.log(`\n📋 Found ${newPatterns.length} patterns in ${path.basename(filePath)}:`);
      
      let totalSuggestions = 0;
      
      for (const pattern of newPatterns) {
        console.log(`\n🔍 Analyzing ${pattern.type}: ${pattern.name}`);
        
        const suggestions = scorer.findSimilarPatterns(pattern, existingPatterns);
        
        if (suggestions.length > 0) {
          console.log(`\n💡 Found ${suggestions.length} similar patterns:`);
          
          for (const suggestion of suggestions) {
            const score = Math.round(suggestion.combinedScore * 100);
            console.log(`\n   📌 ${suggestion.pattern.name} (${score}% similarity)`);
            console.log(`      File: ${suggestion.pattern.filePath}`);
            console.log(`      Description: ${suggestion.pattern.description}`);
            console.log(`      Reason: ${suggestion.reason}`);
            console.log(`      Structural: ${Math.round(suggestion.structuralScore * 100)}%`);
            console.log(`      Semantic: ${Math.round(suggestion.semanticScore * 100)}%`);
          }
          
          totalSuggestions += suggestions.length;
        } else {
          console.log(`   ✅ No similar patterns found for ${pattern.name}`);
        }
      }
      
      if (totalSuggestions > 0) {
        console.log(`\n🎯 Total suggestions: ${totalSuggestions}`);
        console.log(`💡 Consider reusing existing code to maintain consistency and reduce duplication.`);
      } else {
        console.log(`\n✅ No code reuse opportunities found.`);
      }
      
    } catch (error) {
      console.error('❌ Error analyzing file:', error);
      process.exit(1);
    }
  });

function findSourceFiles(projectPath: string): string[] {
  const files: string[] = [];
  
  // Patterns to exclude
  const excludePatterns = [
    /\.test\.(ts|tsx)$/,
    /\.tests\.(ts|tsx)$/,
    /\.spec\.(ts|tsx)$/,
    /\.constants\.(ts|tsx)$/,
    /\.types\.(ts|tsx)$/,
    /\.validation\.(ts|tsx)$/,
    /\.stories\.(ts|tsx)$/,
    /\.parts\.(ts|tsx)$/
  ];
  
  function walkDir(dir: string) {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        // Skip node_modules and other common directories
        if (!['node_modules', '.git', 'dist', 'build', '__tests__', '__mocks__'].includes(item)) {
          walkDir(fullPath);
        }
      } else if (item.endsWith('.ts') || item.endsWith('.tsx')) {
        // Check if file should be excluded
        const shouldExclude = excludePatterns.some(pattern => pattern.test(item));
        if (!shouldExclude) {
          files.push(fullPath);
        }
      }
    }
  }
  
  walkDir(projectPath);
  return files;
}

program.parse(); 