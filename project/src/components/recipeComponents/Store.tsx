// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import recipesReducer from './RecipesSlice';

const Store = configureStore({
    reducer: {
        recipes: recipesReducer,
    },
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;

export default Store;
