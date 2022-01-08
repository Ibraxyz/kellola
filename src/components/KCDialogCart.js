import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, Box } from '@mui/material';
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
    const { isOpen, cart, nomorMeja, handleClose, handleOrder, handleChange } = props;
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
        console.log('cart', JSON.stringify(cart));
        console.log('{...cart', JSON.stringify({ ...cart }))
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
    const getTotal = () => {
        let total = 0;
        Object.keys(cart).forEach((c) => {
            total += parseInt(cart[c]['total']);
        })
        return total;
    }
    return (
        <Dialog open={isOpen}>
            <DialogTitle textAlign={'center'}>Your Cart</DialogTitle>
            <DialogContent>
                {
                    displayTable(cart)
                }
                <Box sx={{ padding: '10px' }} textAlign={'right'}>
                    <Typography variant={'subtitle2'}>Total : Rp {formatRupiah(getTotal())}</Typography>
                </Box>
                <TextField type={'text'} label={'Nomor Meja'} value={nomorMeja} sx={{ marginTop: '5px', width: '100%' }} onChange={(e) => {
                    handleChange(e.target.value)
                }} />
            </DialogContent>
            <DialogActions>
                <Button color={'error'} startIcon={<CancelIcon />} onClick={() => handleClose()} >Tutup</Button>
                <Button color={'success'} startIcon={<AddShoppingCartIcon />} variant={'contained'} onClick={handleOrder} disabled={Object.keys(cart).length === 0} >Order</Button>
            </DialogActions>
        </Dialog>
    )
}

export default KCDialogCart;