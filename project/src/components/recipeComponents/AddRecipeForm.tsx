import { useContext, useEffect } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { RecipeFormData, Recipe } from '../../types/Recipe';
import { ReducerLoginContext } from '../HomePage';
import { addRecipe } from './RecipesSlice';
const schema = yup.object().shape({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Description is required'),
    instructions: yup.string().required('Instructions are required'),
    ingredients: yup.array().of(yup.string().required('Ingredient is required')).min(1, 'At least one ingredient is required').required('Ingredients are required'),
});
const AddRecipeForm = () => {
    const { control, handleSubmit, formState: { errors } } = useForm<RecipeFormData>({
        resolver: yupResolver(schema),
    });
    const navigate = useNavigate();
    const [user] = useContext(ReducerLoginContext);
    const dispatch = useDispatch();
    useEffect(() => {
        if (!user) {
            navigate('/recipes');
        }
    }, [user, navigate]);
    const onSubmit: SubmitHandler<RecipeFormData> = async (data) => {
        const recipeData: Recipe = { authorId: user.Id, ...data, id: 0 };
        try {
            const response = await axios.post('http://localhost:3000/api/recipes', recipeData, {
                headers: { 'Content-Type': 'application/json', 'user-id': user.Id },
            });
            dispatch(addRecipe(response.data.recipe));
            navigate(-1);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 403) {
                alert('User is not logged!!');
                navigate('/recipes');
            }
        }
    };
    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom color='secondary'>Add Recipe:</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                {['title', 'description', 'instructions'].map((fieldName) => (
                    <Controller
                        key={fieldName} name={fieldName as keyof RecipeFormData} control={control} defaultValue=""
                        render={({ field }) => (
                            <TextField
                                color='secondary' {...field} label={fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} variant="outlined" fullWidth error={!!errors[fieldName as keyof RecipeFormData]}
                                helperText={errors[fieldName as keyof RecipeFormData]?.message} margin="normal" multiline={fieldName === 'instructions'} rows={fieldName === 'instructions' ? 4 : undefined}
                            />
                        )}
                    />
                ))}
                <Controller
                    name="ingredients" control={control} defaultValue={['']}
                    render={({ field: { onChange, value = [] } }) => (
                        <Box>
                            {value.map((ingredient, index) => (
                                <TextField
                                    key={index}
                                    color='secondary' label={`Ingredient ${index + 1}`} variant="outlined" fullWidth value={ingredient}
                                    onChange={(e) => {
                                        const newIngredients = [...value];
                                        newIngredients[index] = e.target.value;
                                        onChange(newIngredients);
                                    }}
                                    margin="normal" error={!!errors.ingredients?.[index]} helperText={errors.ingredients?.[index]?.message}
                                />
                            ))}
                            <Button variant="outlined" color='secondary' onClick={() => onChange([...value, ''])}>  Add Ingredient </Button>
                            {value.length > 1 && (
                                <Button
                                    variant="outlined" color='secondary'
                                    onClick={() => {
                                        const newIngredients = value.slice(0, -1);
                                        onChange(newIngredients);
                                    }}
                                    style={{ marginLeft: '10px' }}>
                                    Remove Ingredient
                                </Button>)}
                        </Box>
                    )}
                />
                <Box mt={2}>
                    <Button type="submit" variant="contained" color="secondary">Add</Button>
                </Box>
            </form>
        </Container>
    );
};
export default AddRecipeForm;