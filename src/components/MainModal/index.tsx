import { ReactNode } from 'react';
import useToggle from '../../hooks/useToggle';
import { Modal, Box, Button, useMediaQuery, useTheme } from '@mui/material';

function MainModal({ children}: { children: ReactNode }) {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const isMediumScreen = useMediaQuery(theme.breakpoints.between('md', 'lg'));
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('xl'));
  
    const getModalWidth = () => {
      if (isSmallScreen) {
        return 375;
      } else if (isMediumScreen) {
        return 600;
      } else if (isLargeScreen) {
        return 800;
      } else {
        return 'auto'; // Default width for other screen sizes
      }
    };

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: getModalWidth(),
        bgcolor: 'background.paper',
        border: '1px solid #000',
        boxShadow: 20,
		maxHeight: '90vh', // Set a maximum height for the content
		overflowY: 'auto',
      };

    const [value, toggleValue] = useToggle();  
    const handleOpen = () => toggleValue(true);
    const handleClose = () => toggleValue(false);

    return (
        <div style={{ width: isSmallScreen ? '100%' : 'auto' }}>
        	<Button onClick={handleOpen} sx={{ width: isSmallScreen ? '100%' : 'auto' }}>
				Create Recipe
			</Button>
			<Modal
				open={value}
				onClose={handleClose}
			>
				<Box sx={style}>
					{children}
				</Box>
			</Modal>
        </div>
    );
}

export default MainModal;