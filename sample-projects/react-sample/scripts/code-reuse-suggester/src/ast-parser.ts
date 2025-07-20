import { Project, SourceFile, ClassDeclaration, FunctionDeclaration, VariableDeclaration, InterfaceDeclaration, TypeAliasDeclaration } from 'ts-morph';
import { CodePattern, PropInfo, ParameterInfo } from './types';
import * as crypto from 'crypto';

export class ASTParser {
  private project: Project;

  constructor() {
    this.project = new Project({
      tsConfigFilePath: 'tsconfig.json',
    });
  }

  public parseFile(filePath: string): CodePattern[] {
    const sourceFile = this.project.addSourceFileAtPath(filePath);
    const patterns: CodePattern[] = [];

    // Parse React components
    patterns.push(...this.parseReactComponents(sourceFile));
    
    // Parse custom hooks
    patterns.push(...this.parseCustomHooks(sourceFile));
    
    // Parse utility functions
    patterns.push(...this.parseUtilityFunctions(sourceFile));

    return patterns;
  }

  private parseReactComponents(sourceFile: SourceFile): CodePattern[] {
    const components: CodePattern[] = [];
    
    // Look for function components (function declarations)
    const functions = sourceFile.getFunctions();
    for (const func of functions) {
      const name = func.getName();
      if (name && this.isReactComponent(func)) {
        const props = this.extractProps(func);
        const description = this.extractJSDoc(func);
        const hash = this.generateHash(func.getText());
        
        components.push({
          id: `${name}-${sourceFile.getFilePath()}`,
          filePath: sourceFile.getFilePath(),
          name,
          type: 'component',
          description: description || `React component ${name}`,
          hash,
          props
        });
      }
    }

    // Look for arrow function components (const declarations)
    const variables = sourceFile.getVariableDeclarations();
    for (const variable of variables) {
      const name = variable.getName();
      const initializer = variable.getInitializer();
      
      if (name && initializer && this.isReactArrowComponent(variable)) {
        const props = this.extractPropsFromArrow(variable);
        const description = this.extractJSDocFromVariable(variable);
        const hash = this.generateHash(variable.getText());
        
        components.push({
          id: `${name}-${sourceFile.getFilePath()}`,
          filePath: sourceFile.getFilePath(),
          name,
          type: 'component',
          description: description || `React component ${name}`,
          hash,
          props
        });
      }
    }

    // Look for forwardRef components
    for (const variable of variables) {
      const name = variable.getName();
      const initializer = variable.getInitializer();
      
      if (name && initializer && this.isReactForwardRefComponent(variable)) {
        const props = this.extractPropsFromForwardRef(variable);
        const description = this.extractJSDocFromVariable(variable);
        const hash = this.generateHash(variable.getText());
        
        components.push({
          id: `${name}-${sourceFile.getFilePath()}`,
          filePath: sourceFile.getFilePath(),
          name,
          type: 'component',
          description: description || `React component ${name}`,
          hash,
          props
        });
      }
    }

    return components;
  }

  private parseCustomHooks(sourceFile: SourceFile): CodePattern[] {
    const hooks: CodePattern[] = [];
    
    const functions = sourceFile.getFunctions();
    for (const func of functions) {
      const name = func.getName();
      if (name && this.isCustomHook(func)) {
        const parameters = this.extractParameters(func);
        const returnType = func.getReturnType().getText();
        const description = this.extractJSDoc(func);
        const hash = this.generateHash(func.getText());
        
        hooks.push({
          id: `${name}-${sourceFile.getFilePath()}`,
          filePath: sourceFile.getFilePath(),
          name,
          type: 'hook',
          description: description || `Custom hook ${name}`,
          hash,
          parameters,
          returnType
        });
      }
    }

    return hooks;
  }

  private parseUtilityFunctions(sourceFile: SourceFile): CodePattern[] {
    const utilities: CodePattern[] = [];
    
    const functions = sourceFile.getFunctions();
    for (const func of functions) {
      const name = func.getName();
      if (name && !this.isReactComponent(func) && !this.isCustomHook(func)) {
        const parameters = this.extractParameters(func);
        const returnType = func.getReturnType().getText();
        const description = this.extractJSDoc(func);
        const hash = this.generateHash(func.getText());
        
        utilities.push({
          id: `${name}-${sourceFile.getFilePath()}`,
          filePath: sourceFile.getFilePath(),
          name,
          type: 'utility',
          description: description || `Utility function ${name}`,
          hash,
          parameters,
          returnType
        });
      }
    }

    return utilities;
  }

  private isReactComponent(func: FunctionDeclaration): boolean {
    const name = func.getName();
    if (!name) return false;
    
    // Check if it's a PascalCase component name
    if (!/^[A-Z]/.test(name)) return false;
    
    // Check if it returns JSX
    const returnType = func.getReturnType().getText();
    return returnType.includes('JSX') || returnType.includes('ReactElement');
  }

  private isReactArrowComponent(variable: VariableDeclaration): boolean {
    const name = variable.getName();
    if (!name) return false;
    
    // Check if it's a PascalCase component name
    if (!/^[A-Z]/.test(name)) return false;
    
    // Check if it has React.FC type annotation (with or without generic parameters)
    const type = variable.getType();
    const typeText = type.getText();
    return typeText.includes('React.FC') || typeText.includes('ReactElement') || typeText.includes('React.ComponentType');
  }

  private isReactForwardRefComponent(variable: VariableDeclaration): boolean {
    const name = variable.getName();
    if (!name) return false;
    
    // Check if it's a PascalCase component name
    if (!/^[A-Z]/.test(name)) return false;
    
    // Check if it's assigned to forwardRef
    const initializer = variable.getInitializer();
    if (initializer) {
      const initializerText = initializer.getText();
      return initializerText.includes('forwardRef');
    }
    
    return false;
  }

  private isCustomHook(func: FunctionDeclaration): boolean {
    const name = func.getName();
    if (!name) return false;
    
    // Check if it starts with 'use'
    return name.startsWith('use');
  }

  private extractProps(func: FunctionDeclaration): PropInfo[] {
    const props: PropInfo[] = [];
    const parameters = func.getParameters();
    
    if (parameters.length > 0) {
      const propsParam = parameters[0];
      const propsType = propsParam.getType();
      const properties = propsType.getProperties();
      
      for (const prop of properties) {
        const propType = prop.getValueDeclaration()?.getType();
        if (propType) {
          props.push({
            name: prop.getName(),
            type: propType.getText(),
            required: !propType.isNullable()
          });
        }
      }
    }
    
    return props;
  }

  private extractParameters(func: FunctionDeclaration): ParameterInfo[] {
    const parameters: ParameterInfo[] = [];
    const funcParams = func.getParameters();
    
    for (const param of funcParams) {
      const paramType = param.getType();
      parameters.push({
        name: param.getName(),
        type: paramType.getText(),
        required: !paramType.isNullable()
      });
    }
    
    return parameters;
  }

  private extractJSDoc(func: FunctionDeclaration): string {
    const jsDoc = func.getJsDocs()[0];
    if (jsDoc) {
      const comment = jsDoc.getComment();
      if (typeof comment === 'string') {
        return comment.trim();
      }
    }
    return '';
  }

  private extractPropsFromArrow(variable: VariableDeclaration): PropInfo[] {
    const props: PropInfo[] = [];
    
    try {
      // Get the type of the variable
      const type = variable.getType();
      const typeText = type.getText();
      
      // If it's React.FC<Props>, try to extract the Props type
      if (typeText.includes('React.FC<')) {
        // Extract the generic parameter
        const genericMatch = typeText.match(/React\.FC<([^>]+)>/);
        if (genericMatch) {
          const propsTypeName = genericMatch[1];
          
          // For now, we'll create a simple prop based on the type name
          // In a full implementation, we'd resolve the actual type definition
          props.push({
            name: 'props',
            type: propsTypeName,
            required: true
          });
        }
      }
    } catch (error) {
      // If extraction fails, return empty array
      console.warn('Failed to extract props from arrow function:', error);
    }
    
    return props;
  }

  private extractJSDocFromVariable(variable: VariableDeclaration): string {
    // For now, return empty string - JSDoc extraction for variables is complex
    // In a full implementation, we'd need to traverse up the AST to find JSDoc
    return '';
  }

  private extractPropsFromForwardRef(variable: VariableDeclaration): PropInfo[] {
    const props: PropInfo[] = [];
    
    try {
      // Get the initializer (forwardRef call)
      const initializer = variable.getInitializer();
      if (initializer) {
        const initializerText = initializer.getText();
        
        // Extract the second generic parameter from forwardRef<RefType, PropsType>
        const genericMatch = initializerText.match(/forwardRef<[^,]+,\s*([^>]+)>/);
        if (genericMatch) {
          const propsTypeName = genericMatch[1];
          
          props.push({
            name: 'props',
            type: propsTypeName,
            required: true
          });
        }
      }
    } catch (error) {
      // If extraction fails, return empty array
      console.warn('Failed to extract props from forwardRef:', error);
    }
    
    return props;
  }

  private generateHash(text: string): string {
    return crypto.createHash('md5').update(text).digest('hex');
  }
} 