import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
//icons
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CancelIcon from '@mui/icons-material/Cancel';

const KCQtyDialog = (props) => {
    const { isOpen, name, qty, handleChange, handleClose, handleAddToCart } = props;
    return (
        <Dialog open={isOpen}>
            <DialogTitle textAlign={'center'}>Qty for {name}</DialogTitle>
            <DialogContent>
                <TextField type={"number"} value={qty < 1 ? 1 : qty} onChange={(e)=>handleChange(e.target.value)} />
            </DialogContent>
            <DialogActions>
                <Button color={'error'} startIcon={<CancelIcon />} onClick={handleClose} >Cancel</Button>
                <Button color={'success'} startIcon={<AddShoppingCartIcon />} variant={'contained'} onClick={handleAddToCart}>Add</Button>
            </DialogActions>
        </Dialog>
    )
}

export default KCQtyDialog;