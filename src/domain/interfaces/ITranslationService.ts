import type { Language } from '../entities/Translation';

export interface ITranslationService {
  translate(text: string, sourceLanguage: Language, targetLanguage: Language): Promise<string>;
}
