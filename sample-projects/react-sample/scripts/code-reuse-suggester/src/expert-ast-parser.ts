import { Project, SourceFile, Node, SyntaxKind, VariableDeclaration, FunctionDeclaration, ExportDeclaration, ImportDeclaration } from 'ts-morph';
import { CodePattern, PropInfo, ParameterInfo } from './types';
import * as crypto from 'crypto';

export class ExpertASTParser {
  private project: Project;

  constructor() {
    this.project = new Project({
      tsConfigFilePath: 'tsconfig.json',
    });
  }

  public parseFile(filePath: string): CodePattern[] {
    const sourceFile = this.project.addSourceFileAtPath(filePath);
    const patterns: CodePattern[] = [];

    // Comprehensive component detection
    patterns.push(...this.findReactComponents(sourceFile));
    patterns.push(...this.findCustomHooks(sourceFile));
    patterns.push(...this.findUtilityFunctions(sourceFile));

    return patterns;
  }

  private findReactComponents(sourceFile: SourceFile): CodePattern[] {
    const components: CodePattern[] = [];
    
    // Strategy 1: Find exported variables that are React components
    const exportedVariables = sourceFile.getExportedDeclarations();
    
    for (const [name, declarations] of exportedVariables) {
      for (const declaration of declarations) {
        if (this.isReactComponentDeclaration(declaration)) {
          const component = this.extractComponentInfo(declaration, name);
          if (component) {
            components.push(component);
          }
        }
      }
    }

    // Strategy 2: Find function declarations that are React components
    const functions = sourceFile.getFunctions();
    for (const func of functions) {
      if (this.isReactFunctionComponent(func)) {
        const component = this.extractFunctionComponentInfo(func);
        if (component) {
          components.push(component);
        }
      }
    }

    return components;
  }

  private isReactComponentDeclaration(node: Node): boolean {
    // Check if it's a variable declaration
    if (node.getKind() !== SyntaxKind.VariableDeclaration) {
      return false;
    }

    const variable = node as VariableDeclaration;
    const name = variable.getName();
    
    // Must be PascalCase
    if (!name || !/^[A-Z]/.test(name)) {
      return false;
    }

    // Check various React component patterns
    const initializer = variable.getInitializer();
    if (!initializer) return false;

    const initializerText = initializer.getText();
    
    // Pattern 1: React.FC
    if (initializerText.includes('React.FC')) return true;
    
    // Pattern 2: forwardRef
    if (initializerText.includes('forwardRef')) return true;
    
    // Pattern 3: Function that returns JSX
    if (initializerText.includes('=>') && initializerText.includes('return')) return true;
    
    // Pattern 4: Arrow function with JSX
    if (initializerText.includes('=>') && (initializerText.includes('<') || initializerText.includes('JSX'))) return true;

    return false;
  }

  private isReactFunctionComponent(func: FunctionDeclaration): boolean {
    const name = func.getName();
    if (!name || !/^[A-Z]/.test(name)) return false;

    // Check if it returns JSX or React elements
    const returnType = func.getReturnType();
    const returnTypeText = returnType.getText();
    
    return returnTypeText.includes('JSX') || 
           returnTypeText.includes('ReactElement') || 
           returnTypeText.includes('ReactNode') ||
           returnTypeText.includes('Element');
  }

  private extractComponentInfo(node: Node, name: string): CodePattern | null {
    try {
      const filePath = node.getSourceFile().getFilePath();
      const description = this.extractJSDoc(node);
      const hash = this.generateHash(node.getText());
      const props = this.extractPropsFromNode(node);

      return {
        id: `${name}-${filePath}`,
        filePath,
        name,
        type: 'component',
        description: description || `React component ${name}`,
        hash,
        props
      };
    } catch (error) {
      console.warn(`Failed to extract component info for ${name}:`, error);
      return null;
    }
  }

  private extractFunctionComponentInfo(func: FunctionDeclaration): CodePattern | null {
    try {
      const name = func.getName()!;
      const filePath = func.getSourceFile().getFilePath();
      const description = this.extractJSDoc(func);
      const hash = this.generateHash(func.getText());
      const props = this.extractPropsFromFunction(func);

      return {
        id: `${name}-${filePath}`,
        filePath,
        name,
        type: 'component',
        description: description || `React component ${name}`,
        hash,
        props
      };
    } catch (error) {
      console.warn(`Failed to extract function component info:`, error);
      return null;
    }
  }

  private findCustomHooks(sourceFile: SourceFile): CodePattern[] {
    const hooks: CodePattern[] = [];
    
    // Find exported functions that start with 'use'
    const exportedVariables = sourceFile.getExportedDeclarations();
    
    for (const [name, declarations] of exportedVariables) {
      if (name.startsWith('use')) {
        for (const declaration of declarations) {
          if (declaration.getKind() === SyntaxKind.VariableDeclaration) {
            const hook = this.extractHookInfo(declaration, name);
            if (hook) {
              hooks.push(hook);
            }
          }
        }
      }
    }

    // Find function declarations that start with 'use'
    const functions = sourceFile.getFunctions();
    for (const func of functions) {
      const name = func.getName();
      if (name && name.startsWith('use')) {
        const hook = this.extractFunctionHookInfo(func);
        if (hook) {
          hooks.push(hook);
        }
      }
    }

    return hooks;
  }

  private findUtilityFunctions(sourceFile: SourceFile): CodePattern[] {
    const utilities: CodePattern[] = [];
    
    // Find exported functions that aren't components or hooks
    const exportedVariables = sourceFile.getExportedDeclarations();
    
    for (const [name, declarations] of exportedVariables) {
      if (!name.startsWith('use') && /^[a-z]/.test(name)) {
        for (const declaration of declarations) {
          if (declaration.getKind() === SyntaxKind.VariableDeclaration) {
            const utility = this.extractUtilityInfo(declaration, name);
            if (utility) {
              utilities.push(utility);
            }
          }
        }
      }
    }

    // Find function declarations that aren't components
    const functions = sourceFile.getFunctions();
    for (const func of functions) {
      const name = func.getName();
      if (name && !name.startsWith('use') && /^[a-z]/.test(name) && !this.isReactFunctionComponent(func)) {
        const utility = this.extractFunctionUtilityInfo(func);
        if (utility) {
          utilities.push(utility);
        }
      }
    }

    return utilities;
  }

  private extractPropsFromNode(node: Node): PropInfo[] {
    const props: PropInfo[] = [];
    
    try {
      const nodeText = node.getText();
      
      // Extract from React.FC<Props>
      const fcMatch = nodeText.match(/React\.FC<([^>]+)>/);
      if (fcMatch) {
        props.push({
          name: 'props',
          type: fcMatch[1],
          required: true
        });
        return props;
      }
      
      // Extract from forwardRef<RefType, PropsType>
      const forwardRefMatch = nodeText.match(/forwardRef<[^,]+,\s*([^>]+)>/);
      if (forwardRefMatch) {
        props.push({
          name: 'props',
          type: forwardRefMatch[1],
          required: true
        });
        return props;
      }
      
      // Extract from function parameters
      if (node.getKind() === SyntaxKind.VariableDeclaration) {
        const variable = node as VariableDeclaration;
        const initializer = variable.getInitializer();
        if (initializer) {
          const params = this.extractParametersFromInitializer(initializer);
          props.push(...params);
        }
      }
      
    } catch (error) {
      console.warn('Failed to extract props from node:', error);
    }
    
    return props;
  }

  private extractPropsFromFunction(func: FunctionDeclaration): PropInfo[] {
    const props: PropInfo[] = [];
    
    try {
      const parameters = func.getParameters();
      for (const param of parameters) {
        const paramType = param.getType();
        props.push({
          name: param.getName(),
          type: paramType.getText(),
          required: !paramType.isNullable()
        });
      }
    } catch (error) {
      console.warn('Failed to extract props from function:', error);
    }
    
    return props;
  }

  private extractParametersFromInitializer(initializer: Node): PropInfo[] {
    const props: PropInfo[] = [];
    
    try {
      const initializerText = initializer.getText();
      
      // Extract parameters from arrow function
      const paramMatch = initializerText.match(/\(([^)]*)\)\s*=>/);
      if (paramMatch) {
        const params = paramMatch[1].split(',').map(p => p.trim());
        for (const param of params) {
          if (param) {
            const [name, type] = param.split(':').map(p => p.trim());
            if (name && type) {
              props.push({
                name,
                type,
                required: !type.includes('?')
              });
            }
          }
        }
      }
    } catch (error) {
      console.warn('Failed to extract parameters from initializer:', error);
    }
    
    return props;
  }

  private extractHookInfo(node: Node, name: string): CodePattern | null {
    try {
      const filePath = node.getSourceFile().getFilePath();
      const description = this.extractJSDoc(node);
      const hash = this.generateHash(node.getText());
      const parameters = this.extractParametersFromNode(node);
      const returnType = this.extractReturnTypeFromNode(node);

      return {
        id: `${name}-${filePath}`,
        filePath,
        name,
        type: 'hook',
        description: description || `Custom hook ${name}`,
        hash,
        parameters,
        returnType
      };
    } catch (error) {
      console.warn(`Failed to extract hook info for ${name}:`, error);
      return null;
    }
  }

  private extractFunctionHookInfo(func: FunctionDeclaration): CodePattern | null {
    try {
      const name = func.getName()!;
      const filePath = func.getSourceFile().getFilePath();
      const description = this.extractJSDoc(func);
      const hash = this.generateHash(func.getText());
      const parameters = this.extractParametersFromFunction(func);
      const returnType = func.getReturnType().getText();

      return {
        id: `${name}-${filePath}`,
        filePath,
        name,
        type: 'hook',
        description: description || `Custom hook ${name}`,
        hash,
        parameters,
        returnType
      };
    } catch (error) {
      console.warn(`Failed to extract function hook info:`, error);
      return null;
    }
  }

  private extractUtilityInfo(node: Node, name: string): CodePattern | null {
    try {
      const filePath = node.getSourceFile().getFilePath();
      const description = this.extractJSDoc(node);
      const hash = this.generateHash(node.getText());
      const parameters = this.extractParametersFromNode(node);
      const returnType = this.extractReturnTypeFromNode(node);

      return {
        id: `${name}-${filePath}`,
        filePath,
        name,
        type: 'utility',
        description: description || `Utility function ${name}`,
        hash,
        parameters,
        returnType
      };
    } catch (error) {
      console.warn(`Failed to extract utility info for ${name}:`, error);
      return null;
    }
  }

  private extractFunctionUtilityInfo(func: FunctionDeclaration): CodePattern | null {
    try {
      const name = func.getName()!;
      const filePath = func.getSourceFile().getFilePath();
      const description = this.extractJSDoc(func);
      const hash = this.generateHash(func.getText());
      const parameters = this.extractParametersFromFunction(func);
      const returnType = func.getReturnType().getText();

      return {
        id: `${name}-${filePath}`,
        filePath,
        name,
        type: 'utility',
        description: description || `Utility function ${name}`,
        hash,
        parameters,
        returnType
      };
    } catch (error) {
      console.warn(`Failed to extract function utility info:`, error);
      return null;
    }
  }

  private extractParametersFromNode(node: Node): ParameterInfo[] {
    const parameters: ParameterInfo[] = [];
    
    try {
      if (node.getKind() === SyntaxKind.VariableDeclaration) {
        const variable = node as VariableDeclaration;
        const initializer = variable.getInitializer();
        if (initializer) {
          const params = this.extractParametersFromInitializer(initializer);
          parameters.push(...params);
        }
      }
    } catch (error) {
      console.warn('Failed to extract parameters from node:', error);
    }
    
    return parameters;
  }

  private extractParametersFromFunction(func: FunctionDeclaration): ParameterInfo[] {
    const parameters: ParameterInfo[] = [];
    
    try {
      const funcParams = func.getParameters();
      for (const param of funcParams) {
        const paramType = param.getType();
        parameters.push({
          name: param.getName(),
          type: paramType.getText(),
          required: !paramType.isNullable()
        });
      }
    } catch (error) {
      console.warn('Failed to extract parameters from function:', error);
    }
    
    return parameters;
  }

  private extractReturnTypeFromNode(node: Node): string {
    try {
      if (node.getKind() === SyntaxKind.VariableDeclaration) {
        const variable = node as VariableDeclaration;
        const type = variable.getType();
        return type.getText();
      }
    } catch (error) {
      console.warn('Failed to extract return type from node:', error);
    }
    
    return '';
  }

  private extractJSDoc(node: Node): string {
    try {
      // Try to get JSDoc from the node if it has the method
      if ('getJsDocs' in node) {
        const jsDocs = (node as any).getJsDocs();
        if (jsDocs && jsDocs.length > 0) {
          const comment = jsDocs[0].getComment();
          if (typeof comment === 'string') {
            return comment.trim();
          }
        }
      }
      
      // Fallback: try to get JSDoc from parent if it's a variable declaration
      if (node.getKind() === SyntaxKind.VariableDeclaration) {
        const parent = node.getParent();
        if (parent && 'getJsDocs' in parent) {
          const jsDocs = (parent as any).getJsDocs();
          if (jsDocs && jsDocs.length > 0) {
            const comment = jsDocs[0].getComment();
            if (typeof comment === 'string') {
              return comment.trim();
            }
          }
        }
      }
    } catch (error) {
      // JSDoc extraction can fail, that's okay
    }
    
    return '';
  }

  private generateHash(text: string): string {
    return crypto.createHash('md5').update(text).digest('hex');
  }
} 