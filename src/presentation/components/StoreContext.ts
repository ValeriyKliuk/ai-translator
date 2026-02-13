import { createContext } from 'react';
import type { ITranslationStore } from '../stores/TranslationStore';

export const StoreContext = createContext<ITranslationStore | null>(null);
