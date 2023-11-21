/**
 * The data of an authorized user, including token
 */
interface IAuthUser {
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

interface IAllRecipes {
  recipes: {
    id: string;
    name: string;
    prepTime: string | null;
    cookingTime: string;
    mealType: string | null;
    recipeImage: string | null;
    user: {
      userId: string;
    }[];
  }[];
}

/**
 * A single recipe items,
 * retrieved from a get request
 */
interface ISingleRecipe {
  recipe: {
    id: number;
    name: string;
    prepTime: string | null;
    cookingTime: string;
    recipeImage: string | null;
    mealType: string | null;
    instructions: { instruction: string }[];
    ingredients: ISingleIngredientList[];
  };
}

/**
 * Each Ingredient List item,
 * retrieved from a get request
 */
interface ISingleIngredientList {
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
 * The return of the created recipe
 */
interface CreatedRecipe {
  id: number;
  ingredients: ICreatedIngredientList[];
}

/**
 * The input returned from each created ingredient list
 */
interface ICreatedIngredientList {
  recipeId: number;
  ingredientId: string;
  measurementId: string | null;
  amount: string;
}

interface IAddFavRecipe {
  added: IFavRecipeParams;
}

interface IRemoveFavRecipe {
  deleted: IFavRecipeParams;
}

interface IFavRecipeParams {
  userId: string;
  recipeId: string;
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
  IAuthUser,
  GetRecipes,
  IAllRecipes,
  ISingleRecipe,
  SearchRecipes,
  CreateRecipe,
  CreatedRecipe,
  IAddFavRecipe,
  IRemoveFavRecipe,
  IFavRecipeParams,
  IngredientItems,
  InstructionItems,
  FormStepProps,
};
