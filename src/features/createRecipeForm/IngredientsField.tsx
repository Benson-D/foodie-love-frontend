import { Grid, Typography, Button } from "@mui/material";
import { useContext } from "react";
import { FieldArray } from "formik";
import FoodieFormContext from "../../context/FoodieFormContext";
import InputField from "../../components/formFields/InputField";
import SelectField from "../../components/formFields/SelectField";
import DeleteFormButton from "../../components/DeleteFormButton";
import { IngredientItems } from "../../interface";
import { FormStepProps } from "../../interface";

//Measurement list for Foodie Form of ingredients
const measurements = [
  { value: "", label: "none" },
  { value: "tsp", label: "tsp" },
  { value: "tbsp", label: "tbsp" },
  { value: "cup", label: "cup" },
  { value: "oz", label: "oz" },
  { value: "pint", label: "pint" },
  { value: "quart", label: "quart" },
  { value: "gallon", label: "gallon" },
  { value: "small", label: "small" },
  { value: "medium", label: "medium" },
  { value: "large", label: "large" },
];

/**
 *  Renders a single container for ingredient inputs
 *
 * Props:
 *     index: number
 *     removeItem: Formik helper (function)
 * State: none
 */
function IngredientFieldInputs({ index, removeItemCb }: FormStepProps) {
  return (
    <>
      <Grid item xs={6} sm={6} md={3}>
        <InputField name={`ingredientList.${index}.amount`} label="Amount*" />
      </Grid>
      <Grid item xs={6} sm={6} md={3}>
        <SelectField
          name={`ingredientList.${index}.measurement`}
          label="Measurement"
          data={measurements}
          fullWidth
        />
      </Grid>
      <Grid item xs={10} sm={10} md={4}>
        <InputField
          name={`ingredientList.${index}.ingredient`}
          label="Ingredient*"
        />
      </Grid>
      <Grid item xs={2} sm={2} md={2}>
        <DeleteFormButton index={index} removeItemCb={removeItemCb} />
      </Grid>
    </>
  );
}

const generalIngredientList: IngredientItems = {
  amount: "",
  measurement: "",
  ingredient: "",
};

function IngredientsField({ values }: { values: IngredientItems[] }) {
  const foodie = useContext(FoodieFormContext);

  return (
    <div style={{ display: `${foodie?.step === 1 ? "block" : "none"}` }}>
      <Typography variant="h6" gutterBottom>
        Ingredient List
      </Typography>
      <Grid container spacing={3}>
        <FieldArray name="ingredientList">
          {({
            remove,
            push,
          }: {
            remove: (index: number) => void;
            push: (list: IngredientItems) => void;
          }) => (
            <>
              {values.map((ingredient: IngredientItems, index: number) => (
                <IngredientFieldInputs
                  key={index}
                  index={index}
                  removeItemCb={remove}
                />
              ))}
              <Button
                type="button"
                sx={{ my: 3, ml: 2 }}
                onClick={() => push(generalIngredientList)}
              >
                Add Ingredient
              </Button>
            </>
          )}
        </FieldArray>
      </Grid>
    </div>
  );
}

export default IngredientsField;
