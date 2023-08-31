import { Grid, Typography, Button } from '@mui/material';
import { useContext } from 'react'; 
import { FieldArray } from 'formik';
import FoodieFormContext from '../../context/FoodieFormContext';
import InputField from '../../components/formFields/InputField';
import SelectField from '../../components/formFields/SelectField';
import DeleteItem from '../../components/DeleteItem';
import { IngredientItems } from '../../interface';
import { FormStepProps } from '../../interface/';

//Measurement list for Foodie Form of ingredients
const measurements = [
    { value: '', label: 'none' },
    { value: 'tsp', label: 'tsp' },
    { value: 'tbsp', label: 'tbsp' },
    { value: 'cup', label: 'cup' },
    { value: 'oz', label: 'oz' },
    { value: 'pint', label: 'pint' },
    { value: 'quart', label: 'quart' },
    { value: 'gallon', label: 'gallon' },
    { value: 'small', label: 'small' },
    { value: 'medium', label: 'medium' },
    { value: 'large', label: 'large' },
]

/**
 *  Renders a single container for ingredient inputs 
 * 
 * Props: 
 *     index: number 
 *     removeItem: Formik helper (function)
 * State: none
 */
function Ingredient({ index, removeItem }: FormStepProps) {
    return (
        <>
            <Grid item xs={3} sm={3}>
                <InputField 
                    name={`ingredientList.${index}.amount`}
                    label="Amount*" />
            </Grid>
            <Grid item xs={4} sm={3}>
                <SelectField 
                    name={`ingredientList.${index}.measurement`}
                    label="Measurement"
                    data={measurements}
                    fullWidth />
            </Grid>
            <Grid item xs={3} sm={4}>
                <InputField 
                    name={`ingredientList.${index}.ingredient`}
                    label="Ingredient*" />
            </Grid>
            <Grid item xs={2} sm={2}>
                <DeleteItem index={index} removeItem={removeItem} />
            </Grid>
        </>
    );
}

const generalIngredientList: IngredientItems = { 
    amount: '',
    measurement: '',
    ingredient: ''
};

function AddIngredients({ values }: { values: IngredientItems[] }) {
    const foodie = useContext(FoodieFormContext); 

    return (
        <div style={{display:`${foodie?.step === 1 ? 'block' : 'none'}`}}>
            <Typography variant="h6" gutterBottom>
                Ingredient List
            </Typography>
            <Grid container spacing={3}>
                <FieldArray name="ingredientList">
                    {({ remove, push }) => (  
                    <>  
                        {values.map((ingredient: IngredientItems, index: number) => (
                            <Ingredient 
                                key={index}
                                index={index} 
                                removeItem={remove} />        
                        ))}    
                        <Button 
                            type="button"
                            sx={{ my: 3, ml: 2 }} 
                            onClick={() => push(generalIngredientList)}>
                                Add Ingredient
                        </Button>
                    </>
                )}
                </FieldArray>
            </Grid>
        </div>
    );
}


export default AddIngredients;