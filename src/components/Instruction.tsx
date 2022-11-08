import { Grid } from '@mui/material';
import TextareaField from './formFields/TextareaField';
import { FormStepProps } from '../interface';
import DeleteItem from './DeleteItem';

/**
 *  Renders a single container for instruction inputs 
 * 
 * Props: 
 *     index: number 
 *     removeItem: Formik helper (function)
 * State: none
 */
function Instruction({ index, removeItem }: FormStepProps) {

    return (
        <>
            <Grid item xs={9} sm={9}>
                <TextareaField
                    name={`instructions.${index}.instruction`}
                    label="Instruction" />
            </Grid>
            <Grid item xs={2} sm={2}>
                <DeleteItem index={index} removeItem={removeItem}/>
            </Grid>
        </>
    )
}

export default Instruction;