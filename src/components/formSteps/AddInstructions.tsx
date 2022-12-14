import { Grid, Typography, Button } from '@mui/material';
import { useContext } from 'react';
import FoodieFormContext from '../../context/FoodieFormContext';
import Instruction from '../Instruction';
import { FieldArray } from 'formik';
import { InstructionItems } from '../../interface';


function AddInstructions({ values }: { values: InstructionItems[] }) {
    const foodie = useContext(FoodieFormContext); 

    return (
        <div style={{display:`${foodie?.step === 3 ? 'block' : 'none'}`}}>
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