import { useEffect, useState } from 'react';
import FoodieLoveApi from '../api/FoodieLoveApi'; 
import { GetRecipes } from '../interface';
import { Grid } from '@mui/material';
import ListCard from '../components/ListCard';
import useTitle from '../hooks/useTitle';

/**
 * Displays a list of recipes created 
 * 
 * Props: none
 * State: 
 *     recipes: [{recipe1}, {recipe2}, etc...]
 * 
 * Routes -> RecipeList 
 */
function RecipeList() {
    const [recipes, setRecipes] = useState<GetRecipes[]>([]);
    useTitle('Recipe Items');

    useEffect(
        function fetchRecipes() {
            async function getAllRecipes() {
                try {
                    const recipes = await FoodieLoveApi.getRecipes();
                    setRecipes(recipes);
                } catch (err) {
                    console.error(err);
                }; 
            }
            getAllRecipes();
        },[]
    );

    return (
        <Grid container spacing={2} sx={{ padding: 5 }}>
            {recipes.map((recipe, idx) => (
               <ListCard key={idx} recipe={recipe} />
            ))}
        </Grid>
    );
};

export default RecipeList;

