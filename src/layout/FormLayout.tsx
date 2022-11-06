import { Container, Paper, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FoodBankIcon from '@mui/icons-material/FoodBank';

const formTheme = createTheme({
    palette: {
        primary:  {
            main: '#06a696'
        }
    }

});

/**
 * General Form Layout  
 * 
 * Props: 
 *      children: JSX.Element
 *  State: none 
 */
function FormLayout(props: { children: JSX.Element, title: string }) {
    const { children, title } = props;

    return (
        <ThemeProvider theme={formTheme}>
            <Container component="section">
                <Paper 
                    variant="outlined" 
                    sx={{my: {xs: 3, md: 6 }, p: { xs: 2, md: 5}, boxShadow: 2}}>
                    <Typography component="h1" variant="h4" align="center">
                        {title}
                    <FoodBankIcon sx={{ml: 2, fontSize: '40px'}}/>
                </Typography>
                    {children}
                </Paper>
            </Container>
        </ThemeProvider>
    )
}


export default FormLayout;