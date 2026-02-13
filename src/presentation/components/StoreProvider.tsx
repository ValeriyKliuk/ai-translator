import { createContext, useContext, type ReactNode } from 'react';
import type { ITranslationStore } from '../stores/TranslationStore';

const StoreContext = createContext<ITranslationStore | null>(null);

interface StoreProviderProps {
  store: ITranslationStore;
  children: ReactNode;
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ store, children }) => {
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

export const useStore = (): ITranslationStore => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return store;
};
