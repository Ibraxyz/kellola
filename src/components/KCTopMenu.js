import React from 'react';
import { Box, Chip, Skeleton } from '@mui/material';

const KCTopMenu = (props) => {
    const { menus, handleClick } = props;
    return (
        <Box sx={{ marginTop: '10px', marginBottom: '20px' }}>
            {
                menus.map((menu) => {
                    return (
                        <Chip label={menu.text} onClick={() => handleClick(menu.value)} sx={{ marginRight: '10px' }} />
                    )
                })
            }
        </Box>
    )
}

export default KCTopMenu;