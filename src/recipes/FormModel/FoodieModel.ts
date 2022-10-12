
interface FormProperties {
    name: string;
    label: string;
    errorMsg?: string
}

interface FormField {
    recipeName: FormProperties;
    mealType: FormProperties;
    prepTime: FormProperties;
    cookingTime: FormProperties;
}


const formField: FormField = {
    recipeName: {
        name: 'recipeName',
        label: 'Recipe Name',
        errorMsg: 'Recipe name is required'
    },
    mealType: {
        name: 'mealType',
        label: 'Meal Type'
    },
    prepTime: {
        name: 'prepTime',
        label: 'Prep Time'
    },
    cookingTime: {
        name: 'cookingTime',
        label: 'Cooking Time',
        errorMsg: 'A number of minutes is required'
    }
};


const starterList = Array(5).fill({
    amount: '',
    measurement: '',
    ingredient: ''
});

const initialValues = {
    recipeName: '',
    mealType: '',
    prepTime: '0',
    cookingTime: '0',
    ingredientList: starterList,
    instructions: [
        { instruction: '' }
    ]
}

export  {
    initialValues,
    formField,
};