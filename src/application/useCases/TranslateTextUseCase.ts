import type { ITranslationService } from '../../domain/interfaces/ITranslationService';
import type { Language, Translation } from '../../domain/entities/Translation';

export class TranslateTextUseCase {
  private translationService: ITranslationService;

  constructor(translationService: ITranslationService) {
    this.translationService = translationService;
  }

  async execute(
    text: string,
    sourceLanguage: Language,
    targetLanguage: Language
  ): Promise<Translation> {
    const translatedText = await this.translationService.translate(
      text,
      sourceLanguage,
      targetLanguage
    );

    return {
      sourceLanguage,
      targetLanguage,
      sourceText: text,
      translatedText,
      timestamp: new Date(),
    };
  }
}
