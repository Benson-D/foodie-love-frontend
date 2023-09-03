import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Box, Button, Card, CardHeader, CardContent, CardMedia, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import FoodieLoveApi from '../api/FoodieLoveApi';
import Loader from '../components/Loader';
import defaultImage from '/img/default-image.jpg';

function convertToFraction(num: number): string {
	if (Number.isInteger(num)) {
		return String(Math.round(num));
	}
  
	const denominator: number = 1 / num;
  
	const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
	const divisor: number = gcd(1, denominator);
  
	return `${1 / divisor}/${denominator / divisor}`;
}

const CardLayout = styled(CardContent)({
    cursor: 'pointer',
    '.MuiBox-root': {
      display: 'flex',
      justifyContent: 'space-between',
      paddingBottom: '8px',
    },
    '.MuiTypography-root': {
      fontSize: '15px'
    },
});

function RecipeDetail() {
	const { id } = useParams();

	const { isLoading, data: recipe } = useQuery({
		queryKey: ['recipe'],
		queryFn: async () => await FoodieLoveApi.getSingleRecipe(String(id))
	});

	if (isLoading) {
		return <Loader />
	}

	const currentRecipe = recipe;
	
	console.log(currentRecipe, 'check values');
	return (
		<Box sx={{ marginTop: 5 }}>
			<Card sx={{ maxWidth: { xs: 380, sm: 550, md: 700 }, boxShadow: 3, cursor: 'pointer', margin: '0 auto' }}>
				<CardHeader title={currentRecipe?.recipeName} 
							subheader={currentRecipe?.mealType}
							action={<Button component={Link} to={'/recipes'}>Back</Button>}/>
				<CardMedia
                    component="img"
                    height="300"
                    image={currentRecipe?.recipeImage ?? defaultImage}
                    alt="fight-map"
                />
				<CardLayout>
					<Box>
						<Typography sx={{fontSize: '12px'}}>
							Prep Time: {currentRecipe?.prepTime}
						</Typography>
						<Typography sx={{fontSize: '12px'}}>
							Cooking Time: {currentRecipe?.cookingTime}
						</Typography>
					</Box>
					<Box sx={{ display: 'block !important'}}>
						<Typography variant="h4">Ingredients</Typography>
						{currentRecipe?.ingredients.length ? 
							(currentRecipe.ingredients.map((item, idx) => (
								<Typography sx={{ textAlign: 'center' }} key={idx}>
									{`${convertToFraction(Number(item.amount))} ${item?.measurement ?? ''} ${item.ingredient}`}
								</Typography>
							))) : ''	
					}
					</Box>
				</CardLayout>

			</Card>
		</Box>
	)
}

export default RecipeDetail;