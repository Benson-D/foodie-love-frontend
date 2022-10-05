interface GeneralRecipeData {
    recipeName: string; 
    prepTime: number | null;
    cookingTime: number;  
    mealType: string | null; 
};

// Get Request 

interface GetRecipes extends GeneralRecipeData {
    id: number;
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

//Create Request

interface CreateIngredients {
    ingredient: string;
    measurement?: string; 
    amount: string;
};

interface CreateRecipe extends GeneralRecipeData {
    instructions: string | null; 
    ingredientList: CreateIngredients[];
    recipeImage?: File | null;
};

interface CreateIngredientList {
    recipeId: number;
    ingredientId: number;
    measurementId: number | null;
    amount: string;
};

interface CreateRecipeIngredients {
    id: number; 
    ingredients: CreateIngredientList[];
};

// General Axios Method  
interface FoodieRequest {
    url: string; 
    method: string; 
    data?: CreateRecipeIngredients | SearchRecipes;
};

interface FoodieAxiosRequest {
    recipes?: GetRecipes[];
    recipe?: GetSingleRecipe | CreateRecipeIngredients;
};


export type {
    GetRecipes, 
    GetSingleRecipe,
    GeneralRecipeData,
    SearchRecipes,
    CreateRecipeIngredients,
    CreateRecipe,
    FoodieRequest,
    FoodieAxiosRequest
};