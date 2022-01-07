import React from 'react';
import { Paper, Box, Typography, Button, Divider } from '@mui/material';
import { formatRupiah } from '../rms-utility/rms-utility';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const KCProductCard = (props) => {
    return (
        <Paper>
            <Box sx={{ padding: '10px' }} textAlign={'center'}>
                <Typography variant={'subtitle2'}>{props.name}</Typography>
            </Box>
            <Box>
                <img src={props.imgSrc} alt="" style={{ width: '100%', height: 'auto' }} />
            </Box>
            <Box sx={{ padding: '10px' }} textAlign={'center'}>
                <Typography variant={'subtitle'}>{formatRupiah(props.description)}</Typography>
            </Box>
            <Divider />
            <Box sx={{ padding: '10px' }} textAlign={'center'}>
                <Typography variant={'caption'} sx={{ color: props.isAvailable > 0 ? 'green' : 'red' }}>{props.isAvailable ? 'Available' : 'Not available'}</Typography>
            </Box>
            <Divider />
            <Box sx={{ padding: '10px' }} textAlign={'center'}>
                <Typography variant={'h5'}>Rp {formatRupiah(props.price)}</Typography>
            </Box>
            <Divider />
            <Box sx={{ padding: '10px' }}>
                <Button variant={'contained'} disabled={!props.isAvailable} sx={{ width: '100%' }} startIcon={<AddShoppingCartIcon />} onClick={props.handleAddToCart}>Add to Cart</Button>
            </Box>
        </Paper>
    )
}

export default KCProductCard;