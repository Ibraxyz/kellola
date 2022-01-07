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
    return (
        <Dialog open={isOpen}>
            <DialogTitle textAlign={'center'}>Your Cart</DialogTitle>
            <DialogContent>
                {
                    cart === undefined ? <></> : Object.keys(cart).length === 0 ? <Box><Typography variant={'subtitle2'}>Cart is Empty.</Typography></Box> : Object.keys(cart).map((key) => {
                        const rowsArr = [];
                        Object.keys(cart).forEach((c) => {
                            rowsArr.push(cart[c]);
                        })
                        console.log(rowsArr);
                        return (
                            <RMSCleanTable tableHead={['name', 'qty', 'price', 'total']} rows={rowsArr} />
                        )
                    })
                }
            </DialogContent>
            <DialogActions>
                <Button startIcon={<CancelIcon />} onClick={() => handleClose()} >Cancel</Button>
                <Button startIcon={<AddShoppingCartIcon />} variant={'contained'} onClick={() => {

                }}>Order Now</Button>
            </DialogActions>
        </Dialog>
    )
}

export default KCDialogCart;