import { Typography, Card, CardContent, List, ListItem } from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { selectRecipes } from "./RecipesSlice";
const RecipeDetials = () => {
    const { id } = useParams();
    const recipes = useSelector(selectRecipes);
    const recipe = recipes.find((r) => r.id === parseInt(id||"0"));
    console.log(recipe);
    
    if (!recipe) {
        return <Typography variant="h6"> Recipe not found </Typography>;
    }
    return (
        <>
        <Card variant="outlined">
            <CardContent>
                <Typography color="secondary" variant="h4">{recipe.title} </Typography>
                <Typography variant="subtitle1">{recipe.description}</Typography>
                <Typography color="secondary" variant="h6">Ingredients:</Typography>
                <List>
                    {recipe.ingredients.map((ingredient, index) => (
                        <ListItem key={index}>{ingredient}</ListItem>
                    ))}
                </List>
                <Typography  color="secondary" variant="h6">Instructions:</Typography>
                <Typography>{recipe.instructions}</Typography>
            </CardContent>
        </Card>
        </>
    );
};

export default RecipeDetials;