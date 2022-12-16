import { CreateRecipe } from '../interface';
import { Typography, Grid } from '@mui/material';
import React from 'react';

function GeneralReview({ formValues }: { formValues: CreateRecipe}) {
    const { 
        recipeName, 
        prepTime, 
        cookingTime, 
        mealType, 
        ingredientList 
    } = formValues;

    return (
        <>
            <Grid item xs={12} sm={6}>
                <Typography variant="h6" gutterBottom>
                    General Info
                </Typography>
                <Typography gutterBottom>Name: {recipeName}</Typography>
                <Typography gutterBottom>
                    Prep Time: {prepTime || '0'}
                </Typography>
                <Typography gutterBottom>
                    Cooking Time: {cookingTime}
                </Typography>
                <Typography gutterBottom>
                    Meal Type: {mealType || 'Not Specified'}
                </Typography>
            </Grid>

            <Grid item container direction="column" xs={12} sm={6}>
                <Typography variant="h6" gutterBottom>
                    Ingredient List
                </Typography>

                <Grid container>
                    {ingredientList?.map(({amount, ingredient, measurement}, idx) => (
                        <React.Fragment key={idx}>
                            <Grid item xs={6}>
                                <Typography gutterBottom >
                                    {`${amount} ${measurement || '' } ${ingredient}`}
                                </Typography>
                            </Grid>
                        </React.Fragment>
                    ))}
                </Grid>
            </Grid>
        </>
      );
};

export default GeneralReview; 