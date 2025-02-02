import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addRecipe } from './RecipesSlice';
import { useContext } from 'react';
import { reducerLoginContext } from '../HomePage';
import { useNavigate } from 'react-router-dom';
interface RecipeFormData {
    title: string;
    description: string;
    ingredients: string[];
    instructions: string;
}
const schema = yup.object().shape({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Description is required'),
    ingredients: yup.array().of(yup.string().required('Ingredient is required')).min(1, 'At least one ingredient is required'),
    instructions: yup.string().required('Instructions are required'),
});
const AddRecipeForm = () => {

  const { control, handleSubmit: formHandleSubmit, formState: { errors } } = useForm<RecipeFormData>({
        resolver: yupResolver(schema),
    });
    const navigate = useNavigate();
    const [user,] = useContext(reducerLoginContext);

    const onSubmit = async (data: RecipeFormData) => {
        const dispatch = useDispatch();

        try {
            const response = await axios.post('http://localhost:3000/api/recipes', data, {
                headers: {
                    'Content-Type': 'application/json',
                    'user-id': user.Id
                }
            });
            dispatch(addRecipe(response.data.recipe));
            navigate(-1);
        } catch (error) {
            console.error('Failed to add recipe:', error);
        }
    };
    return (

        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom color='secondary'>
                Add Recipe:
            </Typography>
            <form onSubmit={formHandleSubmit(onSubmit)}>
                <Controller
                    name="title"

                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <TextField
                            color='secondary'
                            {...field}
                            label="Title"
                            variant="outlined"
                            fullWidth
                            error={!!errors.title}
                            helperText={errors.title ? errors.title.message : ''}
                            margin="normal"
                        />
                    )}
                />
                <Controller
                    name="description"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <TextField
                            color='secondary'
                            {...field}
                            label="Description"
                            variant="outlined"
                            fullWidth
                            error={!!errors.description}
                            helperText={errors.description ? errors.description.message : ''}
                            margin="normal"
                        />
                    )}
                />
                <Controller
                    name="ingredients"
                    control={control}
                    defaultValue={['']}
                    render={({ field: { onChange, value = [] } }) => (
                        <Box>
                            {value?.map((ingredient, index) => (
                                <TextField
                                    color='secondary'
                                    key={index}
                                    label={`Ingredient ${index + 1}`}
                                    variant="outlined"
                                    fullWidth
                                    value={ingredient}
                                    onChange={(e) => {
                                        const newIngredients = [...value];
                                        newIngredients[index] = e.target.value;
                                        onChange(newIngredients);
                                    }}
                                    margin="normal"
                                    error={!!errors.ingredients?.[index]}
                                    helperText={errors.ingredients?.[index] ? errors.ingredients[index].message : ''}
                                />
                            ))}
                            <Button
                                variant="outlined"
                                color='secondary'
                                onClick={() => onChange([...value, ''])}
                            >
                                Add Ingredient
                            </Button>
                        </Box>
                    )}
                />
                <Controller
                    name="instructions"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <TextField
                            color='secondary'
                            {...field}
                            label="Instructions"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={4}
                            error={!!errors.instructions}
                            helperText={errors.instructions ? errors.instructions.message : ''}
                            margin="normal"
                        />
                    )}
                />
                <Button type="submit" variant="contained" color="secondary">
                    Submit
                </Button>
            </form>
        </Container>
    );
};

export default AddRecipeForm;
