import HomeIcon from '@mui/icons-material/Home';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import AddBoxIcon from '@mui/icons-material/AddBox';

export const navItems = [ 
    { title: 'Home', link: '/', icon: <HomeIcon /> },
    { title: 'Recipes', link: '/recipes', icon: <RestaurantMenuIcon /> },
    { title: 'Create Recipe', link: '/create-recipe', icon: <AddBoxIcon /> }
]