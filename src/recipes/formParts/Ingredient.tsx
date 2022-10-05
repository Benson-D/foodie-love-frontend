import { Grid, TextField, Button } from '@mui/material';
import { Fragment } from "react"; 
import { IngredientItems } from "../Interface/formInterface";


interface IngredientProps {
    listItem: IngredientItems;
    removeItem: (id: string) => void;
    handleChange: (idx: number, evt: React.ChangeEvent<HTMLInputElement>) => void;
    index: number
}

function Ingredient({ listItem, removeItem, handleChange, index }: IngredientProps) {

    const removeIngredient = () => {
        removeItem(listItem.id);
    };

    return (
        <Fragment>
            <Grid item xs={3} sm={3}>
                <TextField 
                    required
                    id="ingredient-amount"
                    name="amount"
                    label="Amount"
                    fullWidth
                    defaultValue={listItem.amount}
                    variant="standard"
                    onChange={(evt:React.ChangeEvent<HTMLInputElement>
                        ): void => handleChange(index, evt)} />
            </Grid>
            <Grid item xs={3} sm={3}>
                <TextField 
                    id="ingredient-measurement"
                    name="measurement"
                    label="Measurement"
                    fullWidth
                    defaultValue={listItem.measurement}
                    variant="standard"
                    onChange={(evt:React.ChangeEvent<HTMLInputElement>
                        ): void => handleChange(index, evt)} />
            </Grid>
            <Grid item xs={6} sm={4}>
                <TextField 
                    required
                    id="ingredient-name"
                    name="ingredient"
                    label="Ingredient"
                    fullWidth
                    defaultValue={listItem.ingredient}
                    variant="standard"
                    onChange={(evt:React.ChangeEvent<HTMLInputElement>
                        ): void => handleChange(index, evt)} />
            </Grid>
            <Grid item xs={6} sm={2}>
                <Button onClick={removeIngredient}>Delete</Button>
            </Grid>
        </Fragment>
    );
}

export default Ingredient;