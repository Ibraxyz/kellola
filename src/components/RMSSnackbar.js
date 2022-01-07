import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const RMSSnackbar = (props) => {
    const { isOpen, handleClose, severity, message } = props;
    return (
        <Snackbar open={isOpen} autoHideDuration={2000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    )
}

export default RMSSnackbar;