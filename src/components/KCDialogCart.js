import React from 'react';
import { Stack, Button, LinearProgress, Chip, Box, Typography, Grid, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import md5 from 'md5';
//icons
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CancelIcon from '@mui/icons-material/Cancel';
import { formatRupiah } from '../rms-utility/rms-utility';
import RMSCleanTable from '../components/RMSCleanTable';

const KCDialogCart = (props) => {
    const { isOpen, cart, handleClose } = props;
    const displayTable = (obj) => {
        const keys = Object.keys(obj);
        const objArr = keys.map((key) => {
            return obj[key];
        });
        return (
            <RMSCleanTable tableHead={['name', 'qty', 'price', 'total']} rows={objArr} />
        );
    }
    return (
        <Dialog open={isOpen}>
            <DialogTitle textAlign={'center'}>Your Cart</DialogTitle>
            <DialogContent>
                {
                    displayTable(cart)
                }
            </DialogContent>
            <DialogActions>
                <Button startIcon={<CancelIcon />} onClick={() => handleClose()} >Cancel</Button>
                <Button startIcon={<AddShoppingCartIcon />} variant={'contained'} onClick={() => {

                }}>Order</Button>
            </DialogActions>
        </Dialog>
    )
}

export default KCDialogCart;