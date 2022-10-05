import React, { useState } from "react";
import { CreateRecipe } from "../api/foodieInterfaceApi";
import FoodieLoveApi from "../api/FoodieLoveApi";
import GeneralInfo from "./formParts/GeneralInfo";
import AddIngredients from "./formParts/AddIngredients";
import AddInstructions from "./formParts/AddInstructions";
import { IngredientItems, InstructionItems } from "./Interface/formInterface";
import FoodBankIcon from '@mui/icons-material/FoodBank';
import { 
    Box, 
    Container, 
    Paper, 
    Stepper, 
    Step, 
    StepLabel, 
    Typography, 
    Button 
} from "@mui/material";

const INITIAL_DATA = {
    recipeName: '',
    cookingTime: 0,
    prepTime: 0,
    mealType: ''
};

const formLabels = [
    'Create General Info', 
    'Add Ingredients', 
    'Add Steps', 
    'Review Recipe'
];

/** Renders a Recipe Form to add a new Recipe
 * 
 * State: 
 *   formData: { recipeName, cookingTime, prepTime, mealType } 
 *   formSteps: number
 */
function RecipeForm() {
    const [formData, setFormData] = useState(INITIAL_DATA);
    const [formSteps, setFormSteps] = useState(0);

    /**
     * Handles the inputs of Component General Info 
     * @param evt 
     */
    function handleChange(evt: React.ChangeEvent<HTMLInputElement>): void {
        const { name, value } = evt.target;

        setFormData((previousData) => ({ 
            ...previousData, 
            [name]: value
        }));
    }

    /**
     * Handles the file image input of Component General Info
     * @param evt 
     */
    function handleFile(evt: React.ChangeEvent<HTMLInputElement>): void {
        const image = evt.target.files?.[0];
        setFormData((currentFormData) => ({
             ...currentFormData, 
             recipeImage: image
        }));
    }

    /**
     * Handles the various inputs of Component AddIngredients 
     * @param ingredientForm 
     */
    function handleIngredientChange(ingredientForm: IngredientItems[]): void {
        const ingredients = ingredientForm.map(({id, ...ingredients}) => ingredients);

        setFormData((currentFormData) => ({
            ...currentFormData,
            ingredientList: ingredients
        }));
    }

    /**
     * Handles the various instructions of Component AddInstructions
     * @param instructionsForm 
     */
    function handleInstructionsChange(instructionsForm: InstructionItems[]): void {
        const instructions = instructionsForm.map(({instruction}) => instruction);

        setFormData((currentFormData)=> ({
            ...currentFormData,
            instructions: instructions.join(' FOODIE-PART ')
        }));
    }

    async function addRecipe(formData: CreateRecipe) {
        await FoodieLoveApi.createRecipe(formData);
    }

    async function handleSubmit(evt: React.FormEvent) {
        evt.preventDefault();

        const sendData = new FormData();

        // for (const key in formData) {
        //     sendData.append(key, formData[key as keyof GeneralRecipeData]);
        // }

        // console.log(sendData);

        // try {
        //     await addRecipe(sendData);
        // } catch(err) {
        //     console.error(err);
        // }

        console.log(formData);
    } 

    const handleNext = () => {
        setFormSteps(formSteps + 1);
    };
    
    const handleBack = () => {
        setFormSteps(formSteps - 1);
    };

    return (
        <div>
            <Container component="section">
                <Paper 
                    variant="outlined" 
                    sx={{my: {xs: 3, md: 6 }, p: { xs: 2, md: 3}, boxShadow: 2}}>
                    <Typography component="h1" variant="h4" align="center">
                        Create a Recipe
                        <FoodBankIcon sx={{ml: 2, fontSize: '40px'}}/>
                    </Typography>

                    <Stepper 
                        activeStep={formSteps}
                        sx={{pt: 3, pb: 5}}>
                        {formLabels.map((label: string) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    <form onSubmit={handleSubmit}>
                        <GeneralInfo 
                            step={formSteps}
                            formValues={formData} 
                            handleChange={handleChange}
                            handleFile={handleFile} /> 

                        <AddIngredients 
                            step={formSteps} 
                            handleIngredient={handleIngredientChange} />

                        <AddInstructions step={formSteps}
                                handleInstructions={handleInstructionsChange} />

                        <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                            {formSteps !== 0 && (
                                <Button 
                                    sx={{mt: 3, ml:1}} 
                                    onClick={handleBack}>
                                    Back
                                </Button>
                            )}
                            <Button 
                                sx={{mt: 3, ml: 1}} 
                                variant="contained"
                                type={formSteps === formLabels.length - 1 
                                    ? 'submit' 
                                    : 'button'}
                                onClick={handleNext}>
                                {formSteps === formLabels.length - 1 
                                        ? 'Submit' 
                                        : 'Next'}
                            </Button>
                        </Box>             
                    </form>
                            

                </Paper>
            </Container>
        </div>
    );
};

export default RecipeForm; 