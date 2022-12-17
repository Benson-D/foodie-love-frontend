import { Link } from 'react-router-dom';
import { Box, Typography, Button } from "@mui/material";
import useTitle from "../hooks/useTitle";


function NotFound() {
    useTitle('Foodie Love'); 

    return (
        <Box sx={{ mt: 5, pl: 3 }}>
            <Typography variant="h2">404</Typography>
            <Typography variant="h4" sx={{ fontSize: 24, color: '#909090' }}>
                Whoops, we sincerely apologize!
            </Typography>
            <Typography variant="h6" sx={{ fontSize: 14, mt: 1, color: '#909090' }}>
                The page you're looking for is no longer here or it doesn’t exist.
            </Typography>
            <Button component={Link} to="/" sx={{ mt: 2 }}>
                Go Home
            </Button>
        </Box>
    );
};

export default NotFound; 
