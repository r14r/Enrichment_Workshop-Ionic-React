import React, { useEffect, useContext, useState, createContext, Dispatch, SetStateAction, useCallback } from 'react';
import teaDatabase from '../services/TeaCategoriesDatabase';
import { TeaCategory } from '../models/TeaCategory';

type Props = { children: React.ReactNode };

interface TeaState {
  isReady: boolean;
  error: string;
  categories: TeaCategory[];
}

const initialState: TeaState = {
  isReady: false,
  error: undefined,
  categories: undefined
};

export const TeaContext = createContext<[TeaState, Dispatch<SetStateAction<TeaState>>]>([
  initialState,
  () => initialState
]);

const TeaProvider = ({ children }: Props) => {
  const [state, setState] = useState<TeaState>(initialState);

  const initializeDb = useCallback(async () => {
    try {
      await teaDatabase.ready();
      const categories = await teaDatabase.getAll();
      setState((s) => ({ ...s, categories, isReady: true, error: undefined }));
    } catch (error) {
      setState((s) => ({ ...s, error: error.toString() }));
    }
  }, []);

  useEffect(() => {
    initializeDb();
  }, [initializeDb]);

  return <TeaContext.Provider value={[state, setState]}>{children}</TeaContext.Provider>;
};
export default TeaProvider;

export const useTeaContext = () => {
  const [state, setState] = useContext(TeaContext);

  const getTeaCategory = (id: number): TeaCategory => {
    const category = state.categories.find((cat) => cat.id === id);
    try {
      if (!category) throw new Error('Tea category cannot be found.');
      return category;
    } catch (error) {
      setState((s) => ({ ...s, error: error.toString() }));
    }
  };

  const saveTeaCategory = async (category: TeaCategory): Promise<void> => {
    try {
      if (!state.isReady) throw new Error('Database is not ready for consumption.');
      const persistedCategory = await teaDatabase.save(category);
      let categories = state.categories.filter((cat) => cat.id !== persistedCategory.id);
      categories.push(persistedCategory);
      categories.sort((a, b) => (a.name > b.name ? 1 : -1));
      setState((s) => ({ ...s, categories, error: undefined }));
    } catch (error) {
      setState((s) => ({ ...s, error: error.toString() }));
    }
  };

  const deleteTeaCategory = async (id: number): Promise<void> => {
    try {
      if (!state.isReady) throw new Error('Database is not ready for consumption.');
      await teaDatabase.delete(id);
      const categories = state.categories.filter((cat) => cat.id !== id);
      setState((s) => ({ ...s, categories, error: undefined }));
    } catch (error) {
      setState((s) => ({ ...s, error: error.toString() }));
    }
  };

  return {
    isReady: state.isReady,
    error: state.error,
    categories: state.categories,
    deleteTeaCategory,
    getTeaCategory,
    saveTeaCategory
  };
};
