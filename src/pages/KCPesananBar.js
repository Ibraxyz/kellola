import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, Divider, Skeleton } from '@mui/material';
import RMSCleanTable from '../components/RMSCleanTable';
import { db } from '../';
import { getDocs, collection, query, where } from 'firebase/firestore';
//redux
import { useSelector } from "react-redux";
import useSnackbar from '../hooks/useSnackbar';
//comps
import RMSSnackbar from '../components/RMSSnackbar';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import usePesanan from '../hooks/usePesanan';

const KCPesananBar = (props) => {
    const [ic_st_isLoading, ic_st_orders, h_st_isSnackbarShown, h_st_message, h_st_severity, h_sf_showSnackbar, h_sf_closeSnackbar] = usePesanan('drink');
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
                            ic_st_orders.map((order) => {
                                return (
                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Typography>Meja No. {order.id}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <RMSCleanTable
                                                tableHead={["name", "meja", "status", "tindakan-diperlukan"]}
                                                rows={order['list']}
                                            />
                                        </AccordionDetails>
                                    </Accordion>
                                )
                            })
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