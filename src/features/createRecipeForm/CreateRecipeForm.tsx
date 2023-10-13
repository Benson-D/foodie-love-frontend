import React, { useState } from "react";
import { CreateRecipe } from "../../interface";
import FoodieLoveApi from "../../api/FoodieLoveApi";
import FormStepper from "./components/FormStepper";
import GeneralInfoField from "./components/GeneralInfoField";
import IngredientsField from "./components/IngredientsField";
import InstructionsField from "./components/InstructionsField";
import ReviewField from "./components/ReviewField";
import { Formik, Form, FormikHelpers, FormikState } from "formik";
import FoodieFormContext from "../../context/FoodieFormContext";
import CreateValidationSchema from "./schema/CreateValidationSchema";
import { Box, Button, MobileStepper } from "@mui/material";
import FormLayout from "../../layout/FormLayout";
import useStep from "../../hooks/useStep";

//Initial Values of Foodie Form
const initialValues: CreateRecipe = {
  recipeName: "",
  mealType: "",
  prepTime: 0,
  cookingTime: 0,
  ingredientList: Array(5).fill({
    amount: "",
    measurement: "",
    ingredient: "",
  }),
  instructions: [{ instruction: "" }],
};

/**
 * Renders a multi step form to add a new Recipe
 *
 * Props: none
 * State:
 *   formImage: File | string
 */
function CreateRecipeForm() {
  const [formImage, setFormImage] = useState<string | File>("");
  const [step, helpers] = useStep(4);

  const { canGoToPreviousStep, canGoToNextStep, previousStep, nextStep } =
    helpers;

  /**
   * Handles the file image input of Component General Info
   * @param evt
   */
  function handleFile(evt: React.ChangeEvent<HTMLInputElement>): void {
    const image = evt.target.files?.[0];
    if (image) setFormImage(image);
  }

  /**
   * Sends a post request to aws bucket, returns a url
   * @param formImage
   * @returns
   */
  async function addImage(formImage: FormData): Promise<string> {
    return await FoodieLoveApi.sendImage(formImage);
  }

  async function handleSubmission(recipeForm: CreateRecipe) {
    const sendData = new FormData();
    sendData.append("recipeImage", formImage);
    const recipeImage = await addImage(sendData);

    if (recipeImage) {
      recipeForm["recipeImage"] = recipeImage;
    }

    await FoodieLoveApi.createRecipe(recipeForm);
  }

  async function _submitForm(
    values: CreateRecipe,
    actions: FormikHelpers<CreateRecipe>,
  ) {
    if (!canGoToNextStep) {
      console.log(values);
      handleSubmission(values);
    } else {
      nextStep();
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  }

  return (
    <FormLayout title="Create a Recipe">
      <>
        <FormStepper step={step} />
        <FoodieFormContext.Provider value={{ step }}>
          <Formik
            initialValues={initialValues}
            validationSchema={CreateValidationSchema[step]}
            onSubmit={_submitForm}
          >
            {({ values, isSubmitting }: FormikState<CreateRecipe>) => (
              <Form>
                <GeneralInfoField handleFile={handleFile} />
                <IngredientsField values={values.ingredientList} />
                <InstructionsField values={values.instructions} />
                <ReviewField />
                <Box
                  sx={{
                    display: { xs: "none", sm: "flex" },
                    justifyContent: "flex-end",
                  }}
                >
                  {canGoToPreviousStep && (
                    <Button sx={{ mt: 3, ml: 1 }} onClick={previousStep}>
                      Back
                    </Button>
                  )}
                  <Button
                    disabled={isSubmitting}
                    sx={{ mt: 3, ml: 1 }}
                    type="submit"
                    variant="contained"
                  >
                    {!canGoToNextStep ? "Submit" : "Next"}
                  </Button>
                </Box>
                <MobileStepper
                  variant="text"
                  steps={4}
                  sx={{ display: { xs: "flex", sm: "none" } }}
                  position="static"
                  activeStep={step}
                  nextButton={
                    <Button size="small" type="submit">
                      {!canGoToNextStep ? "Submit" : "Next"}
                    </Button>
                  }
                  backButton={
                    <Button size="small" onClick={previousStep}>
                      Back
                    </Button>
                  }
                />
              </Form>
            )}
          </Formik>
        </FoodieFormContext.Provider>
      </>
    </FormLayout>
  );
}

export default CreateRecipeForm;
