import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import RecipeList from '../pages/RecipeList';
import RecipeForm from '../pages/RecipeForm';
import NotFound from '../pages/NotFound';

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
            <Route path="/" element={<HomePage/>} />
            <Route path="/recipes" element={<RecipeList/>} />
            <Route path="*" element={<NotFound/>} />
        </Routes>
    );
}

export default FoodieRoutes;