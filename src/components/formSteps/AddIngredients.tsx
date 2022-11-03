import { Grid, Typography, Button } from '@mui/material';
import { useContext } from 'react'; 
import FoodieFormContext from '../../context/FoodieFormContext';
import Ingredient from '../Ingredient';
import { FieldArray } from 'formik';
import { IngredientItems } from '../../interface';

const generalIngredientList: IngredientItems = { 
    amount: '',
    measurement: '',
    ingredient: ''
};

function AddIngredients({ values }: { values: IngredientItems[] }) {
    const foodie = useContext(FoodieFormContext); 

    return (
        <div style={{display:`${foodie?.formSteps === 1 ? 'block' : 'none'}`}}>
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
                            sx={{ my: 3}} 
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