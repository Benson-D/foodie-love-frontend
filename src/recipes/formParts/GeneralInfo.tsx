import React from 'react';
import { CreateRecipeForm } from "../../api/interface/foodieCreate";
import { 
    Grid, 
    Typography, 
    TextField, 
    InputAdornment, 
    InputLabel 
} from '@mui/material';


function GeneralInfo({ step, formValues, handleChange, handleFile }: { 
    step: number,
    formValues: CreateRecipeForm, 
    handleChange: (evt: React.ChangeEvent<HTMLInputElement>) => void,
    handleFile: (evt: React.ChangeEvent<HTMLInputElement>) => void
}) {

    const componentDisplay = step === 0 ? 'block' : 'none';
    const minuteProps = {
        endAdornment: <InputAdornment position="end">Minutes</InputAdornment>
    };

    return (
        <div style={{ display: componentDisplay }}>
            <Typography variant="h6" gutterBottom>
                General Info
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField 
                        required
                        id="recipeName"
                        name="recipeName"
                        label="Recipe Name"
                        fullWidth
                        variant="standard"
                        defaultValue={formValues.recipeName}
                        onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                        id="mealType"
                        name="mealType"
                        label="Meal Type"
                        fullWidth
                        variant="standard"
                        defaultValue={formValues.mealType}
                        onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                        id="prepTime"
                        name="prepTime"
                        label="Prep Time"
                        fullWidth
                        variant="standard"
                        type="number"
                        InputProps={minuteProps}
                        defaultValue={formValues.prepTime}
                        onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                        required
                        id="cookingTime"
                        name="cookingTime"
                        label="Cooking Time"
                        fullWidth
                        variant="standard"
                        type="number"
                        InputProps={minuteProps}
                        defaultValue={formValues.cookingTime}
                        onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputLabel >Recipe Image</InputLabel>
                    <TextField 
                        id="recipeImage"
                        name="recipeImage"
                        fullWidth
                        type="file"
                        onChange={handleFile} />
                </Grid>
            </Grid>
        </div>
    );
}

export default GeneralInfo;