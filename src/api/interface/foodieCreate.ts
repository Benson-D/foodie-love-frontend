/**
 * A single list container that is associated with a recipe,
 * Generally used within a form submission 
 * 
 * @interface CreateIngredients
 */
interface CreateIngredients {
    ingredient: string;
    measurement?: string; 
    amount: string;
};

/**
 * General data input from recipe form when submitted 
 * @interface CreateRecipeForm
 */
interface CreateRecipeForm  {
    recipeName: string;
    mealType?: string; 
    prepTime?: string | number;
    cookingTime: string | number;  
    instructions?: string;
    ingredientList: CreateIngredients[] | string; 
    recipeImage?: string;
};

interface CreateIngredientList {
    recipeId: number;
    ingredientId: string;
    measurementId: string | null;
    amount: string;
};

/**
 * The response given back when a user has submitted their form
 * @interface CreateRecipeResponse
 */
interface CreateRecipeResponse {
    id: number; 
    ingredients: CreateIngredientList[];
};

export type {
    CreateRecipeForm,
    CreateIngredients,
    CreateRecipeResponse
}