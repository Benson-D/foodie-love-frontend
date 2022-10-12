import { Grid, TextField, Button } from '@mui/material';
import { Fragment } from "react"; 

interface IngredientProps {
    index: number;
    removeItem: (index: number) => void;
}

function Ingredient({ index, removeItem }: IngredientProps) {

    return (
        <Fragment>
            <Grid item xs={3} sm={3}>
                <TextField 
                    name={`ingredientList.${index}.amount`}
                    label="Amount"
                    fullWidth
                    variant="standard" />
            </Grid>
            <Grid item xs={3} sm={3}>
                <TextField 
                    name={`ingredientList.${index}.measurement`}
                    label="Measurement"
                    fullWidth
                    variant="standard" />
            </Grid>
            <Grid item xs={6} sm={4}>
                <TextField 
                    name={`ingredientList.${index}.ingredient`}
                    label="Ingredient"
                    fullWidth
                    variant="standard" />
            </Grid>
            <Grid item xs={6} sm={2}>
                <Button 
                    type="button" 
                    onClick={() => removeItem(index)}>
                        Delete
                </Button>
            </Grid>
        </Fragment>
    );
}

export default Ingredient;