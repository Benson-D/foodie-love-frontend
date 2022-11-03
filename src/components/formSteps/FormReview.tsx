import { useContext } from "react";
import FoodieFormContext from "../../context/FoodieFormContext";
import { Grid, Typography } from '@mui/material';

/**
 * Last page of Foodie Recipe Form, 
 * displays a review list of all items before submission
 *
 * Props: none
 * State: none
 */
function FormReview() {
    const foodie = useContext(FoodieFormContext);

    return (
        <div style={{display:`${foodie?.formSteps === 3 ? 'block' : 'none'}`}}>
            <Typography variant="h6" gutterBottom>
                Review of Recipe
            </Typography>
            <Grid container spacing={3}>
                Formik Values to Display
            </Grid>
        </div>
    )
}

export default FormReview;