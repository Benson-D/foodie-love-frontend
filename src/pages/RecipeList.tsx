import { useEffect, useState, ChangeEvent } from 'react';
import FoodieLoveApi from '../api/FoodieLoveApi'; 
import { GetRecipes } from '../interface';
import { Box, Grid } from '@mui/material';
import ListCard from '../components/ListCard';
import useTitle from '../hooks/useTitle';
import SearchBar from '../components/SearchBar';
import useDebounce from '../hooks/useDebounce';

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
    const [searchTerm, setSearchTerm] = useState<string>();
    const [skip, setSkip] = useState<number>(0);
    const debounceValue = useDebounce(searchTerm);

    useTitle('Recipe Items');

    /** Handles search event handler, updates state */
	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value.trim());
	};

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const { offsetHeight, scrollTop, scrollHeight } = e.currentTarget;

        if (offsetHeight + scrollTop >= scrollHeight) {
            setSkip(recipes.length);
        }
    }

    useEffect(
        function fetchRecipes() {
            async function getAllRecipes() {
                try {

                    const data = await FoodieLoveApi.getRecipes({ recipeName: debounceValue, skip: skip });
                    setRecipes([...recipes, ...data]);
                } catch (err) {
                    console.error(err);
                }; 
            }
            getAllRecipes();
        },[debounceValue, skip]
    );

    return (
        <Box minHeight="100vh">
            <Box sx={{ px: 5, pt: 2, mb: 2}}>
                <Box sx={{ ml: 'auto' }}>
                    <SearchBar handleSearch={handleSearch} />
                </Box>
            </Box>
            <Box sx={{ height: 'calc(100vh - 100px)', overflowY: 'scroll'}} 
                 onScroll={handleScroll}>
                <Grid container spacing={2} sx={{ padding: 5 }} >
                    {recipes.map((recipe, idx) => (
                    <ListCard key={idx} recipe={recipe} />
                    ))}
                </Grid>

            </Box>
        </Box>
    );
};

export default RecipeList;

