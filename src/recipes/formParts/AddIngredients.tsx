import { Grid, Typography, Button } from '@mui/material';
import { useState, useContext } from "react"; 
import FoodieFormContext from '../FoodieFormContext';
import { v4 as uuidv4 } from "uuid";
import { GeneralList, IngredientItems } from "../Interface/formInterface";
import Ingredient from './Ingredient';


const generalIngredientList: GeneralList = { 
    amount: '',
    measurement: '',
    ingredient: ''
};

const starterList = Array(5).fill({}).map(() => ({
    id: uuidv4(),
    ...generalIngredientList
}));

function AddIngredients({handleIngredient }: { 
    handleIngredient: (formData: IngredientItems[]) => void 
}) {
    const [currentList, setCurrentList] = useState<IngredientItems[]>(starterList);
    const foodie = useContext(FoodieFormContext); 

    const addListItem = () => {
        const addIngredientList = currentList.concat({
            id: uuidv4(),
            ...generalIngredientList 
        });

        setCurrentList(addIngredientList);
    };

    function handleChange(idx: number, evt: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = evt.target;
        const formValues:IngredientItems[] = [...currentList];

        formValues[idx][name as keyof IngredientItems] = value;
        setCurrentList(formValues);
        handleIngredient(currentList);
    }

    const removeListItem = (id: string) => {
        setCurrentList(
            (currentList) => currentList.filter((list) => list.id !== id));
    }

    let componentDisplay = foodie?.formSteps === 1 ? 'block' : 'none';

    return (
        <div style={{ display: componentDisplay }}>
            <Typography variant="h6" gutterBottom>
                Ingredient List
            </Typography>
            <Grid container spacing={3}>
                {currentList.map((listItem: IngredientItems, idx: number) => (
                    <Ingredient 
                        key={listItem.id}
                        index={idx}
                        listItem={listItem} 
                        removeItem={removeListItem}
                        handleChange={handleChange}/>
                ))}
            </Grid>
            <Button sx={{ my: 3}} onClick={addListItem}>Add Ingredient</Button>
        </div>
    );
}


export default AddIngredients;