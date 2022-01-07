import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
//comps
import KCTopMenu from '../components/KCTopMenu';
import KCProductCard from '../components/KCProductCard';
import KCQtyDialog from '../components/KCQtyDialog';
import RMSSnackbar from '../components/RMSSnackbar';
import useSnackbar from '../hooks/useSnackbar';
//redux
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from 'redux';
import { actionCreators } from "../state/index";
import md5 from 'md5';
import Fuse from 'fuse.js';

const productmock = [
    {
        "id": "produk1",
        "name": "Nasi Goreng",
        "price": 15000,
        "imgSrc": "https://cdn.pixabay.com/photo/2016/10/23/09/37/fried-rice-1762493_960_720.jpg",
        "isAvailable": true,
        "description": "Nasi Goreng dengan Telur",
        "category": 'food'
    },
    {
        "id": "produk2",
        "name": "Beef Burger",
        "price": 25000,
        "imgSrc": "https://cdn.pixabay.com/photo/2020/10/05/19/55/hamburger-5630646_960_720.jpg",
        "isAvailable": true,
        "description": "Burger daging sapi",
        "category": 'food'
    },
    {
        "id": "produk3",
        "name": "Soto Daging",
        "price": 17000,
        "imgSrc": "https://cdn.pixabay.com/photo/2017/03/17/17/33/potato-soup-2152254_960_720.jpg",
        "isAvailable": false,
        "description": "Soto daging Sapi",
        "category": 'food'
    },
    {
        "id": "produk4",
        "name": "Martabak Manis",
        "price": 17000,
        "imgSrc": "https://cdn.pixabay.com/photo/2020/03/14/17/19/martabak-4931281__480.jpg",
        "isAvailable": true,
        "description": "Martabak manis coklat",
        "category": 'food'
    },
    {
        "id": "produk5",
        "name": "Pizza",
        "price": 35000,
        "imgSrc": "https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_960_720.jpg",
        "isAvailable": true,
        "description": "Pizza daging sapi",
        "category": 'food'
    },
    {
        "id": "produk6",
        "name": "Mie Goreng",
        "price": 15000,
        "imgSrc": "https://cdn.pixabay.com/photo/2020/02/15/20/38/noodles-4851996__340.jpg",
        "isAvailable": true,
        "description": "Description",
        "category": 'food'
    },
    {
        "id": "produk7",
        "name": "Kentang Goreng",
        "price": 17000,
        "imgSrc": "https://cdn.pixabay.com/photo/2020/06/23/14/33/french-fries-5332766__340.jpg",
        "isAvailable": true,
        "description": "Kentang goreng spesial.",
        "category": 'cemilan'
    },
    {
        "id": "produk8",
        "name": "Hot Cappucino",
        "price": 35000,
        "imgSrc": "https://cdn.pixabay.com/photo/2017/05/12/08/29/coffee-2306471__340.jpg",
        "isAvailable": true,
        "description": "Cappucino special",
        "category": 'drink'
    },
    {
        "id": "produk9",
        "name": "Americano",
        "price": 15000,
        "imgSrc": "https://cdn.pixabay.com/photo/2021/12/07/23/09/cup-6854258__340.jpg",
        "isAvailable": true,
        "description": "Americano nikmat",
        "category": 'drink'
    },
]
//fuse search
const options = {
    includeScore: true,
    // Search in `author` and in `tags` array
    keys: ['name', 'category']
}
let fuse = null;

const KCHome = () => {
    //redux 
    const dispatch = useDispatch();
    const { updateCurrentCart } = bindActionCreators(actionCreators, dispatch);
    const r_currentPathState = useSelector((state) => state.currentPath);
    const r_currentLoginStatus = useSelector((state) => state.currentLoginStatus);
    const r_currentUser = useSelector((state) => state.currentUser);
    const r_currentCart = useSelector((state) => state.currentCart);
    const r_currentSearchKeyword = useSelector((state) => state.currentSearchKeyword);
    //state
    const [ic_st_isQtyDialogOpen, ic_st_setIsQtyDialogOpen] = useState(false);
    const [ic_st_currentSelectedProd, ic_st_setCurrentSelectedProd] = useState({});
    const [ic_st_currentActiveCategory, ic_st_setCurrentActiveCategory] = useState('food');
    const [ic_st_productList, ic_st_setProductList] = useState([]);
    const [ic_st_filterdProductList, ic_st_setFilterdProductList] = useState([]);
    const [ic_st_isLoading, ic_st_setIsLoading] = useState(false);
    //snackbar
    const [h_st_isSnackbarShown, h_st_message, h_st_severity, h_sf_showSnackbar, h_sf_closeSnackbar] = useSnackbar();
    //menus mock
    const menus = [{
        "text": "Makanan",
        "value": 'food'
    }, {
        "text": "Minuman",
        "value": 'drink'
    }, {
        "text": "Cemilan",
        "value": 'cemilan'
    }];
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
        if (qty === 0 || qty === undefined) {
            h_sf_showSnackbar('QTY must be larger than zero and can not be empty', 'error');
            return;
        }
        //update current cart
        const cart = { ...r_currentCart };
        if (cart[id] != undefined) { //if cart already contain same item, just add the qty
            cart[id]['qty'] = parseInt(cart[id]['qty']) + parseInt(qty);
            cart[id]['total'] = cart[id]['qty'] * cart[id]['price']
        } else { //if not, construct the cart
            cart[id] = {
                "id": md5(Date.now() + id),
                "productId": id,
                "name": name,
                "price": price,
                "qty": qty,
                "total": price * qty
            }
        }
        updateCurrentCart(cart);
        h_sf_showSnackbar(`Menambahkan ${ic_st_currentSelectedProd.qty} ${ic_st_currentSelectedProd.name} ke dalam cart`, 'success');
        ic_st_setIsQtyDialogOpen(false);
    }
    //get all products
    useEffect(() => {
        //getting data from db
        ic_st_setProductList(productmock);
        //set filtered product list
        ic_st_setFilterdProductList(productmock);
    }, [])
    //if all product already downloaded, set the fuse
    useEffect(() => {
        fuse = new Fuse(ic_st_productList, options) //set fuse product
    }, [ic_st_productList])
    //filter product based on search keyword
    useEffect(() => {
        console.log('search keyword', r_currentSearchKeyword);
        if (r_currentSearchKeyword === "") {
            ic_st_setFilterdProductList(ic_st_productList);
        } else {
            if (fuse !== null) {
                const result = fuse.search(r_currentSearchKeyword)
                const filtered = result.map((res) => {
                    return {
                        ...res.item
                    }
                })
                console.log(JSON.stringify(filtered));
                ic_st_setFilterdProductList(filtered);
            }
        }
    }, [r_currentSearchKeyword])
    return (
        <Box>
            <KCTopMenu menus={menus} handleClick={(v) => { ic_st_setCurrentActiveCategory(v) }} />
            <Grid container spacing={1}>
                {
                    ic_st_filterdProductList.length === 0 ? <Box textAlign={'center'} sx={{ padding: '10px' }}><Typography variant={'subtitle1'}>Tidak ada item</Typography></Box> : ic_st_filterdProductList.map((product) => {
                        const { id, name, imgSrc, price, isAvailable, description } = product;
                        return (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={md5(id + name + price + description)}>
                                <KCProductCard
                                    isLoading={ic_st_isLoading}
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