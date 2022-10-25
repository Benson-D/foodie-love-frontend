import React, { useState } from "react";
import { CreateRecipe } from "../interface";
import FoodieLoveApi from "../api/FoodieLoveApi";
import GeneralInfo from "./FormParts/GeneralInfo";
import AddIngredients from "./FormParts/AddIngredients";
import AddInstructions from "./FormParts/AddInstructions";
import FormReview from "./FormParts/FormReview";
import { Formik, Form, FormikHelpers, FormikState } from "formik"; 
import { initialValues } from "./FormModel/foodieFormModel";
import { formField } from "./FormModel/foodieFormField"
import FoodieFormContext from "./FoodieFormContext";
import FoodBankIcon from '@mui/icons-material/FoodBank';
import FoodieValidationSchema from "./FormModel/validateSchema";
import { 
    Box, 
    Container, 
    Paper, 
    Stepper, 
    Step, 
    StepLabel, 
    Typography, 
    Button, 
} from "@mui/material";
import { styled } from '@mui/material/styles';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';

const formLabels = [ 'General Info', 'Ingredients', 'Steps', 'Review Recipe' ];

//#66cba9

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundColor:'#06a696',
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundColor:'#06a696',
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 3,
      border: 0,
      backgroundColor:
        theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
      borderRadius: 1,
    }
  }));


/** Renders a Recipe Form to add a new Recipe
 * 
 * State: 
 *   formData: { recipeName, cookingTime, prepTime, mealType } 
 *   formSteps: number
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
    }

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
            console.log(values, actions)
        } else {
            setFormSteps(formSteps + 1);
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
        <div>
            <Container component="section">
                <Paper 
                    variant="outlined" 
                    sx={{my: {xs: 3, md: 6 }, p: { xs: 2, md: 5}, boxShadow: 2}}>
                    <Typography component="h1" variant="h4" align="center">
                        Create a Recipe
                        <FoodBankIcon sx={{ml: 2, fontSize: '40px'}}/>
                    </Typography>

                    <Stepper 
                        connector={<ColorlibConnector />}
                        activeStep={formSteps}
                        sx={{pt: 4, pb: 5}}>
                        {formLabels.map((label: string) => (
                            <Step key={label} 
                                 sx={
                                     {".css-1u4zpwo-MuiSvgIcon-root-MuiStepIcon-root.Mui-active": {color: '#06a696'},
                                    ".css-1u4zpwo-MuiSvgIcon-root-MuiStepIcon-root.Mui-completed": {color: '#06a696'}}
                                }>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    <FoodieFormContext.Provider value={{formSteps}}>
                        <Formik 
                            initialValues={initialValues}
                            validationSchema={currentValidation}
                            onSubmit={_submitForm}>
                            {({ values, isSubmitting }: FormikState<CreateRecipe>)=> (
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
                                                variant="contained"
                                                type="submit">
                                                {formSteps === formLabels.length - 1 
                                                        ? 'Submit' 
                                                        : 'Next'}
                                            </Button>
                                    </Box>             
                                </Form>
                            )}
                           
                        </Formik>
                    </FoodieFormContext.Provider>

                </Paper>
            </Container>
        </div>
    );
};

export default RecipeForm; 