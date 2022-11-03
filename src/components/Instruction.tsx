import { Grid, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import TextareaField from './formFields/TextareaField';

interface InstructionProps {
    index: number;
    removeItem: (index: number) => void;
};

/**
 *  Renders a single container for instruction inputs 
 * 
 * Props: 
 *     index: number 
 *     removeItem: Formik helper (function)
 * State: none
 */
function Instruction({ index, removeItem }: InstructionProps) {

    return (
        <>
            <Grid item xs={9} sm={9}>
                <TextareaField
                    name={`instructions.${index}.instruction`}
                    label="Instruction" />
            </Grid>
            <Grid item xs={2} sm={2}>
                <Button 
                    type="button"
                    onClick={() => removeItem(index)}>
                        <DeleteIcon sx={{ml: 2, mt: 1, fontSize: '20px'}}/>
                </Button>
            </Grid>
        </>
    )
}

export default Instruction;