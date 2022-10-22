import * as Yup from 'yup';
import { formField } from "./foodieFormModel";

const FoodieValidationSchema = [
    Yup.object().shape({
        recipeName: Yup.string()
            .required(formField.recipeName.errorMsg),
        mealType: Yup.string(),
        prepTime: Yup.number(),
        cookingTime: Yup.number()
            .positive(formField.cookingTime.invalidMsg)
            .moreThan(4)
            .required(formField.cookingTime.errorMsg),
        
    }),
    Yup.object().shape({
        ingredientList: Yup.array().of(
            Yup.object().shape({
                amount: Yup.string().required('An amount is required'),
                ingredient: Yup.string().required('An ingredient is requred')
            })
        )
    })
];

export default FoodieValidationSchema;