import {Box, Typography } from "@mui/material";
import "./HomePage.css";

const homePageDesign = {
    py: 7, 
    pl: 3, 
    color: 'white'
};


function HomePage() {
    return (
        <Box sx={homePageDesign} className="foodieHome" component="section">
            <Typography variant="h3">Welcome To Foodie Love!</Typography>
            <p>A place to keep your recipes in check</p>
        </Box>
    );
}


export default HomePage;