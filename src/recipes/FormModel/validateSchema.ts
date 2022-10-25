import * as Yup from 'yup';
import { formField } from "./foodieFormField";

const FoodieValidationSchema = [
    Yup.object().shape({
        recipeName: Yup.string()
            .required(formField.recipeName.errorMsg),
        mealType: Yup.string(),
        prepTime: Yup.number(),
        cookingTime: Yup.number()
            .positive(formField.cookingTime.invalidMsg)
            .min(5)
            .required(formField.cookingTime.errorMsg),
        
    }),
    Yup.object().shape({
        ingredientList: Yup.array().of(
            Yup.object().shape({
                amount: Yup.string().required('An amount is required'),
                measurement: Yup.string(),
                ingredient: Yup.string().required('An ingredient is required')
            })
        )
    })
];

export default FoodieValidationSchema;