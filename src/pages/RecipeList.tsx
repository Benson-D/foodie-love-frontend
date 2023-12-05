import { useState, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";
import { useGetAllRecipesQuery } from "../service/recipeService";
import useTitle from "../hooks/useTitle";
import useDebounce from "../hooks/useDebounce";
import Card from "../components/Card";
import SearchBar from "../components/SearchBar";
import MainModal from "../components/MainModal";
import Loader from "../components/Loader";
import CreateRecipeForm from "../features/recipeForm/CreateRecipeForm";

/**
 * Displays a list of recipes created
 *
 * Props: none
 * State:
 *     recipes: [{recipe1}, {recipe2}, etc...]
 *
 * Routes -> RecipeList
 */
function RecipeList() {
  const [searchTerm, setSearchTerm] = useState<string>();
  const [skip, setSkip] = useState<number>(0);
  const debounceValue = useDebounce(searchTerm);
  const { data, isLoading } = useGetAllRecipesQuery({
    recipeName: debounceValue,
    skip: skip,
  });

  useTitle("Recipe Items");

  const recipes = data?.recipes;

  /** Handles search event handler, updates state */
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.trim());

    if (e.target.value.trim() || e.target.value.trim() === "") {
      setSkip(0);
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { offsetHeight, scrollTop, scrollHeight } = e.currentTarget;

    if (offsetHeight + scrollTop >= scrollHeight - 5) {
      setSkip(recipes?.length ?? 0);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box minHeight="100vh">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: { xs: "column-reverse", sm: "row" },
          px: 5,
          py: 2,
        }}
      >
        <MainModal buttonLabel="Create Recipe">
          <CreateRecipeForm />
        </MainModal>
        <Box
          sx={{
            marginBottom: { xs: 2, sm: 0 },
            width: { xs: "100%", sm: "auto" },
          }}
        >
          <SearchBar handleSearch={handleSearch} />
        </Box>
      </Box>
      <Box
        sx={{ height: "calc(100vh - 100px)", overflowY: "auto" }}
        onScroll={handleScroll}
      >
        <Grid container spacing={2} sx={{ padding: 5 }}>
          {recipes?.map((recipe, idx) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={idx}>
              <Link
                to={`/recipes/${recipe.id}`}
                style={{ textDecoration: "none" }}
              >
                <Card
                  cardData={{
                    id: recipe.id,
                    title: recipe.name,
                    subheader: recipe.mealType ?? "other",
                    image: recipe.recipeImage,
                    isLiked: recipe.user.length > 0,
                  }}
                >
                  <>
                    <Typography sx={{ fontSize: "12px" }}>
                      Prep Time: {`${recipe?.prepTime} minutes`}
                    </Typography>
                    <Typography sx={{ fontSize: "12px" }}>
                      Cooking Time: {`${recipe.cookingTime} minutes`}
                    </Typography>
                  </>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default RecipeList;
