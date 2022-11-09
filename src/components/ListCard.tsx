import { GetRecipes } from '../interface';
import { 
    Card, 
    CardContent, 
    CardHeader, 
    CardMedia, 
    Grid, 
    IconButton, 
    Typography 
} from '@mui/material';
import defaultImage from '../img/default-image.jpg';
import StarBorderIcon from '@mui/icons-material/StarBorder';

function ListCard( {recipe, key }: {recipe : GetRecipes, key: number} ) {
    return (
        <Grid key={key} item xs={6} sm={4}>
            <Card sx={{ maxWidth: 345 }}>
                <CardHeader 
                    titleTypographyProps={{
                        fontSize: 14,
                    }}
                    subheaderTypographyProps={{
                        fontSize: 11,
                    }}
                    title={recipe?.recipeName} 
                    subheader={recipe?.mealType || 'N/A'} 
                    action={
                        <IconButton>
                            <StarBorderIcon />
                        </IconButton>
                    }/>
                <CardMedia
                    component="img"
                    height="194"
                    image={defaultImage}
                    alt="main-recipe-image"
                />
                <CardContent>
                    <Typography sx={{fontSize: '12px'}}>
                            Prep Time: {`${recipe?.prepTime} minutes`}
                    </Typography>
                    <Typography sx={{fontSize: '12px'}}>
                        Cooking Time: {`${recipe?.cookingTime} minutes`}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    )
}

export default ListCard; 