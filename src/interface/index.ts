interface AuthUser {
  user: {
    id: string;
    username: string | null;
    email: string;
    firstName: string;
    lastName: string;
    imageUrl: string | null;
    role: string;
  };
  token: string;
}

/**
 *  A full list of each recipe,
 * data to expect in an individual recipe
 */
interface GetRecipes {
  id: string;
  name: string;
  prepTime: string | null;
  cookingTime: string;
  mealType: string | null;
  recipeImage: string | null;
  user: {
    userId: string;
  }[];
}

/**
 * Each Ingredient List item,
 * retrieved from a get request
 */
interface IngredientList {
  amount: string;
  ingredientId: string;
  ingredient: {
    name: string;
  };
  measurementUnitId: string | null;
  measurementUnit: {
    description: string;
  } | null;
}

/**
 * A single recipe items,
 * retrieved from a get request
 */
interface GetRecipe {
  recipe: {
    id: number;
    name: string;
    prepTime: string | null;
    cookingTime: string;
    recipeImage: string | null;
    mealType: string | null;
    instructions: { instruction: string }[];
    ingredients: IngredientList[];
  };
}

/**
 * Optional parameters in a get request search
 */
interface SearchRecipes {
  recipeName?: string;
  cookingTime?: number;
  mealType?: string;
  skip: number;
}

/**
 * General data input from recipe form when submitted
 */
interface CreateRecipe {
  recipeName: string;
  mealType?: string;
  prepTime?: number;
  cookingTime: number;
  instructions: InstructionItems[];
  ingredientList: IngredientItems[];
  recipeImage?: string;
}

/**
 * The input returned from each created ingredient list
 */
interface CreatedIngredientList {
  recipeId: number;
  ingredientId: string;
  measurementId: string | null;
  amount: string;
}

/**
 * The return of the created recipe
 */
interface CreatedRecipe {
  id: number;
  ingredients: CreatedIngredientList;
}

interface AddFavoriteRecipeResponse {
  added: {
    userId: string;
    recipeId: string;
  };
}

interface RemoveFavoriteRecipeResponse {
  deleted: {
    userId: string;
    recipeId: string;
  };
}

/**
 * A single list container that is associated with a recipe,
 * Generally used within a form submission
 *
 */
interface IngredientItems {
  amount: string;
  measurement?: string;
  ingredient: string;
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
  removeItemCb: (index: number) => void;
}

export type {
  AuthUser,
  GetRecipes,
  GetRecipe,
  SearchRecipes,
  CreateRecipe,
  CreatedRecipe,
  AddFavoriteRecipeResponse,
  RemoveFavoriteRecipeResponse,
  IngredientItems,
  InstructionItems,
  FormStepProps,
};
