import React from 'react';
import { Stack, Button, LinearProgress, Chip, Box, Typography, Grid, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import md5 from 'md5';
//icons
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CancelIcon from '@mui/icons-material/Cancel';
import { formatRupiah } from '../rms-utility/rms-utility';
import RMSCleanTable from '../components/RMSCleanTable';
//redux
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from 'redux';
import { actionCreators } from "../state/index";

const KCDialogCart = (props) => {
    //redux
    const dispatch = useDispatch();
    const { updateCurrentCart } = bindActionCreators(actionCreators, dispatch);
    //props
    const { isOpen, cart, handleClose } = props;
    const deleteItem = (key) => {
        const newCart = {}
        Object.keys(cart).forEach((k) => {
            if (k !== key) {
                newCart[k] = cart[k];
            }
        })
        updateCurrentCart(newCart);
    }
    const editItem = (key) => {

    }
    const displayTable = (obj) => {
        const keys = Object.keys(obj);
        const objArr = keys.map((key) => {
            return {
                ...obj[key],
                edit: () => {
                    editItem(key);
                },
                hapus: () => {
                    deleteItem(key);
                },
            };
        });
        return (
            <RMSCleanTable tableHead={['name', 'qty', 'price', 'total', 'aksi']} rows={objArr} />
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