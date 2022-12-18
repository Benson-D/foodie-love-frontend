import React, { useState } from 'react';
import { CreateRecipe } from '../interface';
import FoodieLoveApi from '../api/FoodieLoveApi';
import GeneralInfo from '../components/formSteps/GeneralInfo';
import AddIngredients from '../components/formSteps/AddIngredients';
import AddInstructions from '../components/formSteps/AddInstructions';
import FormReview from '../components/formSteps/FormReview';
import { Formik, Form, FormikHelpers, FormikState } from 'formik'; 
import { initialValues } from '../data/foodieFormModel';
import { formField } from '../data/foodieFormField';
import FoodieFormContext from '../context/FoodieFormContext';
import FoodieValidationSchema from '../data/validateSchema';
import { Box, Stepper, Step, StepLabel, Button } from "@mui/material";
import FormLayout from '../layout/FormLayout';
import useStep from '../hooks/useStep';
import useTitle from '../hooks/useTitle';

const formLabels = ['General Info', 'Ingredients', 'Steps', 'Review'];

/** 
 * Renders a multi step form to add a new Recipe
 * 
 * Props: none
 * State: 
 *   formImage: File | string 
 * 
 * Routes -> RecipeForm
 */
function RecipeForm() {
    const [formImage, setFormImage] = useState<string | File>('');
    const [step, helpers] = useStep(4);
    useTitle('Create Recipe');

    const {
        canGoToPreviousStep,
        canGoToNextStep,
        previousStep,
        nextStep
    } = helpers;

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

        if (!canGoToNextStep) {
            console.log(values);
            handleSubmission(values);
        } else {
            nextStep();
            actions.setTouched({});
            actions.setSubmitting(false);
        }
    };

    return (
        <FormLayout title="Create a Recipe">
            <>
                <Stepper activeStep={step} sx={{pt: 4, pb: 5}}>
                    {formLabels.map((label: string) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                <FoodieFormContext.Provider value={{step}}>
                    <Formik 
                        initialValues={initialValues}
                        validationSchema={FoodieValidationSchema[step]}
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
                                <Box sx={{
                                    display: 'flex', 
                                    justifyContent: 'flex-end'}}>
                                    {canGoToPreviousStep && (
                                        <Button 
                                            sx={{mt: 3, ml:1}} 
                                            onClick={previousStep}>
                                            Back
                                        </Button>
                                    )}
                                        <Button 
                                            disabled={isSubmitting}
                                            sx={{mt: 3, ml: 1}} 
                                            type="submit"
                                            variant="contained">
                                            {!canGoToNextStep ? 'Submit' : 'Next'}
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