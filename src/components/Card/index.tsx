import { useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
} from "@mui/material";
import defaultImage from "/img/default-image.jpg";
import FavoriteIcon from "@mui/icons-material/Favorite";
import useToggle from "../../hooks/useToggle";
import {
  useAddFavoriteRecipeMutation,
  useRemoveFavoriteRecipeMutation,
} from "../../service/foodieService";

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
  cardData: {
    id: string;
    title: string;
    subheader?: string;
    image: string | null;
    isLiked: boolean;
  };
  children: JSX.Element;
}) {
  const user = useSelector((state: any) => state.app.authUser as any) as any;
  const [value, toggleValue] = useToggle(cardData.isLiked);
  const [addFavoriteRecipe] = useAddFavoriteRecipeMutation();
  const [removeFavoriteRecipe] = useRemoveFavoriteRecipeMutation();

  const addOrRemoveFavorite = async (
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    userId: string,
    recipeId: string,
  ) => {
    evt.preventDefault();

    if (value) {
      removeFavoriteRecipe({ userId, recipeId });
    } else {
      addFavoriteRecipe({ userId, recipeId });
    }

    toggleValue(!value);
  };

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
          textTransform: "capitalize",
        }}
        subheaderTypographyProps={{
          fontSize: 11,
        }}
        title={cardData?.title}
        subheader={cardData?.subheader || "N/A"}
        action={
          <IconButton
            onClick={(evt) => addOrRemoveFavorite(evt, user?.id, cardData.id)}
          >
            <FavoriteIcon sx={{ color: `${value ? "#ee5050" : "inherit"}` }} />
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
