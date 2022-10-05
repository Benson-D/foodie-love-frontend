import { BrowserRouter } from 'react-router-dom';
import NavBar from './routes/NavBar';
import FoodieRoutes from './routes/FoodieRoutes';

function App() {
  return (
    <div className="Foodie-Container">
      <BrowserRouter>
        <NavBar/>
        <FoodieRoutes/>
      </BrowserRouter>
    </div>
  );
}

export default App;
