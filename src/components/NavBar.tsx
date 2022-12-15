import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { 
    Box, 
    CssBaseline, 
    AppBar, 
    Toolbar, 
    Typography, 
    Button, 
    IconButton 
}  from '@mui/material';

const navItems = [ 
    { title: 'Home', link: '/' },
    { title: 'Recipes', link: '/recipes' },
    { title: 'Create Recipe', link: '/create-recipe' }
]

/**
 * Main nav bar for Foodie Recipe page
 * 
 * Props: none 
 * State: none 
 * 
 * App -> Nav
 */
function NavBar() {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar component="nav" 
                    position="static" 
                    sx={{ backgroundColor: '#04b597'}}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Foodie Love
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {navItems.map((item, idx) => (
                            <Button key={idx} 
                                    component={Link}
                                    to={item.link}
                                    sx={{ color: '#fff' }}>
                                {item.title}
                            </Button>
                        ))}
                    </Box>
                    <IconButton color="inherit"
                                aria-label="open drawer"
                                sx={{ display: { sm: 'none' } }} >
                                    <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    );
}; 

export default NavBar;