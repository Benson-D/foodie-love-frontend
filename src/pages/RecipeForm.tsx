import React, { useState } from 'react';
import { CreateRecipe } from '../interface';
import FoodieLoveApi from '../api/FoodieLoveApi';
import GeneralInfo from '../components/formSteps/GeneralInfo';
import AddIngredients from '../components/formSteps/AddIngredients';
import AddInstructions from '../components/formSteps/AddInstructions';
import FormReview from '../components/formSteps/FormReview';
import { Formik, Form, FormikHelpers, FormikState } from 'formik'; 
import { initialValues } from '../data/foodieFormModel';
import { formField } from '../data/foodieFormField'
import FoodieFormContext from '../context/FoodieFormContext';
import FoodieValidationSchema from '../data/validateSchema';
import { Box, Stepper, Step, StepLabel, Button } from "@mui/material";
import FormLayout from '../layout/FormLayout';

const formLabels = ['General Info', 'Ingredients', 'Steps', 'Review Recipe'];

/** 
 * Renders a multi step form to add a new Recipe
 * 
 * Props: none
 * State: 
 *   formImage: File | string 
 *   formSteps: number
 * 
 * Routes -> RecipeForm
 */
function RecipeForm() {
    const [formImage, setFormImage] = useState<string | File>('');
    const [formSteps, setFormSteps] = useState<number>(0);

    const isLastStep = formSteps === formLabels.length - 1; 
    const currentValidation = FoodieValidationSchema[formSteps as number];

    /**
     * Handles the file image input of Component General Info
     * @param evt 
     */
    function handleFile(evt: React.ChangeEvent<HTMLInputElement>): void {
        const image = evt.target.files?.[0];
        if (image) setFormImage(image);
    };

    /**
     * Sends a post request to aws bucket, returns a url
     * @param formImage 
     * @returns 
     */
    async function addImage(formImage: FormData): Promise<string> {
        return await FoodieLoveApi.sendImage(formImage);
    };

    async function handleSubmission(recipeForm: CreateRecipe) {
        const sendData = new FormData(); 
        sendData.append('recipeImage', formImage);
        const recipeImage = await addImage(sendData);

        if (recipeImage) {
            recipeForm['recipeImage'] = recipeImage;
        }

        await FoodieLoveApi.createRecipe(recipeForm);
    }

    async function _submitForm(
        values: CreateRecipe, 
        actions: FormikHelpers<CreateRecipe>) {

        if (isLastStep) {
            console.log(values);
            handleSubmission(values);
        } else {
            setFormSteps(formSteps + 1);
            actions.setTouched({});
            actions.setSubmitting(false);
        }
    };

    /**
     * Switches Form part to the previous page
     */
    const handleBack = () => {
        setFormSteps(formSteps - 1);
    };

    return (
        <FormLayout title="Create a Recipe">
            <>
                <Stepper activeStep={formSteps} sx={{pt: 4, pb: 5}}>
                    {formLabels.map((label: string) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                <FoodieFormContext.Provider value={{formSteps}}>
                    <Formik 
                        initialValues={initialValues}
                        validationSchema={currentValidation}
                        onSubmit={_submitForm}>
                        {({ values, isSubmitting }: FormikState<CreateRecipe>) => (
                            <Form>
                                <GeneralInfo 
                                    formField={formField}
                                    handleFile={handleFile} /> 
                                <AddIngredients 
                                    values={values.ingredientList} />
                                <AddInstructions 
                                    values={values.instructions} />
                                <FormReview/>
                                <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                                    {formSteps !== 0 && (
                                        <Button 
                                            sx={{mt: 3, ml:1}} 
                                            onClick={handleBack}>
                                            Back
                                        </Button>
                                    )}
                                        <Button 
                                            disabled={isSubmitting}
                                            sx={{mt: 3, ml: 1}} 
                                            type="submit"
                                            variant="contained">
                                            {isLastStep ? 'Submit' : 'Next'}
                                        </Button>
                                </Box>             
                            </Form>
                        )}
                    </Formik>
                </FoodieFormContext.Provider>
            </>
        </FormLayout>
    );
};

export default RecipeForm; 