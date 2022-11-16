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
import defaultImage from '/img/default-image.jpg';
import StarBorderIcon from '@mui/icons-material/StarBorder';

/**
 * Individual list card that displays a recipe 
 * 
 * Props: 
 *    recipe: { recipeName, prepTime, cookingTime, mealType, recipeImage } 
 * State: none 
 * 
 * RecipeList -> ListCard
 */
function ListCard( {recipe }: {recipe : GetRecipes} ) {
    const { prepTime, cookingTime } = recipe;

    return (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Card sx={{ maxWidth: 345, boxShadow: 3, cursor: 'pointer' }}>
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
                    image={recipe.recipeImage || defaultImage}
                    alt="main-recipe-image"
                />
                <CardContent>
                    <Typography sx={{fontSize: '12px'}}>
                            Prep Time: {`${prepTime} minutes`}
                    </Typography>
                    <Typography sx={{fontSize: '12px'}}>
                        Cooking Time: {`${cookingTime} minutes`}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    )
}

export default ListCard; 