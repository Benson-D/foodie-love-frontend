import { Grid, Typography, Button } from "@mui/material";
import React, { useState } from "react";
import { InstructionItems } from "../Interface/formInterface";
import { v4 as uuidv4 } from "uuid";
import Instruction from "./Instruction";


function AddInstructions({ step, handleInstructions }: { 
    step: number,
    handleInstructions: (formData: InstructionItems[]) => void
}) {
    const [instructions, setInstructions] = useState<InstructionItems[]>([{
        id: uuidv4(),
        instruction: ''
    }]);

    const addInstruction = () => {
        const addIngredientList = instructions.concat({
            id: uuidv4(),
            instruction: ''
        });
        setInstructions(addIngredientList);
    };

    const removeInstruction = (id: string) => {
        setInstructions(
            (instructions) => instructions.filter((step) => step.id !== id)
        );
    }

    function handleChange(idx: number, evt: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = evt.target;
        const formInstructions = [...instructions];
   
        formInstructions[idx][name as keyof InstructionItems] = value;
        setInstructions(formInstructions);
        handleInstructions(instructions);
    }

    let componentDisplay = step === 2 ? 'block' : 'none';

    return (
        <div style={{ display: componentDisplay }}>
            <Typography variant="h6" gutterBottom>
                Add Recipe Instructions
            </Typography>
            <Grid container spacing={3}>
                { instructions.map((instruction, idx) => (
                    <Instruction 
                        key={instruction.id} 
                        step={instruction} 
                        removeInstruction={removeInstruction}
                        handleChange={handleChange} 
                        index={idx} />
                ))}
            </Grid>
            <Button sx={{ my: 3}} onClick={addInstruction}>Add Instruction</Button>
        </div>
    )
}

export default AddInstructions; 