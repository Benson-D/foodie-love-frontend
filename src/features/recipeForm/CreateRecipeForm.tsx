import React, { useState } from "react";
import { IRecipeFormData } from "../../interface";
import FormStepper from "./components/FormStepper";
import GeneralInfoField from "./components/GeneralInfoField";
import IngredientsField from "./components/IngredientsField";
import InstructionsField from "./components/InstructionsField";
import ReviewField from "./components/ReviewField";
import { Formik, Form, FormikHelpers, FormikState } from "formik";
import FoodieFormContext from "../../context/FoodieFormContext";
import RecipeFormValidationSchema from "./schema/RecipeFormValidationSchema";
import { Box, Button, MobileStepper } from "@mui/material";
import FormLayout from "../../layout/FormLayout";
import useStep from "../../hooks/useStep";
import {
  useCreateRecipeMutation,
  useCreateS3ImageMutation,
} from "../../service/recipeService";

//Initial Values of Foodie Form
const initialValues: IRecipeFormData = {
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
function CreateRecipeForm({
  toggleValue,
}: {
  toggleValue?: (value?: boolean) => void;
}) {
  const [formImage, setFormImage] = useState<string | File>("");
  const [step, helpers] = useStep(4);
  const [createRecipe] = useCreateRecipeMutation();
  const [createS3Image] = useCreateS3ImageMutation();

  const { canGoToPreviousStep, canGoToNextStep, previousStep, nextStep } =
    helpers;

  /**
   * Sets Image state for recipeImage
   * @param evt
   */
  function handleFile(evt: React.ChangeEvent<HTMLInputElement>): void {
    const image = evt.target.files?.[0];
    if (image) setFormImage(image);
  }

  async function uploadRecipeImageToS3(): Promise<string> {
    const sendData: FormData = new FormData();
    sendData.append("recipeImage", formImage);

    const recipeImage = await createS3Image(sendData).unwrap();
    return recipeImage.url;
  }

  async function handleSubmission(recipeForm: IRecipeFormData) {
    const recipeImage = await uploadRecipeImageToS3();

    if (recipeImage) recipeForm["recipeImage"] = recipeImage;
    createRecipe(recipeForm);

    if (toggleValue) {
      toggleValue(false);
    }
  }

  async function _submitForm(
    values: IRecipeFormData,
    actions: FormikHelpers<IRecipeFormData>,
  ) {
    if (!canGoToNextStep) {
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
            validationSchema={RecipeFormValidationSchema[step]}
            onSubmit={_submitForm}
          >
            {({ values, isSubmitting }: FormikState<IRecipeFormData>) => (
              <Form>
                <GeneralInfoField handleFile={handleFile} />
                <IngredientsField values={values.ingredientList} />
                <InstructionsField values={values.instructions} />
                <ReviewField />
                <Box
                  sx={{
                    display: { xs: "none", sm: "none", md: "flex" },
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
                  sx={{ display: { xs: "flex", sm: "flex", md: "none" } }}
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
