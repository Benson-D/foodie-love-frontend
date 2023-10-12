import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
} from "@mui/material";
import defaultImage from "/img/default-image.jpg";
import StarBorderIcon from "@mui/icons-material/StarBorder";

/**
 * Individual list card that displays a recipe
 *
 * Props:
 *    recipe: { id, recipeName, prepTime, cookingTime, mealType, recipeImage }
 * State: none
 *
 * RecipeList -> ListCard
 */
function FoodieCard({
  cardData,
  children,
}: {
  cardData: { title: string; subheader?: string; image: string | null };
  children: JSX.Element;
}) {
  return (
    <Card
      sx={{
        maxWidth: 345,
        boxShadow: 3,
        cursor: "pointer",
        margin: "0 auto",
      }}
    >
      <CardHeader
        titleTypographyProps={{
          fontSize: 14,
        }}
        subheaderTypographyProps={{
          fontSize: 11,
        }}
        title={cardData?.title}
        subheader={cardData?.subheader || "N/A"}
        action={
          <IconButton>
            <StarBorderIcon />
          </IconButton>
        }
      />
      <CardMedia
        component="img"
        height="194"
        image={cardData.image || defaultImage}
        alt="main-recipe-image"
      />
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export default FoodieCard;
