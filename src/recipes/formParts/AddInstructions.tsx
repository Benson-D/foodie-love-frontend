import { Grid, Typography, Button } from "@mui/material";
import { useContext } from "react";
import FoodieFormContext from "../FoodieFormContext";
import { FieldArray } from "formik";
import Instruction from "./Instruction";
import { InstructionItems } from "../../interface";


function AddInstructions({ values }: { values: InstructionItems[] }) {
    const foodie = useContext(FoodieFormContext); 

    return (
        <div style={{display:`${foodie?.formSteps === 2 ? 'block' : 'none'}`}}>
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
                                sx={{ my: 3}}
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