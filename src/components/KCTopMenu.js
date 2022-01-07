import React from 'react';
import { Box, Chip, Skeleton } from '@mui/material';
import md5 from 'md5';

const KCTopMenu = (props) => {
    const { menus, handleClick, isActive } = props;
    return (
        <Box sx={{ marginTop: '10px', marginBottom: '20px' }}>
            {
                menus.map((menu) => {
                    return (
                        <Chip color={menu.isActive ? 'secondary' : 'default'} key={md5(menu.text + menu.value)} label={menu.text} onClick={() => handleClick(menu.value)} sx={{ marginRight: '10px' }} />
                    )
                })
            }
        </Box>
    )
}

export default KCTopMenu;