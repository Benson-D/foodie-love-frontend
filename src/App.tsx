import { BrowserRouter } from "react-router-dom";
import NavBar from "./features/navBar/NavBar";
import FoodieRoutes from "./routes/FoodieRoutes";
import { useSelector } from "react-redux";

/**
 * Renders foodie app
 *
 * prop: none
 * state: none
 *
 * Index -> App -> {Routes, Nav}
 */
function App() {
  const user = useSelector((state: any) => state.app.authUser as any) as any;

  console.log(user, "current user data");

  return (
    <div className="Foodie-Container">
      <BrowserRouter>
        <NavBar />
        <FoodieRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
