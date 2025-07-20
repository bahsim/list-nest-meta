import * as fs from 'fs';
import * as path from 'path';
import { CodePattern, MetadataStore } from './types';

export class MetadataStoreManager {
  private metadataDir: string;
  private store: MetadataStore;

  constructor(projectRoot: string) {
    this.metadataDir = path.join(projectRoot, 'metadata');
    this.store = {
      components: [],
      hooks: [],
      utilities: []
    };
    this.ensureMetadataDir();
  }

  private ensureMetadataDir(): void {
    if (!fs.existsSync(this.metadataDir)) {
      fs.mkdirSync(this.metadataDir, { recursive: true });
    }
  }

  public loadMetadata(): MetadataStore {
    try {
      const componentsPath = path.join(this.metadataDir, 'components.json');
      const hooksPath = path.join(this.metadataDir, 'hooks.json');
      const utilitiesPath = path.join(this.metadataDir, 'utilities.json');

      if (fs.existsSync(componentsPath)) {
        this.store.components = JSON.parse(fs.readFileSync(componentsPath, 'utf8'));
      }
      if (fs.existsSync(hooksPath)) {
        this.store.hooks = JSON.parse(fs.readFileSync(hooksPath, 'utf8'));
      }
      if (fs.existsSync(utilitiesPath)) {
        this.store.utilities = JSON.parse(fs.readFileSync(utilitiesPath, 'utf8'));
      }
    } catch (error) {
      console.warn('Error loading metadata:', error);
    }

    return this.store;
  }

  public saveMetadata(patterns: CodePattern[]): void {
    // Group patterns by type
    const components: CodePattern[] = [];
    const hooks: CodePattern[] = [];
    const utilities: CodePattern[] = [];

    for (const pattern of patterns) {
      switch (pattern.type) {
        case 'component':
          components.push(pattern);
          break;
        case 'hook':
          hooks.push(pattern);
          break;
        case 'utility':
          utilities.push(pattern);
          break;
      }
    }

    // Save to separate files
    this.saveToFile('components.json', components);
    this.saveToFile('hooks.json', hooks);
    this.saveToFile('utilities.json', utilities);

    // Update the in-memory store
    this.store.components = components;
    this.store.hooks = hooks;
    this.store.utilities = utilities;
  }

  private saveToFile(filename: string, data: CodePattern[]): void {
    const filePath = path.join(this.metadataDir, filename);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  }

  public getAllPatterns(): CodePattern[] {
    return [
      ...this.store.components,
      ...this.store.hooks,
      ...this.store.utilities
    ];
  }

  public getPatternsByType(type: 'component' | 'hook' | 'utility'): CodePattern[] {
    switch (type) {
      case 'component':
        return this.store.components;
      case 'hook':
        return this.store.hooks;
      case 'utility':
        return this.store.utilities;
      default:
        return [];
    }
  }

  public addPattern(pattern: CodePattern): void {
    switch (pattern.type) {
      case 'component':
        this.store.components.push(pattern);
        break;
      case 'hook':
        this.store.hooks.push(pattern);
        break;
      case 'utility':
        this.store.utilities.push(pattern);
        break;
    }
  }

  public removePattern(patternId: string): void {
    this.store.components = this.store.components.filter(p => p.id !== patternId);
    this.store.hooks = this.store.hooks.filter(p => p.id !== patternId);
    this.store.utilities = this.store.utilities.filter(p => p.id !== patternId);
  }

  public getMetadataDir(): string {
    return this.metadataDir;
  }
} 