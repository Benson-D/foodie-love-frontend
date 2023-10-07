import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import RecipeList from "../pages/RecipeList";
import NotFound from "../pages/NotFound";
import RecipeDetail from "../pages/RecipeDetail";
import LoginAuth from "../pages/LoginAuth";
import LoginSuccess from "../pages/LoginSuccess";

/**
 * Main Router for Foodie App
 *
 * Props: none
 * State: none
 *
 * App -> Routes ->{ HomePage, RecipeList, RecipeForm }
 */
function FoodieRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/recipes" element={<RecipeList />} />
      <Route path="/recipes/:id" element={<RecipeDetail />} />
      <Route path="/login" element={<LoginAuth />} />
      <Route path="login/success" element={<LoginSuccess />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default FoodieRoutes;
