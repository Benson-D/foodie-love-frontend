import { BrowserRouter } from "react-router-dom";
import FoodieRoutes from "./routes/FoodieRoutes";

/**
 * Renders foodie app
 *
 * prop: none
 * state: none
 *
 * Index -> App -> {Routes, Nav}
 */
function App() {
  return (
    <div className="Foodie-Container">
      <BrowserRouter>
        <FoodieRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
