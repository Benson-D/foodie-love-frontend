import { Grid, Typography, Button } from '@mui/material';
import { useContext } from 'react';
import FoodieFormContext from '../../context/FoodieFormContext';
import { FieldArray } from 'formik';
import TextareaField from '../../components/formFields/TextareaField';
import { FormStepProps, InstructionItems } from '../../interface';
import DeleteItem from '../../components/DeleteItem';

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


function AddInstructions({ values }: { values: InstructionItems[] }) {
    const foodie = useContext(FoodieFormContext); 

    return (
        <div style={{display:`${foodie?.step === 2 ? 'block' : 'none'}`}}>
            <Typography variant="h6" gutterBottom>
                Add Recipe Instructions
            </Typography>
            <Grid container spacing={3}>
                <FieldArray name="instructions">
                    {({remove, push}) => (
                        <>
                             { values.map((instruction: InstructionItems, idx: number) => (
                                <Instruction 
                                    key={idx} 
                                    index={idx}
                                    removeItem={remove} />
                            ))}
                            <Button 
                                type="button"
                                sx={{ my: 3, ml: 2 }}
                                onClick={() => push({instruction: ''})}>
                                    Add Instruction
                            </Button>
                        </>
                    )}
                </FieldArray>
            </Grid>
        </div>
    )
}

export default AddInstructions; 