import { CreateRecipe } from '../interface';

const starterList = Array(5).fill({
    amount: '',
    measurement: '',
    ingredient: ''
});

//Initial Values of Foodie Form 
const initialValues: CreateRecipe = {
    recipeName: '',
    mealType: '',
    prepTime: 0,
    cookingTime: 0,
    ingredientList: starterList,
    instructions: [
        { instruction: '' }
    ]
}

//Measurement list for Foodie Form of ingredients
const measurements = [
    {
        value: '',
        label: 'none',
    },
    {
        value: 'tsp',
        label: 'tsp'
    },
    {
        value: 'tbsp',
        label: 'tbsp'
    },
    {
        value: 'cup',
        label: 'cup'
    },
    {
        value: 'oz',
        label: 'oz'
    },
    {
        value: 'pint',
        label: 'pint'
    },
    {
        value: 'quart',
        label: 'quart'
    },
    {
        value: 'gallon',
        label: 'gallon'
    },
    {
        value: 'small',
        label: 'small'
    },
    {
        value: 'medium',
        label: 'medium'
    },
    {
        value: 'large',
        label: 'large'
    },
]

export  {
    initialValues,
    measurements
};