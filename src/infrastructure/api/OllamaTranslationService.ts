import { Ollama } from 'ollama/browser';
import type { ITranslationService } from '../../domain/interfaces/ITranslationService';
import type { Language } from '../../domain/entities/Translation';

export class OllamaTranslationService implements ITranslationService {
  private ollama: Ollama;
  private model = 'translategemma:4b';

  constructor() {
    this.ollama = new Ollama({ host: 'http://localhost:11434' });
  }

  async translate(text: string, sourceLanguage: Language, targetLanguage: Language): Promise<string> {
    if (!text.trim()) {
      return '';
    }

    const prompt = this.createTranslationPrompt(text, sourceLanguage, targetLanguage);

    try {
      const response = await this.ollama.generate({
        model: this.model,
        prompt: prompt,
        stream: false,
      });

      return this.extractTranslation(response.response);
    } catch (error) {
      console.error('Translation error:', error);
      throw new Error('Failed to translate text. Please ensure Ollama is running with gemma:4b model.');
    }
  }

  private createTranslationPrompt(text: string, sourceLanguage: Language, targetLanguage: Language): string {
    return `Translate the following text from ${sourceLanguage} to ${targetLanguage}. Return only the translated text without any explanations or additional content.

Source text: ${text}

Translation:`;
  }

  private extractTranslation(response: string): string {
    // Remove any leading/trailing whitespace
    return response.trim();
  }
}
