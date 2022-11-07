import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import homeImage from '../img/foodie-background.jpg';

const HomeLayout = styled('section')({
    backgroundImage: `url(${homeImage})`,
    backgroundPosition: 'bottom left',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    color: '#fff',
    height: '40vh',
    paddingTop: 56,
    paddingBottom: 56,
    paddingLeft: 26,
})

/**
 * Initial page when a user is signed in or not
 * 
 * Props: none
 * State: none  
 * 
 * Routes -> Homepage
 */
function HomePage() {
    return (
        <HomeLayout>
            <Typography variant="h3">Welcome To Foodie Love!</Typography>
            <p>A place to keep your recipes in check</p>
        </HomeLayout>
    );
}


export default HomePage;