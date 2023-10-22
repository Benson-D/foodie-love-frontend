import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import ProtectedRoutes from "./ProtectedRoutes";
import HomePage from "../pages/HomePage";
import RecipeList from "../pages/RecipeList";
import NotFound from "../pages/NotFound";
import RecipeDetail from "../pages/RecipeDetail";
import LoginAuth from "../pages/LoginAuth";
import LoginSuccess from "../pages/LoginSuccess";
import LoginError from "../pages/LoginError";

/** Main Router for Foodie App */
function FoodieRoutes() {
  const user = useSelector((state: any) => state.app.authUser as any) as any;

  console.log(user, "<=== Current User for routes");

  return (
    <Routes>
      {/* Public Routes */}
      <Route index element={<HomePage />} />
      <Route path="/login" element={<LoginAuth />} />
      <Route path="login/success" element={<LoginSuccess />} />
      <Route path="login/error" element={<LoginError />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoutes user={user} />}>
        <Route path="/recipes" element={<RecipeList />} />
        <Route path="/recipes/:id" element={<RecipeDetail />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default FoodieRoutes;
