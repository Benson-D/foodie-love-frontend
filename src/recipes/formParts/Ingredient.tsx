import { Grid, Button } from '@mui/material';
import { Fragment } from "react"; 
import DeleteIcon from '@mui/icons-material/Delete';
import InputField from './InputField';

interface IngredientProps {
    index: number;
    removeItem: (index: number) => void;
}

function Ingredient({ index, removeItem }: IngredientProps) {

    return (
        <Fragment>
            <Grid item xs={2} sm={3}>
                <InputField 
                    name={`ingredientList.${index}.amount`}
                    label="Amount" />
            </Grid>
            <Grid item xs={2} sm={3}>
                <InputField 
                    name={`ingredientList.${index}.measurement`}
                    label="Measurement" />
            </Grid>
            <Grid item xs={5} sm={4}>
                <InputField 
                    name={`ingredientList.${index}.ingredient`}
                    label="Ingredient" />
            </Grid>
            <Grid item xs={3} sm={2}>
                <Button 
                    type="button" 
                    onClick={() => removeItem(index)}>
                        <DeleteIcon sx={{ml: 2, mt: 3, fontSize: '20px'}}/>
                </Button>
            </Grid>
        </Fragment>
    );
}

export default Ingredient;