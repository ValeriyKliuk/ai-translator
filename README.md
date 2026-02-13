# AI Translator

A modern React TypeScript application for translating text between English and Ukrainian using Ollama's Gemma 4B model.

![AI Translator](https://github.com/user-attachments/assets/ea3425cf-04ac-45b4-bcb1-b7f1bcc8628a)

## Features

- 🌐 **Bidirectional Translation**: Translate between English and Ukrainian
- 🤖 **AI-Powered**: Uses Ollama's Gemma 4B model for high-quality translations
- 🎨 **Modern UI**: Built with Radix UI components and Tailwind CSS
- 🏗️ **Clean Architecture**: Follows SOLID principles with clear separation of concerns
- 📦 **State Management**: MobX-State-Tree for predictable state management
- ⚡ **Fast & Responsive**: Built with React 19 and Vite
- 🔄 **Language Swap**: Quickly swap source and target languages
- 📝 **Translation History**: View your recent translations

## Architecture

The application follows Clean Architecture principles with four distinct layers:

### 1. Domain Layer (`src/domain/`)
- **Entities**: Core business objects (`Translation.ts`)
- **Interfaces**: Contracts for services (`ITranslationService.ts`)

### 2. Application Layer (`src/application/`)
- **Use Cases**: Business logic implementation (`TranslateTextUseCase.ts`)

### 3. Infrastructure Layer (`src/infrastructure/`)
- **API Clients**: External service integrations (`OllamaTranslationService.ts`)

### 4. Presentation Layer (`src/presentation/`)
- **Components**: React UI components (`Translator.tsx`, `LanguageSelector.tsx`)
- **Stores**: MobX-State-Tree state management (`TranslationStore.ts`)

## Tech Stack

- **React 19**: Latest React with TypeScript
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible, unstyled UI components
- **MobX-State-Tree**: Type-safe state management
- **Ollama**: Local AI model integration

## Prerequisites

Before running this application, you need to have:

1. **Node.js** (v18 or higher)
2. **Ollama** installed and running locally
3. **Gemma 4B model** installed in Ollama

### Installing Ollama and Gemma

1. Install Ollama from [ollama.com](https://ollama.com/)
2. Pull the Gemma 4B model:
   ```bash
   ollama pull gemma:4b
   ```
3. Verify Ollama is running:
   ```bash
   curl http://localhost:11434/api/tags
   ```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ValeriyKliuk/ai-translator.git
   cd ai-translator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173/`

### Production Build

Build the application for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

### Linting

Run ESLint to check code quality:
```bash
npm run lint
```

## How to Use

1. **Enter Text**: Type or paste text in the "Source Text" area
2. **Select Languages**: Use the dropdown menus to select source and target languages
3. **Swap Languages**: Click the swap button to quickly reverse the translation direction
4. **Translate**: Click the "Translate" button to get the translation
5. **View History**: Scroll down to see your recent translations

## Screenshots

### Main Interface
![Initial State](https://github.com/user-attachments/assets/ea3425cf-04ac-45b4-bcb1-b7f1bcc8628a)

### Text Input
![With Text](https://github.com/user-attachments/assets/97fcc79a-32dd-4939-8082-d5f9b7550cb9)

### Language Swap
![Swapped Languages](https://github.com/user-attachments/assets/abb5b826-d210-4592-a2c9-b4909a0bf62c)

### Dropdown Menu
![Dropdown](https://github.com/user-attachments/assets/a3f2bdc5-8cf5-4de9-93bb-7b8d1ceca1b5)

## Project Structure

```
ai-translator/
├── src/
│   ├── domain/              # Domain layer (entities, interfaces)
│   │   ├── entities/
│   │   └── interfaces/
│   ├── application/         # Application layer (use cases)
│   │   └── useCases/
│   ├── infrastructure/      # Infrastructure layer (API clients)
│   │   └── api/
│   ├── presentation/        # Presentation layer (UI)
│   │   ├── components/
│   │   └── stores/
│   ├── App.tsx             # Main application component
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── index.html             # HTML template
├── package.json           # Dependencies and scripts
├── vite.config.ts        # Vite configuration
├── tsconfig.json         # TypeScript configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── postcss.config.js     # PostCSS configuration
```

## Configuration

### Ollama Configuration

The application connects to Ollama at `http://localhost:11434` by default. To change this, modify the `OllamaTranslationService` in `src/infrastructure/api/OllamaTranslationService.ts`:

```typescript
constructor() {
  this.ollama = new Ollama({ host: 'http://your-ollama-host:port' });
}
```

### Model Configuration

To use a different model, update the `model` property in `OllamaTranslationService.ts`:

```typescript
private model = 'your-model-name';
```

## Design Principles

### SOLID Principles

- **Single Responsibility**: Each class has one reason to change
- **Open/Closed**: Open for extension, closed for modification
- **Liskov Substitution**: Interfaces can be substituted with implementations
- **Interface Segregation**: Focused, minimal interfaces
- **Dependency Inversion**: Depend on abstractions, not concretions

### Clean Architecture Benefits

- **Independence**: Business logic is independent of frameworks
- **Testability**: Core logic can be tested without UI or external services
- **Maintainability**: Clear separation of concerns
- **Flexibility**: Easy to swap implementations

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Ollama](https://ollama.com/) for providing the local AI infrastructure
- [Radix UI](https://www.radix-ui.com/) for accessible component primitives
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [MobX-State-Tree](https://mobx-state-tree.js.org/) for state management
