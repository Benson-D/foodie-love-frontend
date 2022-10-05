import { Fragment } from "react";
import { Grid, TextField, Button } from "@mui/material"; 

interface AddInstructionProps {
    id: string;
    instruction?: string;
};

interface InstructionProps {
    step: AddInstructionProps;
    removeInstruction: (id: string) => void;
    handleChange: (idx: number, evt: React.ChangeEvent<HTMLInputElement>) => void;
    index: number;
};


function Instruction({ step, removeInstruction, handleChange, index }: InstructionProps) {

    const removeStep = () => {
        removeInstruction(step.id);
    }
    
    return (
        <Fragment>
             <Fragment key={step.id}>
                <Grid item xs={9} sm={9}>
                    <TextField
                        id="foodie-instructions"
                        name="instruction"
                        label="Add Instruction"
                        multiline
                        fullWidth
                        maxRows={4} 
                        defaultValue={step.instruction}
                        onChange={(evt:React.ChangeEvent<HTMLInputElement>
                            ): void => handleChange(index, evt)} />
                </Grid>
                <Grid item xs={2} sm={2}>
                    <Button onClick={removeStep}>Delete</Button>
                </Grid>
            </Fragment>

        </Fragment>
    )
}

export default Instruction;