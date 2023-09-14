import { useEffect, useState, ChangeEvent } from 'react';
import FoodieLoveApi from '../api/FoodieLoveApi'; 
import { GetRecipes } from '../interface';
import { Box, Grid } from '@mui/material';
import useTitle from '../hooks/useTitle';
import useDebounce from '../hooks/useDebounce';
import ListCard from '../components/ListCard';
import SearchBar from '../components/SearchBar';
import MainModal from '../components/MainModal';
import RecipeForm from './RecipeForm';

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

        if (e.target.value.trim() !== '') {
            setSkip(0);
        }
	};

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const { offsetHeight, scrollTop, scrollHeight } = e.currentTarget;

        if (offsetHeight + scrollTop >= scrollHeight - 5) {
            setSkip(recipes.length);
        }
    }

    useEffect(
        function fetchRecipes() {
            async function getAllRecipes() {

                try {
                    const data = await FoodieLoveApi.getRecipes({ 
                        recipeName: debounceValue, 
                        skip: skip 
                    });

                    if (skip === 0) {
                        setRecipes(data);
                    } else {
                        setRecipes(recipes => [...recipes, ...data]);
                    }

                } catch (err) {
                    console.error(err);
                }; 
            }
            getAllRecipes();
        },[debounceValue, skip]
    );

    return (
        <Box minHeight="100vh">
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: { xs: 'column-reverse', sm: "row" }, px: 5, py: 2}}>
                <MainModal>
                    <RecipeForm />
                </MainModal>
                <Box sx={{ marginBottom: { xs: 2, sm: 0 }, width: { xs: '100%', sm: 'auto' }}}>
                    <SearchBar handleSearch={handleSearch} />
                </Box>
            </Box>
            <Box sx={{ height: 'calc(100vh - 100px)', overflowY: 'auto'}} 
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

