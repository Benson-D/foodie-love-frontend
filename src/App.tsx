import { BrowserRouter } from 'react-router-dom';
import NavBar from './components/NavBar';
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
