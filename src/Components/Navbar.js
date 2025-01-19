import { Box } from '@mui/material';
import  React from 'react';


const Navbar = () => {
    return (
        <Box
            sx={{
                padding: 2,
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                position: 'sticky',
                top: 0,
                zIndex: 1,
                width: '100%',
                boxSizing: 'border-box',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
            }}
        >
        </Box>
    );
};

export default Navbar;
