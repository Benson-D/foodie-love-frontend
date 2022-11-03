import {Routes, Route} from "react-router-dom";
import HomePage from "../components/HomePage";
import RecipeList from "../pages/RecipeList";
import RecipeForm from "../pages/RecipeForm";

/**
 * Main Router for Foodie App
 * 
 * Props: none 
 * State: none
 */
function FoodieRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/recipes" element={<RecipeList/>} />
            <Route path="/create-recipe" element={<RecipeForm/>} />
        </Routes>
    );
}

export default FoodieRoutes;