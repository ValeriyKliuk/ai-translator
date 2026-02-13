import { useContext } from 'react';
import { StoreContext } from './StoreContext';
import type { ITranslationStore } from '../stores/TranslationStore';

export const useStore = (): ITranslationStore => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return store;
};
