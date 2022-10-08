/**
 * A full list of each recipe, 
 * data to expect in an individual recipe
 * @interface GetRecipes
 */
interface GetRecipes {
    id: number;
    recipeName: string; 
    prepTime: string;
    cookingTime: string;  
    mealType: string; 
    recipeImage: string | null;
};

interface IngredientList {
    amount: string,
    ingredientId: number;
    ingredient: string | null;
    measurementId: number | null;
    measurement: string | null;
};

interface GetSingleRecipe {
    id: number; 
    prepTime: string | null;
    cookingTime: string; 
    recipeImage: string | null; 
    mealType: string | null; 
    intructions: string | null;
    ingredients: IngredientList[];
};

interface SearchRecipes {
    recipeName?: string;
    cookingTime?: number;
    mealType?: string; 
};

export type {
    GetRecipes,
    SearchRecipes,
    GetSingleRecipe
}