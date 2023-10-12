import { useEffect, useState, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import FoodieLoveApi from "../api/FoodieLoveApi";
import { GetRecipes } from "../interface";
import { Box, Grid, Typography } from "@mui/material";
import useTitle from "../hooks/useTitle";
import useDebounce from "../hooks/useDebounce";
import Card from "../components/Card";
import SearchBar from "../components/SearchBar";
import MainModal from "../components/MainModal";
import CreateRecipeForm from "../features/createRecipeForm/CreateRecipeForm";

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
  const [recipes, setRecipes] = useState<GetRecipes[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>();
  const [skip, setSkip] = useState<number>(0);
  const debounceValue = useDebounce(searchTerm);

  useTitle("Recipe Items");

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
      setSkip(recipes.length);
    }
  };

  useEffect(
    function fetchRecipes() {
      async function getAllRecipes() {
        try {
          const data = await FoodieLoveApi.getRecipes({
            recipeName: debounceValue,
            skip: skip,
          });

          if (skip === 0) {
            setRecipes(data);
          } else {
            setRecipes((recipes) => [...recipes, ...data]);
          }
        } catch (err) {
          console.error(err);
        }
      }
      getAllRecipes();
    },
    [debounceValue, skip],
  );

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
        <MainModal>
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
          {recipes.map((recipe, idx) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={idx}>
              <Link
                to={`/recipes/${recipe.id}`}
                style={{ textDecoration: "none" }}
              >
                <Card
                  cardData={{
                    title: recipe.recipeName,
                    subheader: recipe.mealType,
                    image: recipe.recipeImage,
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
