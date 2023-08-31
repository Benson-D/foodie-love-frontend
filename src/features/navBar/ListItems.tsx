import { 
    Box, 
    List, 
    ListItem, 
    ListItemButton, 
    ListItemIcon, 
    ListItemText 
} from '@mui/material';
import { Link } from 'react-router-dom';

interface ListProps {
    title: string;
    link: string;
    icon?: JSX.Element;
}

/** 
 * Main Component that displays a list of item
 */
function ListItems({ handleToggle, listItems }: { 
    handleToggle: () => void;
    listItems: ListProps[]
}) {
    return (
        <Box onClick={handleToggle} sx={{ textAlign: 'center' }}>
            <List>
                {listItems.map((item, idx) => (
                    <ListItem key={idx}>
                        <ListItemButton component={Link} 
                                        to={item.link}>
                            {item?.icon && (
                                <ListItemIcon sx={{ minWidth: 40 }}>
                                    {item.icon}
                                </ListItemIcon> )}
                            <ListItemText primary={item.title} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

        </Box>
    )
};

export default ListItems; 