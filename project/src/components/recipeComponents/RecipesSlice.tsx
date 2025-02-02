// src/recipesSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AsyncThunkConfig } from '../../types/types';

// Define the Recipe type
interface Recipe {
    id: number;
    title: string;
    description: string;
    products: string[];
    ingredients: string[];
    instructions: string[];
    authorId: string;
}

// Define the initial state type
interface RecipesState {
    recipes: Recipe[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

// Async thunk to fetch recipes from the API
export const fetchRecipes = createAsyncThunk<Recipe[], void, AsyncThunkConfig>('recipes/fetchRecipes', async () => {
    const response = await axios.get('http://localhost:3000/api/recipes'); // Adjust the URL to your API endpoint
    return response.data;
});

// Create a slice for recipes
const RecipesSlice = createSlice({
    name: 'recipes',
    initialState: {
        recipes: [],
        status: 'idle',
        error: null,
    } as RecipesState,
    reducers: {
        addRecipe: (state, action: PayloadAction<Recipe>) => {
            state.recipes.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecipes.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchRecipes.fulfilled, (state, action: PayloadAction<Recipe[]>) => {
                state.status = 'succeeded';
                state.recipes = action.payload;
            })
            .addCase(fetchRecipes.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch recipes';
            });
    },
});
export const selectRecipes = (state: { recipes: RecipesState }) => state.recipes.recipes;
export const { addRecipe } = RecipesSlice.actions;
export default RecipesSlice.reducer;
