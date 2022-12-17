import { Grid } from '@mui/material';
import InputField from './formFields/InputField';
import SelectField from './formFields/SelectField';
import { measurements } from '../data/foodieFormModel';
import { FormStepProps } from '../interface';
import DeleteItem from './DeleteItem';

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

export default Ingredient;