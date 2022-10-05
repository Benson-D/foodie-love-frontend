import { NavLink, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Stack, Button }  from '@mui/material';

const navStyles = {
    backgroundColor: 'white',
    borderBottom: 1,
    borderColor: 'text.secondary'
} as const;

const headerStyle = {
    textDecoration: 'none', 
    color: 'inherit'
} as const; 

const buttonStyle = {
    color: 'inherit',
    "&:hover": {
        backgroundColor: "#40d7966b"
    }
} as const; 

function NavBar() {
    return (
        <AppBar position="static" sx={navStyles}>
            <Toolbar sx={{ color: 'text.secondary' }}>
                <Typography variant="h6" 
                            component={Link} 
                            to="/" 
                            sx={headerStyle}>
                            Foodie Love
                </Typography>

                <Stack direction="row" spacing={2} sx={{flexGrow: 1}}>
                    <Button component={NavLink} 
                            to="/recipes" 
                            sx={{...buttonStyle, marginLeft: 'auto'}}>
                            Recipes
                    </Button>

                    <Button component={NavLink} 
                            to="/create-recipe"
                            sx={buttonStyle}>
                            Create Recipe
                    </Button>
                </Stack>
            </Toolbar>
        </AppBar>
    );
}; 

export default NavBar;