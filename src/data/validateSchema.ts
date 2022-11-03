import * as Yup from 'yup';
import { formField } from './foodieFormField';

//Foodie Validation Schema for Form
const FoodieValidationSchema = [
    Yup.object().shape({
        recipeName: Yup.string()
            .required(formField.recipeName.errorMsg),
        mealType: Yup.string(),
        prepTime: Yup.number(),
        cookingTime: Yup.number()
            .positive(formField.cookingTime.invalidMsg)
            .min(5)
            .required(formField.cookingTime.errorMsg)
    }),
    Yup.object().shape({
        ingredientList: Yup.array().of(
            Yup.object().shape({
                amount: Yup.string().required('An amount is required'),
                measurement: Yup.string().notRequired(),
                ingredient: Yup.string()
                               .required('An ingredient is required')
            })
        ).min(1)
    })
];

export default FoodieValidationSchema;