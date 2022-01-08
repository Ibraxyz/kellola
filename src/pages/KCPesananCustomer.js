import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, Divider, Skeleton } from '@mui/material';
import RMSCleanTable from '../components/RMSCleanTable';
import { db } from '../';
import { doc, getDoc } from 'firebase/firestore';

const KCPesananCustomer = (props) => {
    const [ic_st_orders, ic_st_setOrders] = useState([]);
    const [ic_st_isLoading, ic_st_setIsLoading] = useState(false);
    //get order
    const getOrder = async () => {
        try {
            ic_st_setIsLoading(true);
            const docSnap = await getDoc(doc(db, `order/${1}`));
            console.log(JSON.stringify(docSnap.data()['list']))
            if (docSnap.exists()) {
                ic_st_setOrders(docSnap.data()['list']);
            }
            ic_st_setIsLoading(false);
        } catch (err) {
            console.log(err.message);
            ic_st_setIsLoading(false);
        }
    }
    useEffect(() => {
        //getting current customer order
        getOrder();
    }, [])
    return (
        <Box>
            <Paper>
                <Box sx={{ padding: '10px' }}>
                    <Typography variant={'subtitle2'}> Pesanan Saya </Typography>
                </Box>
                <Divider />
                <Box sx={{ padding: '10px' }}>
                    {
                        ic_st_isLoading ?
                            <Skeleton variant={'rectangular'} width={'100%'} height={400} /> :
                            <RMSCleanTable
                                tableHead={["name", "meja", "status", "tindakan"]}
                                rows={ic_st_orders}
                            />
                    }
                </Box>
            </Paper>
        </Box>
    )
}

export default KCPesananCustomer;