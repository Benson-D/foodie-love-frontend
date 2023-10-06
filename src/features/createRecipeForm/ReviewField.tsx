import React, { useContext } from "react";
import FoodieFormContext from "../../context/FoodieFormContext";
import { Grid, Typography } from "@mui/material";
import { useFormikContext } from "formik";
import { CreateRecipe } from "../../interface";

function GeneralReview({ formValues }: { formValues: CreateRecipe }) {
  const {
    recipeName,
    prepTime,
    cookingTime,
    mealType,
    ingredientList,
    instructions,
  } = formValues;

  return (
    <>
      <Grid item xs={12} sm={6}>
        <Typography variant="h6" gutterBottom>
          General Info
        </Typography>
        <Typography gutterBottom>Name: {recipeName}</Typography>
        <Typography gutterBottom>Prep Time: {prepTime || "0"}</Typography>
        <Typography gutterBottom>Cooking Time: {cookingTime}</Typography>
        <Typography gutterBottom>
          Meal Type: {mealType || "Not Specified"}
        </Typography>
      </Grid>

      <Grid item container direction="column" xs={12} sm={6}>
        <Typography variant="h6" gutterBottom>
          Ingredient List
        </Typography>

        <Grid container>
          {ingredientList?.map(({ amount, ingredient, measurement }, idx) => (
            <React.Fragment key={idx}>
              <Grid item xs={6}>
                <Typography gutterBottom>
                  &bull; {`${amount} ${measurement || ""} ${ingredient}`}
                </Typography>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </Grid>
      <Grid item container direction="column" xs={12} sm={6}>
        <Typography variant="h6" gutterBottom>
          Instructions
        </Typography>
        <Grid container>
          {instructions?.map(({ instruction }, idx) => (
            <React.Fragment key={idx}>
              <Grid item xs={6}>
                <Typography gutterBottom>
                  {`${idx + 1}. ${instruction}`}
                </Typography>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </Grid>
    </>
  );
}

/**
 * Last page of Foodie Recipe Form,
 * displays a review list of all items before submission
 *
 * Props: none
 * State: none
 */
function ReviewField() {
  const foodie = useContext(FoodieFormContext);
  const { values }: { values: CreateRecipe } = useFormikContext();

  return (
    <div style={{ display: `${foodie?.step === 3 ? "block" : "none"}` }}>
      <Typography variant="h6" gutterBottom>
        Review of Recipe
      </Typography>
      <Grid container spacing={3}>
        <GeneralReview formValues={values} />
      </Grid>
    </div>
  );
}

export default ReviewField;
