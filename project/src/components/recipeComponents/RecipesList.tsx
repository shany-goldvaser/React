import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from "./Store"
import { useContext, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Drawer, Toolbar, Typography, List, ListItem, ListItemText, ListItemButton, Button } from '@mui/material';
import { fetchRecipes } from './RecipesSlice';
import { reducerLoginContext } from '../HomePage';
export default () => {
    const dispatch = useDispatch<AppDispatch>();
    const recipes = useSelector((state: RootState) => state.recipes.recipes);
    const recipeStatus = useSelector((state: RootState) => state.recipes.status);
    const error = useSelector((state: RootState) => state.recipes.error);
    const [user,] = useContext(reducerLoginContext);
    console.log(user);
    const isUserLoggedIn = user.Id !== 0 && user.Id !== undefined && user.Id !== null;
    useEffect(() => {
        if (recipeStatus === 'idle') {
            dispatch(fetchRecipes());
        }
    }, [recipeStatus, dispatch]);

    if (recipeStatus === 'loading') {
        return <div> Loading... </div>;
    }

    if (recipeStatus === 'failed') {
        return <div> Error: {error}</div>;
    }
    return (<>
    <Drawer variant="permanent" anchor="right" sx={{ height: 'calc(100% - 64px)', top: 200 }}>
        <Toolbar sx={{ backgroundColor: 'secondary.main', color: 'white' }}>
            <Typography variant="h6" component="span" sx={{ color: 'white', textDecoration: 'none' }}>
                <Link to={'/recipe'} style={{ color: 'inherit', textDecoration: 'none' }}> Recipes</Link>
            </Typography>
        </Toolbar>
            <List>
                {recipes.map((recipe) => (
                    <ListItem key={recipe.id}>
                        <ListItemButton component={Link} to={`/recipe/${recipe.id}`}>
                            <ListItemText color="secondary" primary={recipe.title} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            {isUserLoggedIn && (
                <Button
                    variant="contained"
                    color="secondary"
                    component={Link}
                    to="/recipe/add-recipe"
                    sx={{ margin: 2 }}>
                    Add Recipe
                </Button>
            )}
        </Drawer>
        <Outlet />
    </>)
};
