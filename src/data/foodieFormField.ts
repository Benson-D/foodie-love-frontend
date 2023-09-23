interface FormProperties {
  name: string;
  label: string;
  errorMsg?: string;
  invalidMsg?: string;
}

interface FormField {
  recipeName: FormProperties;
  mealType: FormProperties;
  prepTime: FormProperties;
  cookingTime: FormProperties;
}

const formField: FormField = {
  recipeName: {
    name: "recipeName",
    label: "Recipe Name*",
    errorMsg: "Recipe name is required",
  },
  mealType: {
    name: "mealType",
    label: "Meal Type",
  },
  prepTime: {
    name: "prepTime",
    label: "Prep Time",
  },
  cookingTime: {
    name: "cookingTime",
    label: "Cooking Time*",
    errorMsg: "A number of minutes is required",
    invalidMsg: "Must be at least be 5 minutes",
  },
};

export { formField };
