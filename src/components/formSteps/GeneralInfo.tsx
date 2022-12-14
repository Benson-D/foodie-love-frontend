import { useContext } from 'react';
import FoodieFormContext from '../../context/FoodieFormContext';
import InputField from '../formFields/InputField';
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

/**
 * First page of Foodie Recipe Form 
 *
 * Props: 
 *     formField: { recipeName, mealType, prepTime, cookingTime }
 *     handleFild: function 
 * State: none
 */
function GeneralInfo({ formField, handleFile }: { 
    formField: FormField,
    handleFile: (evt: React.ChangeEvent<HTMLInputElement>) => void
}) {

    const foodie = useContext(FoodieFormContext); 
    const { recipeName, mealType, prepTime, cookingTime } = formField; 

    const componentDisplay = foodie?.step === 1 ? 'block' : 'none';
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
                    <InputField 
                        name={recipeName.name}
                        label={recipeName.label} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputField 
                        name={mealType.name}
                        label={mealType.label} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputField
                        name={prepTime.name}
                        label={prepTime.label}
                        type="number"
                        InputProps={minuteProps} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputField 
                        name={cookingTime.name}
                        label={cookingTime.label}
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