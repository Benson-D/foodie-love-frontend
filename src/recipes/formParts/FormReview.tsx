import { useContext } from "react";
import FoodieFormContext from "../FoodieFormContext";
import { Grid, Typography } from '@mui/material';

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