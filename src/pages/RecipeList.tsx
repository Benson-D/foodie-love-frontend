import { useEffect, useState } from 'react';
import FoodieLoveApi from '../api/FoodieLoveApi'; 
import { GetRecipes } from '../interface';
import { Paper, InputBase, IconButton, Divider, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ListCard from '../components/ListCard';
import useTitle from '../hooks/useTitle';

function SearchBar() {
    return (
        <Paper sx={{display: 'flex', alignItems: 'center', width: 400, ml: 'auto', mr: '40px', mt: '20px'}}>
            <IconButton sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <InputBase sx={{ ml: 1, flex: 1 }}
                       placeholder="Search Recipes"
                       inputProps={{ 'aria-label': 'search google maps' }} />
        </Paper>
    );
}

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
        <>
            <SearchBar />
            <Grid container spacing={2} sx={{ padding: 5 }}>
                {recipes.map((recipe, idx) => (
                <ListCard key={idx} recipe={recipe} />
                ))}
            </Grid>
        </>
    );
};

export default RecipeList;

