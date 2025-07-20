# Prompt

act as SAP Commerce Cloud Architect and SAP Commerce Cloud Developer
make overview of the project thoroghly and accurately
be aware what we have problems with the project

"хайбрис проекты - это огромные монолиты на несколько тысяч классов и десятки модулей. Когда есть юзер стори - её нужно имплементировать в нескольких модулях, а копайлот теряется в таком огромном контексте. И, фактически, мы не можем использовать копайлот для хайбриса  "

"Агенту тежелее найти что-то в очень большом проекте, очень много файлов. 
- По этому всегда лучше указывать пути к файлам в промте, типа вот нужно в таком-то файле сделать тоже что в таком то файле но по другому, посмотри еще пример в таком-то файле
- Есть большие файлы на тысячи строк, это в основном какие-то конфигурации, их агенту тяжело менять, он может вообще дропнуть часть файла при этом
- На Хайбрисе много где используется депенденси инвершин (когда зависимости на интерефейсы, а не конкретные реализации) и потом чезез Спринг фреймворк, инжектятся реализации на основе конфигов. Из-за этого агенту тяжелее понять что конкретно используется
- Хайбрис это платформа со своими правилами как устроены модули, где что лежит и агент не всегда это понимает, часто например он игнорирует как именно модули зависят один от другого и может использовать функционал из модуля до которого из текущего места нет доступа"


# Result

As a **SAP Commerce Cloud Architect**, I'll conduct a thorough project analysis. Let me start by examining the project structure and understanding the specific challenges you've outlined. Now let me analyze the project size and scale in a different way: ## **SAP Commerce Cloud Project Analysis**

As a **SAP Commerce Cloud Architect**, I've conducted a comprehensive analysis of your Pearson B2C Hybris project. Here's my thorough assessment:

## **Project Overview & Scale**

### **Project Scope**
- **Platform**: SAP Commerce Cloud (Hybris) B2C with some B2B extensions
- **Domain**: Educational content and services e-commerce
- **Complexity**: Enterprise-level, multi-regional implementation
- **Architecture**: Monolithic platform with **thousands of classes** and **dozens of modules**

### **Project Scale Indicators**
- **23+ Custom Extensions** in the pearsonb2c folder alone
- **Multiple Regional Stores**: 15+ storefronts across US, CA, UK, AU, NZ, Asia
- **Complex Dependencies**: 40+ required extensions in core module
- **Large File Structure**: Thousands of Java files, extensive configuration

## **Key Business Domains**

### **Storefronts & Markets**
1. **Higher Education (Learner)**: US, CA, UK, AU, NZ markets
2. **Pearson+ (Mojo)**: eText subscription service - US, CA, UK
3. **K12 Education (CCR)**: College & Career Readiness - B2C & B2B
4. **Clinical Assessments**: Professional assessment tools across 8 countries
5. **Talent Lens**: Specialized assessment products

## **Technical Architecture**

### **Core Extensions**
- **pearsonb2ccore**: Foundation with 40+ dependencies
- **pearsonb2cfacades**: Facade layer for DTOs
- **pearsonb2cstorefront**: UI layer with multiple themes
- **pearsonb2cfulfilmentprocess**: Order processing workflows
- **pmccommercewebservices**: REST API layer

### **Dependency Complexity**
The extensioninfo.xml reveals extensive dependencies:
```xml
<requires-extension name="b2bacceleratorservices"/>
<requires-extension name="solrserver"/>
<requires-extension name="pmcsharedcore"/>
<requires-extension name="pmcesb"/>
<!-- 40+ more dependencies -->
```

## **Identified Challenges (Addressing Your Concerns)**

### **1. Monolithic Scale Issues** ✅
- **Confirmed**: Project has thousands of classes across dozens of modules
- **Impact**: User stories require implementation across multiple modules
- **Example**: Payment flows span core, facades, storefront, and API layers

### **2. Agent Navigation Complexity** ✅
- **Large File Count**: 23+ extensions with deep folder structures
- **Configuration Files**: Thousands of lines in items.xml, spring configs
- **Recommendation**: Always specify exact file paths when requesting changes

### **3. Dependency Injection Complexity** ✅
- **Spring Framework**: Extensive use of interface-based DI
- **Configuration**: Multiple spring.xml files across extensions
- **Impact**: Hard for agents to trace actual implementations

### **4. Module Dependency Management** ✅
- **Complex Dependencies**: extensioninfo.xml shows intricate relationships
- **Access Control**: Modules can only access explicitly declared dependencies
- **Risk**: Agents may suggest using inaccessible functionality

## **Specific AI Agent Challenges**

### **Large Configuration Files**
- **Items.xml**: Complex type definitions spanning thousands of lines
- **Spring Configs**: Multiple files with bean definitions
- **Risk**: Agents may truncate or miss context during edits

### **Theme & UI Complexity**
- **Multiple Themes**: learner, mojo, master, practitioner
- **Large Templates**: Complex JSP tags with hundreds of lines
- **JavaScript**: Extensive client-side code with autoload mechanisms

### **Data Import Complexity**
- **ImpEx Files**: Complex data transformation tasks
- **Feed Processing**: Sophisticated batch processing workflows
- **Hot Folder**: File-based data integration patterns

## **Recommendations for AI Agent Usage**

### **Best Practices**
1. **Always specify exact file paths** in prompts
2. **Include context files** when requesting cross-module changes
3. **Reference example implementations** from similar modules
4. **Break large changes** into smaller, module-specific tasks

## **Copilot Folder Analysis**

The project includes a comprehensive **`/copilot`** folder that demonstrates a sophisticated approach to AI agent configuration for this complex Hybris project:

### **Configuration Files**
- **`copilot-config.json`**: Defines agent permissions, execution limits, and custom directives
- **`workspace.json`**: Configures workspace context, priority directories, and ignore patterns
- **`directives.json`**: Custom project-specific directives (`@pmc-bean`, `@pmc-load`, `@pmc-flex`)

### **Instruction Documentation**
- **`instructions.md`**: Main index with mandatory setup steps for every task
- **`hybris-instructions.md`**: Platform-specific guidance for Hybris/SAP Commerce
- **`project-overview.md`** & **`project-structure.md`**: Project context and architecture
- **`coding-standards.md`**: Java coding standards and conventions
- **`programming-practices.md`**: Best practices for code quality

### **Specialized Prompts**
- **`prompts/pmc-flex-directive.md`**: Flexible Search query assistance
- **`prompts/pmc-load-directive.md`**: Data loading process guidance
- **`prompts/pmc-test-directive.md`**: Testing framework instructions

### **Key Configuration Insights**

#### **Permissions & Security**
```json
"permissions": {
  "defaultLevel": "trustedOnly",
  "trustedDirectories": [
    "../../config",
    "../../extensions",
    "../../config/customize/modules/pearsonb2c"
  ]
}
```

#### **Context Prioritization**
```json
"contextDirectories": [
  {
    "path": "../extensions/pearsonb2c",
    "priority": "high"
  }
]
```

#### **Mandatory Setup Requirements**
Every AI agent interaction must:
1. Get `HYBRIS_HOME_DIR` environment variable
2. Get `HYBRIS_CONFIG_DIR` environment variable  
3. Remember `PROJECT_ROOT_DIR` structure
4. Change to project root directory first

### **Custom Directives**
- **`@pmc-bean`**: Spring bean context and configuration search
- **`@pmc-load`**: Project initialization and data loading processes
- **`@pmc-flex`**: Flexible Search query building assistance

### **Significance**
This copilot folder represents a **mature approach** to managing AI agent complexity in large Hybris projects by:
- **Constraining scope** to relevant directories
- **Providing context** through structured documentation
- **Enforcing patterns** through custom directives
- **Managing permissions** to prevent harmful operations
- **Standardizing workflows** through mandatory setup steps

This configuration directly addresses the challenges you mentioned about AI agents getting lost in large Hybris projects.

### **Use Project Directives**