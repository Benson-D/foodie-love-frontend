import {Routes, Route} from "react-router-dom";
import HomePage from "../HomePage";
import RecipeList from "../recipes/RecipeList";
import RecipeForm from "../recipes/RecipeForm";

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