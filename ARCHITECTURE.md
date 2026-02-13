# Architecture Documentation

## Overview

This application implements Clean Architecture principles with SOLID design patterns, creating a maintainable and testable codebase for an AI-powered translation application.

## Layer Structure

### 1. Domain Layer (`src/domain/`)

The innermost layer containing enterprise business rules. This layer is completely independent of any frameworks or external concerns.

**Entities** (`entities/Translation.ts`):
- `Language`: Type representing supported languages
- `Translation`: Core business entity representing a translation operation

**Interfaces** (`interfaces/ITranslationService.ts`):
- `ITranslationService`: Contract for translation services
- Defines the `translate()` method signature

**Key Characteristics**:
- No dependencies on outer layers
- Pure TypeScript types and interfaces
- Framework-agnostic
- Contains core business logic

### 2. Application Layer (`src/application/`)

Contains application-specific business rules and orchestrates the flow of data.

**Use Cases** (`useCases/TranslateTextUseCase.ts`):
- `TranslateTextUseCase`: Coordinates the translation workflow
- Depends on `ITranslationService` interface (not implementation)
- Returns complete `Translation` entities

**Key Characteristics**:
- Implements business use cases
- Depends only on Domain layer
- Orchestrates between entities and services
- Independent of UI, database, or external services

### 3. Infrastructure Layer (`src/infrastructure/`)

Implements interfaces defined in the domain layer using concrete technologies.

**API Clients** (`api/OllamaTranslationService.ts`):
- `OllamaTranslationService`: Concrete implementation of `ITranslationService`
- Integrates with Ollama's browser API
- Handles API-specific details and error handling

**Key Characteristics**:
- Implements domain interfaces
- Contains framework-specific code
- Handles external service integration
- Isolated from business logic

### 4. Presentation Layer (`src/presentation/`)

Handles UI rendering and user interactions.

**Components** (`components/`):
- `Translator.tsx`: Main translation interface (observer pattern)
- `LanguageSelector.tsx`: Radix UI dropdown for language selection
- `StoreProvider.tsx`: React context provider for MobX store
- `StoreContext.ts`: React context definition
- `useStore.ts`: Custom hook for accessing store

**Stores** (`stores/TranslationStore.ts`):
- `TranslationStore`: MobX-State-Tree store
- Manages application state
- Coordinates with application layer use cases

**Key Characteristics**:
- React 19 components with TypeScript
- MobX-State-Tree for state management
- Observer pattern for reactivity
- Depends on application layer use cases

## SOLID Principles Implementation

### Single Responsibility Principle (SRP)
Each class/module has one reason to change:
- `Translation.ts`: Defines translation entity structure
- `TranslateTextUseCase.ts`: Handles translation workflow
- `OllamaTranslationService.ts`: Manages Ollama API communication
- `TranslationStore.ts`: Manages UI state
- `Translator.tsx`: Renders translation interface

### Open/Closed Principle (OCP)
The system is open for extension but closed for modification:
- New translation services can be added by implementing `ITranslationService`
- New use cases can be added without modifying existing ones
- UI components can be extended without changing core business logic

### Liskov Substitution Principle (LSP)
Any implementation of `ITranslationService` can be substituted:
```typescript
const service: ITranslationService = new OllamaTranslationService();
// Could be replaced with any other implementation
```

### Interface Segregation Principle (ISP)
Interfaces are focused and minimal:
- `ITranslationService` only defines translation-related methods
- No client is forced to depend on methods it doesn't use

### Dependency Inversion Principle (DIP)
High-level modules don't depend on low-level modules:
- `TranslateTextUseCase` depends on `ITranslationService` interface
- `TranslationStore` depends on use case, not concrete implementations
- Concrete implementations (`OllamaTranslationService`) implement interfaces

## Data Flow

```
User Input (Translator.tsx)
    ↓
Store Action (TranslationStore.translate())
    ↓
Use Case (TranslateTextUseCase.execute())
    ↓
Service Interface (ITranslationService)
    ↓
Concrete Implementation (OllamaTranslationService)
    ↓
External API (Ollama)
    ↓
Response flows back up the stack
    ↓
Store Update (translatedText, translations)
    ↓
UI Re-render (React Observer)
```

## State Management

### MobX-State-Tree Benefits
1. **Type Safety**: Full TypeScript support with inferred types
2. **Immutability**: Snapshot-based state management
3. **Time Travel**: Can replay state changes
4. **Computed Values**: Automatic derivations (e.g., `canTranslate`)
5. **Actions**: Encapsulated state modifications
6. **Async Actions**: Built-in support with `flow()`

### Store Structure
```typescript
TranslationStore {
  // Observable State
  sourceLanguage: Language
  targetLanguage: Language
  sourceText: string
  translatedText: string
  isTranslating: boolean
  error: string
  translations: Translation[]
  
  // Computed Values
  canTranslate: boolean
  
  // Actions
  setSourceLanguage(language)
  setTargetLanguage(language)
  setSourceText(text)
  swapLanguages()
  translate() // async flow
}
```

## Component Architecture

### Translator Component
- **Observer**: Reacts to store changes
- **Props**: Receives store instance
- **Responsibilities**:
  - Render UI elements
  - Handle user interactions
  - Delegate state changes to store

### LanguageSelector Component
- **Presentational**: Pure UI component
- **Props-based**: Controlled component
- **Technology**: Radix UI Select (accessible)
- **Responsibilities**:
  - Render dropdown
  - Emit selection changes

## Dependency Injection

The application uses constructor injection for dependencies:

```typescript
// Infrastructure → Interface
class OllamaTranslationService implements ITranslationService

// Use Case → Interface
class TranslateTextUseCase {
  constructor(private translationService: ITranslationService)
}

// Store → Use Case
store.setTranslateTextUseCase(translateTextUseCase)
```

## Testing Strategy

### Unit Testing Approach
1. **Domain Layer**: Test entities and interfaces in isolation
2. **Application Layer**: Test use cases with mocked services
3. **Infrastructure Layer**: Test API clients with mocked HTTP responses
4. **Presentation Layer**: Test components with mocked stores

### Example Test Structure
```typescript
// Use Case Test
describe('TranslateTextUseCase', () => {
  it('should translate text', async () => {
    const mockService = { translate: jest.fn() }
    const useCase = new TranslateTextUseCase(mockService)
    // Test implementation
  })
})
```

## Benefits of This Architecture

1. **Testability**: Each layer can be tested independently
2. **Maintainability**: Clear separation of concerns
3. **Flexibility**: Easy to swap implementations
4. **Scalability**: New features fit naturally into layers
5. **Independence**: Business logic independent of frameworks
6. **Type Safety**: Full TypeScript coverage

## Future Extensions

### Adding New Translation Services
1. Implement `ITranslationService` interface
2. No changes to domain or application layers
3. Update dependency injection in presentation layer

### Adding New Features
1. Define new entities in domain layer
2. Create use cases in application layer
3. Implement in infrastructure if needed
4. Build UI in presentation layer

### Adding New Languages
1. Update `Language` type in domain layer
2. Add options to `LanguageSelector` component
3. No other changes required

## Conclusion

This architecture provides a solid foundation for building maintainable, testable, and scalable applications. The clear separation of concerns and adherence to SOLID principles ensures that the codebase remains clean and easy to work with as it grows.
