import { useMemo } from 'react';
import { Translator } from './presentation/components/Translator';
import { TranslationStore } from './presentation/stores/TranslationStore';
import { OllamaTranslationService } from './infrastructure/api/OllamaTranslationService';
import { TranslateTextUseCase } from './application/useCases/TranslateTextUseCase';

function App() {
  const store = useMemo(() => {
    // Create dependencies following Clean Architecture
    const translationService = new OllamaTranslationService();
    const translateTextUseCase = new TranslateTextUseCase(translationService);
    
    // Create and configure store
    const store = TranslationStore.create();
    store.setTranslateTextUseCase(translateTextUseCase);
    
    return store;
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <Translator store={store} />
    </div>
  );
}

export default App;
