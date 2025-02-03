import { Recipe } from "./Recipe";

export type RecipesState= {
    recipes: Recipe[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}