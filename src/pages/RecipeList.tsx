import { useEffect, useState } from 'react';
import FoodieLoveApi from '../api/FoodieLoveApi'; 
import { GetRecipes } from "../interface";

/**
 * Displays a list of recipes created 
 * 
 * Props: none
 * State: 
 *     recipes: [{recipe1}, {recipe2}, etc...]
 * 
 * @returns 
 */
function RecipeList() {
    const [ recipes, setRecipes ] = useState<GetRecipes[]>([]);

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

    console.log(recipes, 'recipe values');

    return (<section>Recipes</section>);
};

export default RecipeList;

