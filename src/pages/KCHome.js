import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';
import KCProductCard from '../components/KCProductCard';
import KCQtyDialog from '../components/KCQtyDialog';
import RMSSnackbar from '../components/RMSSnackbar';
import useSnackbar from '../hooks/useSnackbar';
//redux
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from 'redux';
import { actionCreators } from "../state/index";
import md5 from 'md5';

const KCHome = () => {
    //redux 
    const dispatch = useDispatch();
    const { updateCurrentCart } = bindActionCreators(actionCreators, dispatch);
    const r_currentPathState = useSelector((state) => state.currentPath);
    const r_currentLoginStatus = useSelector((state) => state.currentLoginStatus);
    const r_currentUser = useSelector((state) => state.currentUser);
    const r_currentCart = useSelector((state) => state.currentCart);
    const [ic_st_isQtyDialogOpen, ic_st_setIsQtyDialogOpen] = useState(false);
    const [ic_st_currentSelectedProd, ic_st_setCurrentSelectedProd] = useState({});
    //snackbar
    const [h_st_isSnackbarShown, h_st_message, h_st_severity, h_sf_showSnackbar, h_sf_closeSnackbar] = useSnackbar();
    //product mock
    const productmock = [
        {
            "id": "produk1",
            "name": "Nasi Goreng",
            "price": 15000,
            "imgSrc": "https://cdn.pixabay.com/photo/2016/10/23/09/37/fried-rice-1762493_960_720.jpg",
            "isAvailable": true,
            "description": "Description"
        },
        {
            "id": "produk2",
            "name": "Beef Burger",
            "price": 25000,
            "imgSrc": "https://cdn.pixabay.com/photo/2020/10/05/19/55/hamburger-5630646_960_720.jpg",
            "isAvailable": true,
            "description": "Description"
        },
        {
            "id": "produk3",
            "name": "Soto Daging",
            "price": 17000,
            "imgSrc": "https://cdn.pixabay.com/photo/2017/03/17/17/33/potato-soup-2152254_960_720.jpg",
            "isAvailable": false,
            "description": "Description"
        },
        {
            "id": "produk4",
            "name": "Martabak Manis",
            "price": 17000,
            "imgSrc": "https://cdn.pixabay.com/photo/2016/10/23/09/37/fried-rice-1762493_960_720.jpg",
            "isAvailable": true,
            "description": "Description"
        },
        {
            "id": "produk5",
            "name": "Pizza",
            "price": 35000,
            "imgSrc": "https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_960_720.jpg",
            "isAvailable": true,
            "description": "Description"
        },
        {
            "id": "produk6",
            "name": "Mie Goreng",
            "price": 15000,
            "imgSrc": "https://cdn.pixabay.com/photo/2016/10/23/09/37/fried-rice-1762493_960_720.jpg",
            "isAvailable": true,
            "description": "Description"
        },
    ]
    const handleAddToCart = (id, name, price) => {
        ic_st_setIsQtyDialogOpen(true);
        ic_st_setCurrentSelectedProd({
            "id": id,
            "name": name,
            "price": price,
        })
    }
    const handleQTYChange = (num) => {
        const obj = { ...ic_st_currentSelectedProd };
        obj.qty = num
        ic_st_setCurrentSelectedProd(obj);
    }
    const addToCart = (id, name, price, qty) => {
        if (qty === 0) {
            h_sf_showSnackbar('QTY must be larger than zero', 'error');
            return;
        }
        //update current cart
        const cart = { ...r_currentCart };
        cart[id] = {
            "id": md5(Date.now() + id),
            "productId": id,
            "name": name,
            "price" : price,
            "qty": qty,
            "total" : price * qty
        }
        updateCurrentCart(cart);
        h_sf_showSnackbar(`Berhasil menambahkan ${ic_st_currentSelectedProd.qty} ${ic_st_currentSelectedProd.name} ke dalam cart`, 'success');
        ic_st_setIsQtyDialogOpen(false);
    }
    return (
        <Box>
            <Grid container spacing={1}>
                {
                    productmock.map((product) => {
                        const { id, name, imgSrc, price, isAvailable, description } = product;
                        return (
                            <Grid item xs={12} sm={6} md={4} lg={3} >
                                <KCProductCard
                                    id={id}
                                    name={name}
                                    imgSrc={imgSrc}
                                    price={price}
                                    description={description}
                                    handleAddToCart={() => handleAddToCart(id, name, price)}
                                    isAvailable={isAvailable}
                                />
                            </Grid>
                        )
                    })
                }
            </Grid>
            {/** Dialog QTY */}
            <KCQtyDialog
                isOpen={ic_st_isQtyDialogOpen}
                name={ic_st_currentSelectedProd.name}
                qty={ic_st_currentSelectedProd.qty}
                handleChange={(v) => handleQTYChange(v)}
                handleClose={() => ic_st_setIsQtyDialogOpen(false)}
                handleAddToCart={() => addToCart(ic_st_currentSelectedProd.id, ic_st_currentSelectedProd.name, ic_st_currentSelectedProd.price, ic_st_currentSelectedProd.qty)}
            />
            {/** Snackbar | isOpen, handleClose, severity, message */}
            <RMSSnackbar
                isOpen={h_st_isSnackbarShown}
                handleClose={h_sf_closeSnackbar}
                severity={h_st_severity}
                message={h_st_message}
            />
        </Box>
    )
}

export default KCHome;