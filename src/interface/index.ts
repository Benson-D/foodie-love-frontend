/**
 *  A full list of each recipe, 
 * data to expect in an individual recipe
 */
interface GetRecipes {
    id: number;
    recipeName: string; 
    prepTime: string;
    cookingTime: string;  
    mealType: string; 
    recipeImage: string | null;
};

/**
 * Each Ingredient List item, 
 * retrieved from a get request
 */
interface IngredientList {
    amount: string,
    ingredientId: number;
    ingredient: string | null;
    measurementId: number | null;
    measurement: string | null;
};

/**
 * A single recipe items, 
 * retrieved from a get request
 */
interface GetRecipe {
    id: number; 
    recipeName: string;
    prepTime: string | null;
    cookingTime: string; 
    recipeImage: string | null; 
    mealType: string | null; 
    intructions: string | null;
    ingredients: IngredientList[];
};

/**
 * Optional parameters in a get request search
 */
interface SearchRecipes {
    recipeName?: string;
    cookingTime?: number;
    mealType?: string; 
    skip: number;
};

/**
 * A single list container that is associated with a recipe,
 * Generally used within a form submission 
 * 
 */
 interface IngredientItems {
    amount: string;
    measurement?: string; 
    ingredient: string;
};

/**
 * General data input from recipe form when submitted 
 */
interface CreateRecipe  {
    recipeName: string;
    mealType?: string; 
    prepTime?: number;
    cookingTime: number;  
    instructions: InstructionItems[];
    ingredientList: IngredientItems[]; 
    recipeImage?: string;
};

/**
 * The input returned from each created ingredient list
 */
interface CreatedIngredientList {
    recipeId: number;
    ingredientId: string;
    measurementId: string | null;
    amount: string;
};

/**
 * The return of the created recipe
 */
interface CreatedRecipe {
    id: number; 
    ingredients: CreatedIngredientList;
}

/**
 * A single item of each instruction
 */
interface InstructionItems {
    instruction?: string;
}

/**
 * A generic type of props passed in each step
 */
interface FormStepProps {
    index: number;
    removeItem: (index: number) => void;
}

export type {
    GetRecipes,
    GetRecipe,
    SearchRecipes,
    CreateRecipe,
    CreatedRecipe,
    IngredientItems,
    InstructionItems,
    FormStepProps
}