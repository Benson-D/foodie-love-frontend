import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
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
import FoodieLoveApi from "../api/FoodieLoveApi";
import Loader from "../components/Loader";
import defaultImage from "/img/default-image.jpg";

function convertToFraction(num: number): string {
  if (Number.isInteger(num)) {
    return String(Math.round(num));
  }

  const wholeNumberPart = Math.floor(num);
  const decimalPart = num - wholeNumberPart;

  const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
  const denominator: number = 1 / decimalPart;
  const divisor: number = gcd(1, denominator);

  const wholeNumberFraction = wholeNumberPart > 0 ? `${wholeNumberPart} ` : "";

  return wholeNumberFraction + `${1 / divisor}/${denominator / divisor}`;
}

const convertTimeToFormattedString = (
  foodieTime: string | null | undefined,
): string => {
  if (!foodieTime) return "0 minutes";

  const minuteStatement = Number(foodieTime) > 1 ? "minutes" : "minute";
  return `${foodieTime} ${minuteStatement}`;
};

function RecipeDetail() {
  const { id } = useParams();

  const { isLoading, data: recipe } = useQuery({
    queryKey: ["recipe"],
    queryFn: async () => await FoodieLoveApi.getSingleRecipe(String(id)),
  });

  if (isLoading) {
    return <Loader />;
  }

  const currentRecipe = recipe;

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
          title={currentRecipe?.name}
          subheader={currentRecipe?.mealType}
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
          image={currentRecipe?.recipeImage ?? defaultImage}
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
              {convertTimeToFormattedString(currentRecipe?.prepTime)}
            </Typography>
            <Typography sx={{ fontSize: "15px" }}>
              {convertTimeToFormattedString(currentRecipe?.cookingTime)}
            </Typography>
          </Box>
          <Divider sx={{ marginY: 3 }} textAlign="center">
            <Typography variant="h4" sx={{ fontSize: "20px", color: "grey" }}>
              Ingredients
            </Typography>
          </Divider>
          <Box>
            {currentRecipe?.ingredients.length
              ? currentRecipe.ingredients.map((item, idx) => (
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
            {currentRecipe?.instructions.length
              ? currentRecipe.instructions.map((item, idx) => (
                  <Typography key={idx}>&bull; {item.instruction}</Typography>
                ))
              : "No ingredients"}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default RecipeDetail;
