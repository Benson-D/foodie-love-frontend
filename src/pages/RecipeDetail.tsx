import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useGetSingleRecipeQuery } from "../service/recipeService";
import {
  Box,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Divider,
  Typography,
} from "@mui/material";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import MainModal from "../components/MainModal";
import Loader from "../components/Loader";
import EditRecipeForm from "../features/recipeForm/EditRecipeForm";
import defaultImage from "/img/default-image.jpg";
import { convertToFraction } from "../utils/conversions";
import { ISingleRecipe, IUpdateRecipeData } from "../interface";

const convertTimeToFormattedString = (
  foodieTime: string | null | undefined,
): string => {
  if (!foodieTime) return "0 minutes";

  const minuteStatement = Number(foodieTime) > 1 ? "minutes" : "minute";
  return `${foodieTime} ${minuteStatement}`;
};

function formatInitialEditValues(recipeData: ISingleRecipe): IUpdateRecipeData {
  const formattedIngredients = recipeData.ingredients.map(
    ({ amount, ingredient, measurementUnit }) => {
      return {
        amount: convertToFraction(Number(amount)),
        ingredient: ingredient.name,
        measurement: measurementUnit?.description ?? "",
      };
    },
  );

  return {
    id: recipeData.id,
    recipeName: recipeData.name,
    mealType: recipeData?.mealType ?? "",
    prepTime: Number(recipeData.prepTime) ?? 0,
    cookingTime: Number(recipeData.cookingTime),
    ingredientList: formattedIngredients,
    instructions: recipeData.instructions,
  };
}

function RecipeDetail() {
  const { id } = useParams();
  const { data: recipe, isLoading } = useGetSingleRecipeQuery(String(id));
  const user = useSelector((state: RootState) => state.app.authUser);

  if (isLoading) {
    return <Loader />;
  }

  const editInitialValues = formatInitialEditValues(recipe as ISingleRecipe);

  return (
    <Box sx={{ marginTop: 5 }}>
      <Card
        sx={{
          maxWidth: { xs: 380, sm: 550, md: 700 },
          boxShadow: 3,
          cursor: "pointer",
          margin: "0 auto",
        }}
      >
        <CardHeader
          title={recipe?.name}
          subheader={recipe?.mealType}
          action={
            <Button component={Link} to={"/recipes"}>
              Back
            </Button>
          }
          sx={{ textTransform: "capitalize" }}
        />
        <CardMedia
          component="img"
          height="300"
          image={recipe?.recipeImage ?? defaultImage}
          alt="fight-map"
        />
        <CardContent>
          <Divider>
            <AccessAlarmIcon />
          </Divider>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              paddingX: 6,
            }}
          >
            <Typography variant="h4" sx={{ fontSize: "20px", color: "grey" }}>
              Prep Time
            </Typography>
            <Typography variant="h4" sx={{ fontSize: "20px", color: "grey" }}>
              Cooking Time
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              paddingX: 8,
            }}
          >
            <Typography sx={{ fontSize: "15px" }}>
              {convertTimeToFormattedString(recipe?.prepTime)}
            </Typography>
            <Typography sx={{ fontSize: "15px" }}>
              {convertTimeToFormattedString(recipe?.cookingTime)}
            </Typography>
          </Box>
          <Divider sx={{ marginY: 3 }} textAlign="center">
            <Typography variant="h4" sx={{ fontSize: "20px", color: "grey" }}>
              Ingredients
            </Typography>
          </Divider>
          <Box>
            {recipe?.ingredients.length
              ? recipe.ingredients.map((item, idx) => (
                  <Typography key={idx}>
                    &bull;{" "}
                    {`${convertToFraction(Number(item.amount))} ${
                      item?.measurementUnit?.description ?? ""
                    } ${item?.ingredient.name}`}
                  </Typography>
                ))
              : "No ingredients"}
          </Box>
          <Divider sx={{ marginY: 3 }} textAlign="center">
            <Typography variant="h4" sx={{ fontSize: "20px", color: "grey" }}>
              Instructions
            </Typography>
          </Divider>
          <Box>
            {recipe?.instructions.length
              ? recipe.instructions.map((item, idx) => (
                  <Typography key={idx}>&bull; {item.instruction}</Typography>
                ))
              : "No ingredients"}
          </Box>

          {user?.id === recipe?.createdBy && (
            <Box sx={{ marginTop: 4 }}>
              <MainModal buttonLabel="Edit">
                <EditRecipeForm initialValues={editInitialValues} />
              </MainModal>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

export default RecipeDetail;
