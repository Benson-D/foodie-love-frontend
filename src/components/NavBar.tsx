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
import useToggle from '../hooks/useToggle';
import SideModal from './SideModal';
import ListItems from './ListItems';
import { navItems } from '../data/navLinks';

/**
 * Main nav bar for Foodie Recipe page, 
 * responsive and can open close menu bar in mobile display
 * 
 * Props: none 
 * State: none 
 * 
 * App -> Nav
 */
function NavBar() {
    const [value, toggleValue] = useToggle();
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
                                    sx={{ color: '#fff', ml: 1 }}>
                                {item.title}
                            </Button>
                        ))}
                    </Box>
                    <IconButton color="inherit"
                                aria-label="open drawer"
                                onClick={() => toggleValue()}
                                sx={{ display: { sm: 'none' } }} >
                                    <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            
            <SideModal modalOpen={value} 
                       handleToggle={() => toggleValue()}>
                        <ListItems handleToggle={() => toggleValue()}
                                   listItems={navItems}/>
            </SideModal>
        </Box>
    );
}; 

export default NavBar;