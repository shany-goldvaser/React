import { createBrowserRouter } from "react-router";
import RecipesList from "./components/recipeComponents/RecipesList"
import AppLayout from "./AppLayout";
import Home from "./components/Home";
import RecipeDetials from "./components/recipeComponents/RecipeDetials";
import AddRecipeForm from "./components/recipeComponents/AddRecipeForm";
export const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        children: [
            {
                path: 'recipe',
                element: <RecipesList />,
                children: [
                    {
                        path: ':id',
                        element: <RecipeDetials />
                        
                    },{
                        path: 'add-recipe',
                        element: <AddRecipeForm/>
                    }
                ]
            },
           { 
            path:'home',
            element:<Home/>
        }
        ]
    }
])