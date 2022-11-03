import { CreateRecipe } from '../interface';
import { Typography, Grid } from '@mui/material';

function GeneralReview({ formValues }: { formValues: CreateRecipe}) {
    const { recipeName, prepTime, cookingTime, mealType } = formValues;

    console.log(formValues)

    return (
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom>
            General Info
          </Typography>
          <Typography gutterBottom>Name: {recipeName}</Typography>
          <Typography gutterBottom>Prep Time: {prepTime || '0'}</Typography>
          <Typography gutterBottom>Cooking Time: {cookingTime}</Typography>
          <Typography gutterBottom>
            Meal Type: {mealType || 'Not Specified'}
          </Typography>
        </Grid>
      );
};

export default GeneralReview; 