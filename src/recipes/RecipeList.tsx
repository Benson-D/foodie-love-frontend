import { useEffect, useState } from 'react';
import FoodieLoveApi from '../api/FoodieLoveApi'; 
import { GetRecipes } from "../api/foodieInterfaceApi";

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

