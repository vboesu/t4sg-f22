import * as React from 'react';
import { useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

export default function Confirm({ title, open, cancelAction, confirmAction, cancelTitle, confirmTitle }) {
    return (
        <Dialog open={open} onClose={cancelAction}>
            <DialogTitle>{title}</DialogTitle>
            <DialogActions>
                <Button onClick={cancelAction}>{cancelTitle}</Button>
                <Button onClick={confirmAction} variant="contained" autoFocus>{confirmTitle}</Button>
            </DialogActions>
        </Dialog>
    );
}