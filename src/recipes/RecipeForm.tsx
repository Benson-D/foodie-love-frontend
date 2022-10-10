import React, { useState } from "react";
import { CreateRecipeForm } from "../api/interface/foodieCreate";
import FoodieLoveApi from "../api/FoodieLoveApi";
import GeneralInfo from "./formParts/GeneralInfo";
import AddIngredients from "./formParts/AddIngredients";
import AddInstructions from "./formParts/AddInstructions";
import { IngredientItems, InstructionItems } from "./Interface/formInterface";
import FoodieFormContext from "./FoodieFormContext";
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
import { styled } from '@mui/material/styles';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';

const INITIAL_DATA: CreateRecipeForm = {
    recipeName: '',
    cookingTime: '0',
    prepTime: '0',
    mealType: '',
    instructions: '',
    ingredientList: []
};

const formLabels = [
    'General Info', 
    'Ingredients', 
    'Steps', 
    'Review Recipe'
];

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
    const [formData, setFormData] = useState<CreateRecipeForm>(INITIAL_DATA);
    const [formImage, setFormImage] = useState<string | File>('');
    const [formSteps, setFormSteps] = useState<number>(0);

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
        if (image) setFormImage(image);
    }

    /**
     * Handles the various inputs of Component AddIngredients 
     * @param ingredientForm 
     */
    function handleIngredientChange(ingredientForm: IngredientItems[]): void {
        const ingredients = ingredientForm.map(({id, ...ingredients}) => ingredients);

        if (ingredients.length) {
            setFormData((currentFormData) => ({
                ...currentFormData,
                ingredientList: JSON.stringify(ingredients)
            }));
        }
    }

    /**
     * Handles the various instructions of Component AddInstructions
     * @param instructionsForm 
     */
    function handleInstructionsChange(instructionsForm: InstructionItems[]): void {
        const instructions = instructionsForm.map(({instruction}) => instruction);
        
        setFormData((currentFormData)=> ({
            ...currentFormData,
            instructions: instructions.join(' FOODIE-STEP ')
        }));
    }

    /**
     * Sends a post request to database 
     * @param formData 
     */
    async function addRecipe(formData: CreateRecipeForm) {
        await FoodieLoveApi.createRecipe(formData);
    }

    /**
     * Sends a post request to aws bucket, returns a url
     * @param formImage 
     * @returns 
     */
    async function addImage(formImage: FormData): Promise<string> {
        return await FoodieLoveApi.sendImage(formImage);
    };

    async function handleSubmit(evt: React.FormEvent) {
        evt.preventDefault();

        const sendData = new FormData();
        sendData.append('recipeImage', formImage);

        const recipeUrl: string = await addImage(sendData);

        setFormData((currentData) => ({
            ...currentData,
            recipeImage: recipeUrl
        }));
 
        try {
            await addRecipe(formData);
        } catch(err) {
            console.error(err);
        }
    } 

    /**
     * Switches Form part to the next page
     */
    const handleNext = () => {
        setFormSteps(formSteps + 1);
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

                    <form onSubmit={handleSubmit}>
                        <FoodieFormContext.Provider value={{formSteps}}>
                            <GeneralInfo 
                                formValues={formData} 
                                handleChange={handleChange}
                                handleFile={handleFile} /> 
                            <AddIngredients 
                                handleIngredient={handleIngredientChange} />
                            <AddInstructions 
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
                            </FoodieFormContext.Provider>
                    </form>
                            

                </Paper>
            </Container>
        </div>
    );
};

export default RecipeForm; 