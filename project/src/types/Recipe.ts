export type Recipe = { 
    id: number;
    title: string;
    description: string;
    authorId: number;
    ingredients: string[];
    instructions: string;
}
export type RecipeFormData ={
    title: string;
    description: string;
    ingredients: string[];
    instructions: string;
}