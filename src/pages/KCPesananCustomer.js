import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, Divider } from '@mui/material';

const KCPesananCustomer = (props) => {
    const [ic_st_orders,ic_st_setOrders] = useState([]);
    useEffect(()=>{
        //getting current customer order
    },[])
    return (
        <Box>
            <Paper>
                <Box sx={{ padding: '10px' }}>
                    <Typography variant={'subtitle2'}> Pesanan Saya </Typography>
                </Box>
                <Divider />
                <Box sx={{ padding: '10px' }}>

                </Box>
            </Paper>
        </Box>
    )
}

export default KCPesananCustomer;