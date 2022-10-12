import { useContext } from 'react';
import FoodieFormContext from '../FoodieFormContext';
import { 
    Grid, 
    Typography, 
    TextField, 
    InputAdornment, 
    InputLabel 
} from '@mui/material';

interface FormProperties {
    name: string;
    label: string;
    errorMsg?: string
}

interface FormField {
    recipeName: FormProperties;
    mealType: FormProperties;
    prepTime: FormProperties;
    cookingTime: FormProperties;
}

function GeneralInfo({ formField, handleFile }: { 
    formField: FormField,
    handleFile: (evt: React.ChangeEvent<HTMLInputElement>) => void
}) {

    const foodie = useContext(FoodieFormContext); 
    const { recipeName, mealType, prepTime, cookingTime } = formField; 

    const componentDisplay = foodie?.formSteps === 0 ? 'block' : 'none';
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
                        name={recipeName.name}
                        label={recipeName.label}
                        fullWidth
                        variant="standard" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                        name={mealType.name}
                        label={mealType.label}
                        fullWidth 
                        variant="standard" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                        name={prepTime.name}
                        label={prepTime.label}
                        fullWidth
                        variant="standard"
                        type="number"
                        InputProps={minuteProps} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                        required
                        name={cookingTime.name}
                        label={cookingTime.label}
                        fullWidth
                        variant="standard"
                        type="number"
                        InputProps={minuteProps} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputLabel >Recipe Image</InputLabel>
                    <TextField 
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