import { useContext } from 'react';
import FoodieFormContext from '../../context/FoodieFormContext';
import { Grid, Typography } from '@mui/material';
import { useFormikContext } from 'formik';
import GeneralReview from '../GeneralReview';
import { CreateRecipe } from '../../interface/';

/**
 * Last page of Foodie Recipe Form, 
 * displays a review list of all items before submission
 *
 * Props: none
 * State: none
 */
function FormReview() {
    const foodie = useContext(FoodieFormContext);
    const { values }: { values: CreateRecipe } = useFormikContext();

    return (
        <div style={{display:`${foodie?.step === 4 ? 'block' : 'none'}`}}>
            <Typography variant="h6" gutterBottom>
                Review of Recipe
            </Typography>
            <Grid container spacing={3}>
                <GeneralReview formValues={values} />
            </Grid>
        </div>
    )
}

export default FormReview;