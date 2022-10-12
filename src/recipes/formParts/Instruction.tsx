import { Fragment } from "react";
import { Grid, TextField, Button } from "@mui/material"; 


interface InstructionProps {
    index: number;
    removeItem: (index: number) => void;
};

function Instruction({ index, removeItem }: InstructionProps) {

    return (
        <Fragment>
            <Grid item xs={9} sm={9}>
                <TextField
                    name={`instructions.${index}.instruction`}
                    label="Instruction"
                    multiline
                    fullWidth
                    maxRows={4} />
            </Grid>
            <Grid item xs={2} sm={2}>
                <Button 
                    type="button"
                    onClick={() => removeItem(index)}>
                        Delete
                </Button>
            </Grid>
        </Fragment>
    )
}

export default Instruction;