import { FormStepProps } from '../interface';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const delectIcon = {
    fontSize: '20px',
    color: 'hsl(0deg 0% 0% / 38%)',
    padding: '10px',
    "&:hover": {
        backgroundColor: '#ffe0e0',
        color: 'hsl(0deg 80% 61%)',
        
    }
} as const; 

/**
 * Deletes an individual item in Form Steps
 * 
 * Props: 
 *    index: number,
 *    removeItem: Formik Helper
 * State: none
 * 
 */
function DeleteItem({ index, removeItem }: FormStepProps) {
    return (
        <Button 
            type="button" 
            onClick={() => removeItem(index)} sx={
                { "&:hover": {
                    backgroundColor: 'transparent' }}}>
                <DeleteIcon sx={delectIcon}/>
        </Button>
    )

};

export default DeleteItem; 