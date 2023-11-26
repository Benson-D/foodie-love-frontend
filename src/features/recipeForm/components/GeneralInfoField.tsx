import { useContext } from "react";
import FoodieFormContext from "../../../context/FoodieFormContext";
import InputField from "../../../components/formFields/InputField";
import {
  Box,
  Grid,
  Typography,
  TextField,
  InputAdornment,
  InputLabel,
} from "@mui/material";

/**
 * First page of Foodie Recipe Form
 *
 * Props:
 *     formField: { recipeName, mealType, prepTime, cookingTime }
 *     handleFild: function
 * State: none
 */
function GeneralInfoField({
  handleFile,
}: {
  handleFile: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const foodie = useContext(FoodieFormContext);

  const componentDisplay = foodie?.step === 0 ? "block" : "none";
  const minuteProps = {
    endAdornment: <InputAdornment position="end">Minutes</InputAdornment>,
  };

  return (
    <Box sx={{ display: componentDisplay }}>
      <Typography variant="h6" gutterBottom paddingBottom={2}>
        General Info
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={6}>
          <InputField name="recipeName" label="Recipe Name*" />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <InputField name="mealType" label="Meal Type" />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <InputField
            name="prepTime"
            label="Prep Time"
            type="number"
            InputProps={minuteProps}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <InputField
            name="cookingTime"
            label="Cooking Time*"
            type="number"
            InputProps={minuteProps}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <InputLabel>Recipe Image</InputLabel>
          <TextField
            name="recipeImage"
            fullWidth
            type="file"
            onChange={handleFile}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default GeneralInfoField;
