import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, Divider, Skeleton } from '@mui/material';
import RMSCleanTable from '../components/RMSCleanTable';
import { db } from '../';
import { doc, getDoc } from 'firebase/firestore';
//redux
import { useSelector } from "react-redux";
import useSnackbar from '../hooks/useSnackbar';
//comps
import RMSSnackbar from '../components/RMSSnackbar';

const KCPesananBar = (props) => {
    const [ic_st_orders, ic_st_setOrders] = useState([]);
    const [ic_st_isLoading, ic_st_setIsLoading] = useState(false);
    //hooks
    const [h_st_isSnackbarShown, h_st_message, h_st_severity, h_sf_showSnackbar, h_sf_closeSnackbar] = useSnackbar();
    //redux 
    const r_currentTableNumber = useSelector((state) => state.currentTableNumber);
    //get order
    const getOrder = async () => {
        if (r_currentTableNumber === undefined) {
            h_sf_showSnackbar('Belum ada pesanan', 'error');
        } else {
            try {
                ic_st_setIsLoading(true);
                const docSnap = await getDoc(doc(db, `order/${r_currentTableNumber}`));
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
    }
    useEffect(() => {
        //getting current customer order
        getOrder();
    }, [])
    return (
        <Box>
            <Paper>
                <Box sx={{ padding: '10px' }}>
                    <Typography variant={'subtitle2'}> Pesanan Bar </Typography>
                </Box>
                <Divider />
                <Box sx={{ padding: '10px' }}>
                    {
                        ic_st_isLoading ?
                            <Skeleton variant={'rectangular'} width={'100%'} height={400} /> :
                            <RMSCleanTable
                                tableHead={["name", "meja", "status", "tindakan-bar"]}
                                rows={ic_st_orders}
                            />
                    }
                </Box>
            </Paper>
            {/** RMS Snackbar */}
            <RMSSnackbar
                isOpen={h_st_isSnackbarShown}
                message={h_st_message}
                severity={h_st_severity}
                handleClose={h_sf_closeSnackbar}
            />
        </Box>
    )
}

export default KCPesananBar;