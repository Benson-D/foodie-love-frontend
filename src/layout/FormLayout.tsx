import { Box, Container, Paper, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FoodBankIcon from '@mui/icons-material/FoodBank';

const formTheme = createTheme({
    palette: {
        primary:  {
            main: '#06a696'
        }
    },
    components: {
        MuiTypography: {
            styleOverrides: {
                root: {
                    color: '#fff'
                }
            },
            variants: [
                {
                    props: { variant: 'h4' },
                    style: {
                        padding: '10px 0',
                        backgroundColor: '#06a696',
                        textAlign: 'center'
                    }
                }
            ]

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
            <Container component="section" sx={{maxWidth: '45rem'}}>
                <Paper 
                    variant="outlined" 
                    sx={{my: {xs: 3, md: 6 }, boxShadow: 2}}>
                    <Typography component="h1" variant="h4">
                        {title}
                        <FoodBankIcon sx={{ml: 2, fontSize: '40px'}}/>
                    </Typography>
                    <Box sx={{p: { xs: 2, md: 5}}}>
                        {children}
                    </Box>
                </Paper>
            </Container>
        </ThemeProvider>
    )
}


export default FormLayout;