import type { ReactNode } from 'react';
import { StoreContext } from './StoreContext';
import type { ITranslationStore } from '../stores/TranslationStore';

interface StoreProviderProps {
  store: ITranslationStore;
  children: ReactNode;
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ store, children }) => {
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};
