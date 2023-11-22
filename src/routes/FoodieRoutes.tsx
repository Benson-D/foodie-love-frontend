import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import ProtectedRoutes from "./ProtectedRoutes";
import NavLayout from "./NavLayout";
import HomePage from "../pages/HomePage";
import RecipeList from "../pages/RecipeList";
import NotFound from "../pages/NotFound";
import RecipeDetail from "../pages/RecipeDetail";
import LoginAuth from "../pages/LoginAuth";
import LoginSuccess from "../pages/LoginSuccess";
import LoginError from "../pages/LoginError";

/** Main Router for Foodie App */
function FoodieRoutes() {
  const user = useSelector((state: RootState) => state.app.authUser);

  return (
    <Routes>
      <Route element={<NavLayout />}>
        {/* Public Routes */}
        <Route index element={<HomePage />} />
        <Route path="/login" element={<LoginAuth />} />
        {/* Protected Routes */}
        <Route element={<ProtectedRoutes user={user} />}>
          <Route path="/recipes" element={<RecipeList />} />
          <Route path="/recipes/:id" element={<RecipeDetail />} />
        </Route>
      </Route>
      <Route path="login/success" element={<LoginSuccess />} />
      <Route path="login/error" element={<LoginError />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default FoodieRoutes;
