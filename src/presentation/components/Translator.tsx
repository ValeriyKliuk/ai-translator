import { observer } from 'mobx-react-lite';
import type { ITranslationStore } from '../stores/TranslationStore';
import { LanguageSelector } from './LanguageSelector';

interface TranslatorProps {
  store: ITranslationStore;
}

export const Translator: React.FC<TranslatorProps> = observer(({ store }) => {
  const handleTranslate = () => {
    store.translate();
  };

  const handleSwap = () => {
    store.swapLanguages();
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">AI Translator</h1>
        <p className="text-gray-600">Powered by Ollama Gemma 4B</p>
      </div>

      <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
        {/* Language Selector Row */}
        <div className="flex items-center justify-between bg-gray-50 px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700">From:</span>
            <LanguageSelector
              value={store.sourceLanguage}
              onChange={store.setSourceLanguage}
              disabled={store.isTranslating}
            />
          </div>

          <button
            onClick={handleSwap}
            disabled={store.isTranslating}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Swap languages"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 16V4M7 4L3 8M7 4L11 8M17 8V20M17 20L21 16M17 20L13 16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700">To:</span>
            <LanguageSelector
              value={store.targetLanguage}
              onChange={store.setTargetLanguage}
              disabled={store.isTranslating}
            />
          </div>
        </div>

        {/* Text Areas Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
          {/* Source Text Area */}
          <div className="p-6">
            <label htmlFor="source-text" className="block text-sm font-medium text-gray-700 mb-2">
              Source Text
            </label>
            <textarea
              id="source-text"
              value={store.sourceText}
              onChange={(e) => store.setSourceText(e.target.value)}
              disabled={store.isTranslating}
              className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none disabled:bg-gray-50 disabled:cursor-not-allowed"
              placeholder={`Enter text in ${store.sourceLanguage}...`}
            />
          </div>

          {/* Translated Text Area */}
          <div className="p-6">
            <label htmlFor="translated-text" className="block text-sm font-medium text-gray-700 mb-2">
              Translated Text
            </label>
            <div className="relative">
              <textarea
                id="translated-text"
                value={store.translatedText}
                readOnly
                className="w-full h-64 p-4 border border-gray-300 rounded-lg bg-gray-50 resize-none"
                placeholder="Translation will appear here..."
              />
              {store.isTranslating && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    <span className="text-sm text-gray-600">Translating...</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Error Message */}
        {store.error && (
          <div className="px-6 py-3 bg-red-50 border-t border-red-200">
            <p className="text-sm text-red-600">{store.error}</p>
          </div>
        )}

        {/* Action Button Row */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
          <button
            onClick={handleTranslate}
            disabled={!store.canTranslate}
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {store.isTranslating ? 'Translating...' : 'Translate'}
          </button>
        </div>
      </div>

      {/* Translation History */}
      {store.translations.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Translations</h2>
          <div className="space-y-4">
            {store.translations.slice(-5).reverse().map((translation, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow border border-gray-200 p-4"
              >
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <span className="font-medium capitalize">{translation.sourceLanguage}</span>
                  <span>→</span>
                  <span className="font-medium capitalize">{translation.targetLanguage}</span>
                  <span className="ml-auto text-xs">
                    {new Date(translation.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-900">{translation.sourceText}</p>
                  </div>
                  <div className="md:border-l md:border-gray-200 md:pl-4">
                    <p className="text-sm text-gray-900">{translation.translatedText}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});
