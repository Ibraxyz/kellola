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
    const editItem = (key, type) => {
        const newCart = { ...cart };
        switch (type) {
            case "inc":
                newCart[key]['qty'] = parseInt(newCart[key]['qty']) + 1;
                newCart[key]['total'] = parseInt(newCart[key]['total']) + parseInt(newCart[key]['price']);
                break;
            case "dec":
                if (newCart[key]['qty'] > 1) {
                    newCart[key]['qty'] = parseInt(newCart[key]['qty']) - 1;
                    newCart[key]['total'] = parseInt(newCart[key]['total']) - parseInt(newCart[key]['price']);
                }
                break;
            default:
                break;
        }
        updateCurrentCart(newCart);
    }
    const displayTable = (obj) => {
        const keys = Object.keys(obj);
        const objArr = keys.map((key) => {
            return {
                ...obj[key],
                inc: () => {
                    editItem(key, 'inc');
                },
                dec: () => {
                    editItem(key, 'dec');
                },
                hapus: () => {
                    deleteItem(key);
                },
            };
        });
        return (
            <RMSCleanTable tableHead={['name', 'total', 'action']} rows={objArr} />
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
                <Button color={'error'} startIcon={<CancelIcon />} onClick={() => handleClose()} >Tutup</Button>
                <Button color={'success'} startIcon={<AddShoppingCartIcon />} variant={'contained'} onClick={() => {

                }} disabled={Object.keys(cart).length === 0} >Order</Button>
            </DialogActions>
        </Dialog>
    )
}

export default KCDialogCart;