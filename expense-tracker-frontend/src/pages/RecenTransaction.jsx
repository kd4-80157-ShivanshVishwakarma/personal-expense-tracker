import { Typography,Box,IconButton, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Tooltip, Dialog, DialogTitle,DialogContent, Pagination } from '@mui/material';
import '../styles/Transaction.css';
import {Visibility,Close as CloseIcon,AutorenewOutlined as RefreshIcon} from '@mui/icons-material';
import React, { useEffect, useMemo, useState } from 'react';
import { RecentTransactionApi as recentTransactionApi } from '../api/TransactionApi';

const PAGE_SIZE = 10;

const RecenTransaction = () => {
    const [TransactionData, setTransactionData] = useState([]);
    const [OpenPreview, setOpenPreview] = useState(false);
    const [currentImage, setCurrentImage] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [refresh,setRefresh] = useState(false)

    const totalPages = Math.ceil(TransactionData.length / PAGE_SIZE);

    const currentData = useMemo(() => {
        const start = currentPage * PAGE_SIZE;
        const end = start + PAGE_SIZE;
        return TransactionData.slice(start, end);
    }, [currentPage, TransactionData]);

    const handlePage = (event, value) => {
        setCurrentPage(value-1); 
    };

    const handleOpenPreview = (imageUrl) => {
        setOpenPreview(true);
        setCurrentImage(imageUrl);
    };
    
    const handleClosePreview = () => {
        setOpenPreview(false);
        setCurrentImage('');
    };

    const handleRefresh=()=>{
        setRefresh((prev)=> !prev);
    }

    const fetchTransaction = async () => {
        try {
            const response = await recentTransactionApi();
            if (response.data.success) {
                setTransactionData(response.data.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchTransaction();
    }, [refresh]);

    return (
        <Box>
            <Box sx={{display:'flex',justifyContent:'space-between'}}>
                <Typography variant='h5' sx={{fontWeight:700,paddingLeft:'8px'}}>
                    Recent Transactions
                </Typography>
                <Tooltip title='Refresh'>
                    <IconButton sx={{paddingRight:'8px'}} onClick={handleRefresh}>
                        <RefreshIcon fontSize='medium'/>
                    </IconButton >
                </Tooltip>
            </Box>

            <TableContainer className="table-container">
                <Table>
                    <TableHead className='table-head'>
                        <TableRow>
                            <TableCell colSpan={2} sx={{fontWeight:'700'}}>S.NO</TableCell>
                            <TableCell colSpan={2} sx={{fontWeight:'700'}}>Item</TableCell> 
                            <TableCell colSpan={4} sx={{fontWeight:'700'}}>Description</TableCell>
                            <TableCell colSpan={2} sx={{fontWeight:'700'}}>Receipt</TableCell>
                            <TableCell colSpan={2} sx={{fontWeight:'700'}}>Amount</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {currentData.length > 0 ? (
                            currentData.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell colSpan={2}>{currentPage * PAGE_SIZE + index + 1}</TableCell>
                                    <TableCell colSpan={2}>
                                        <Box>
                                            <Typography sx={{fontSize:"12px", fontWeight:"700"}}>{row.category}</Typography>
                                            <Typography sx={{fontSize:"12px"}}>Title: {row.title}</Typography>
                                            <Typography sx={{fontSize:"12px", fontStyle:'italic'}}>Date: {row.transactionDate}</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell colSpan={4}>{row.description}</TableCell>
                                    <TableCell colSpan={2} align='center'>
                                        {row.transactionType === 'EXPENSE' ? (
                                            <Tooltip title='Receipt Preview'>
                                                <IconButton 
                                                    size="small" 
                                                    color="success"
                                                    sx={{ bgcolor: '#f8f9faff' }}
                                                    onClick={() => handleOpenPreview(row.receipt)}
                                                >
                                                    <Visibility fontSize="medium" />
                                                </IconButton>
                                            </Tooltip>
                                        ) : (
                                            <Typography>-</Typography>
                                        )}
                                    </TableCell>
                                    <TableCell
                                        colSpan={2}
                                        sx={{
                                            fontWeight: '700',
                                            fontSize: '16px',
                                            color: row.transactionType === 'EXPENSE' ? 'error.main' : 'success.main'
                                        }}
                                        >
                                        {row.transactionType === 'EXPENSE' ? `-₹${row.amount}` : `+₹${row.amount}`}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={12} align="center" sx={{ py: 3 }}>
                                    <Typography variant="body1" color="text.secondary">
                                        No transactions found.
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box sx={{
                p: 2,
                borderTop: '1px solid',
                borderColor: 'divider',
                display: 'flex',
                justifyContent: 'center',
                bgcolor: '#fff'
            }}>
                <Pagination
                    count={totalPages}
                    page={currentPage + 1}  
                    onChange={handlePage}
                    color="success"
                    showFirstButton
                    showLastButton
                    shape="rounded"
                    variant='outlined'
                />
            </Box>

            {/* IMAGE PREVIEW */}
            <Dialog open={OpenPreview} onClose={handleClosePreview} maxWidth='md'>
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    Receipt Preview
                    <IconButton onClick={handleClosePreview} sx={{ color: (theme) => theme.palette.grey[500] }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent dividers sx={{ display: 'flex', justifyContent: 'center', bgcolor: '#f5f5f5', p: 2 }}>
                    {currentImage && (
                        <img 
                            src={currentImage}
                            alt="Receipt"
                            style={{
                                maxWidth: '100%',
                                maxHeight: '70vh',
                                objectFit: 'contain',
                                borderRadius: '4px',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                            }}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </Box>
    );
}

export default RecenTransaction;
