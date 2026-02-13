export type Language = 'english' | 'ukrainian';

export interface Translation {
  sourceLanguage: Language;
  targetLanguage: Language;
  sourceText: string;
  translatedText: string;
  timestamp: Date;
}
