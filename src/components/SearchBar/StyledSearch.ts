import { styled, alpha } from '@mui/material/styles';

export const StyledSearch = styled('div')(({ theme }) => ({
	backgroundColor: alpha(theme.palette.common.white, 0.15),
    width: '100%',
	[theme.breakpoints.up('md')]: {
		width: '94%',
	  },
}));