import { types, flow, type Instance } from 'mobx-state-tree';
import type { Language } from '../../domain/entities/Translation';
import type { TranslateTextUseCase } from '../../application/useCases/TranslateTextUseCase';

const TranslationModel = types.model('Translation', {
  sourceLanguage: types.enumeration<Language>('Language', ['english', 'ukrainian']),
  targetLanguage: types.enumeration<Language>('Language', ['english', 'ukrainian']),
  sourceText: types.string,
  translatedText: types.string,
  timestamp: types.Date,
});

export const TranslationStore = types
  .model('TranslationStore', {
    sourceLanguage: types.optional(
      types.enumeration<Language>('Language', ['english', 'ukrainian']),
      'english'
    ),
    targetLanguage: types.optional(
      types.enumeration<Language>('Language', ['english', 'ukrainian']),
      'ukrainian'
    ),
    sourceText: types.optional(types.string, ''),
    translatedText: types.optional(types.string, ''),
    isTranslating: types.optional(types.boolean, false),
    error: types.optional(types.string, ''),
    translations: types.optional(types.array(TranslationModel), []),
  })
  .views((self) => ({
    get canTranslate() {
      return self.sourceText.trim().length > 0 && !self.isTranslating;
    },
  }))
  .actions((self) => {
    let translateTextUseCase: TranslateTextUseCase;

    return {
      setTranslateTextUseCase(useCase: TranslateTextUseCase) {
        translateTextUseCase = useCase;
      },
      setSourceLanguage(language: Language) {
        self.sourceLanguage = language;
        // If source and target are the same, swap them
        if (self.sourceLanguage === self.targetLanguage) {
          self.targetLanguage = language === 'english' ? 'ukrainian' : 'english';
        }
      },
      setTargetLanguage(language: Language) {
        self.targetLanguage = language;
        // If source and target are the same, swap them
        if (self.sourceLanguage === self.targetLanguage) {
          self.sourceLanguage = language === 'english' ? 'ukrainian' : 'english';
        }
      },
      setSourceText(text: string) {
        self.sourceText = text;
      },
      swapLanguages() {
        const temp = self.sourceLanguage;
        self.sourceLanguage = self.targetLanguage;
        self.targetLanguage = temp;
        
        // Also swap the texts
        const tempText = self.sourceText;
        self.sourceText = self.translatedText;
        self.translatedText = tempText;
      },
      translate: flow(function* () {
        if (!self.sourceText.trim()) {
          return;
        }

        self.isTranslating = true;
        self.error = '';

        try {
          const result = yield translateTextUseCase.execute(
            self.sourceText,
            self.sourceLanguage,
            self.targetLanguage
          );

          self.translatedText = result.translatedText;
          self.translations.push(result);
        } catch (error) {
          self.error = error instanceof Error ? error.message : 'Translation failed';
        } finally {
          self.isTranslating = false;
        }
      }),
    };
  });

export type ITranslationStore = Instance<typeof TranslationStore>;
