import React from 'react';
import { Table, Button, IconButton } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { formatRupiah } from '../rms-utility/rms-utility';
const RMSCleanTable = (props) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>No</TableCell>
                        {
                            props.tableHead.map((th, index) => {
                                return <TableCell key={`th-${th}-${index}`} align="left">{th}</TableCell>
                            })
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        props.rows.map((row, index) => {
                            return (
                                <TableRow
                                    key={index + 1}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    {
                                        props.tableHead.map((th) => {
                                            console.log(`row[th]`, row[th])
                                            let displayedAs = row[th];
                                            if (th === 'name') {
                                                displayedAs = `${row[th]} x ( ${row['qty']} ) @ Rp ${formatRupiah(row['price'])}`
                                            } else if (th === 'total') {
                                                displayedAs = `Rp ${formatRupiah(row['total'])}`
                                            } else if (th === 'aksi') {
                                                displayedAs =
                                                    <>
                                                        <Button sx={{ marginRight: '5px' }} onClick={row['edit']} startIcon={<EditIcon />} variant={'contained'}>Edit</Button>
                                                        <Button onClick={row['hapus']} variant={'outlined'} startIcon={<DeleteIcon />}>Hapus</Button>
                                                    </>
                                            } else if (th === 'action') {
                                                displayedAs =
                                                    <>
                                                        <IconButton sx={{ marginRight: '5px' }} onClick={row['dec']} variant={'outlined'}>
                                                            <RemoveIcon />
                                                        </IconButton>
                                                        <IconButton sx={{ marginRight: '5px' }} onClick={row['inc']} variant={'outlined'}>
                                                            <AddIcon />
                                                        </IconButton>
                                                        <IconButton onClick={row['hapus']} variant={'outlined'}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </>
                                            }
                                            return (<TableCell align="left" >{displayedAs}</TableCell>)
                                        })
                                    }
                                </TableRow>
                            )
                        })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default RMSCleanTable;