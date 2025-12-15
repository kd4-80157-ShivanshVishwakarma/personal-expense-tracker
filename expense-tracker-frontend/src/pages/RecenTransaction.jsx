import React, { useEffect, useMemo, useState } from 'react';
import { 
    Typography, 
    Box, 
    IconButton, 
    Table, 
    TableContainer, 
    TableHead, 
    TableRow, 
    TableCell, 
    TableBody, 
    Tooltip, 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    Pagination, 
    Card, 
    CardContent, 
    Stack, 
    Chip,
    Divider
} from '@mui/material';
import { 
    Visibility, 
    Close as CloseIcon, 
    AutorenewOutlined as RefreshIcon,
    ReceiptLong,
    Description
} from '@mui/icons-material';
import { RecentTransactionApi as recentTransactionApi } from '../api/TransactionApi';
// import '../styles/Transaction.css'; // You can keep this if you have specific global styles

const PAGE_SIZE = 10;

const RecenTransaction = () => {
    const [TransactionData, setTransactionData] = useState([]);
    const [OpenPreview, setOpenPreview] = useState(false);
    const [currentImage, setCurrentImage] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [refresh, setRefresh] = useState(false);

    const totalPages = Math.ceil(TransactionData.length / PAGE_SIZE);

    const currentData = useMemo(() => {
        const start = currentPage * PAGE_SIZE;
        const end = start + PAGE_SIZE;
        return TransactionData.slice(start, end);
    }, [currentPage, TransactionData]);

    const handlePage = (event, value) => {
        setCurrentPage(value - 1);
    };

    const handleOpenPreview = (imageUrl) => {
        setOpenPreview(true);
        setCurrentImage(imageUrl);
    };

    const handleClosePreview = () => {
        setOpenPreview(false);
        setCurrentImage('');
    };

    const handleRefresh = () => {
        setRefresh((prev) => !prev);
    };

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

    // --- HELPER: Renders the Receipt Button ---
    const renderReceiptButton = (row) => (
        row.transactionType === 'EXPENSE' ? (
            <Tooltip title='Receipt Preview'>
                <IconButton
                    size="small"
                    color="success"
                    sx={{ bgcolor: '#f8f9faff', border: '1px solid #e0e0e0' }}
                    onClick={() => handleOpenPreview(row.receipt)}
                >
                    <Visibility fontSize="small" />
                </IconButton>
            </Tooltip>
        ) : (
            <Typography variant="caption" color="text.secondary">-</Typography>
        )
    );

    return (
        <Box sx={{ width: '100%', overflow: 'hidden' }}>
            {/* HEADER SECTION */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, px: 1 }}>
                <Typography variant='h6' sx={{ fontWeight: 700 }}>
                    Recent Transactions
                </Typography>
                <Tooltip title='Refresh'>
                    <IconButton onClick={handleRefresh} color="primary">
                        <RefreshIcon fontSize='medium' />
                    </IconButton>
                </Tooltip>
            </Box>

            {/* ============================================= */}
            {/* VIEW 1: DESKTOP TABLE (Hidden on Mobile)      */}
            {/* ============================================= */}
            <TableContainer sx={{ display: { xs: 'none', md: 'block' }, maxHeight: '60vh', overflowY: 'auto' }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: '700', bgcolor: '#f5f5f5' }}>S.No</TableCell>
                            <TableCell sx={{ fontWeight: '700', bgcolor: '#f5f5f5' }}>Details</TableCell>
                            <TableCell sx={{ fontWeight: '700', bgcolor: '#f5f5f5' }}>Description</TableCell>
                            <TableCell sx={{ fontWeight: '700', bgcolor: '#f5f5f5' }} align="center">Receipt</TableCell>
                            <TableCell sx={{ fontWeight: '700', bgcolor: '#f5f5f5' }} align="right">Amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentData.length > 0 ? (
                            currentData.map((row, index) => (
                                <TableRow key={index} hover>
                                    <TableCell>{currentPage * PAGE_SIZE + index + 1}</TableCell>
                                    <TableCell>
                                        <Box>
                                            <Typography variant="subtitle2" sx={{ fontWeight: "700" }}>{row.title}</Typography>
                                            <Typography variant="caption" display="block" color="text.secondary">{row.category}</Typography>
                                            <Typography variant="caption" display="block" sx={{ fontStyle: 'italic' }}>{row.transactionDate}</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell sx={{ maxWidth: 200 }}>
                                        <Typography variant="body2"sx={{fontStyle:row.description ? 'normal': 'italic'}} noWrap title={row.description}>
                                            {row.description ? row.description : "No Description"}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align='center'>
                                        {renderReceiptButton(row)}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography
                                            sx={{
                                                fontWeight: '700',
                                                color: row.transactionType === 'EXPENSE' ? 'error.main' : 'success.main'
                                            }}
                                        >
                                            {row.transactionType === 'EXPENSE' ? `- ₹${row.amount}` : `+ ₹${row.amount}`}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                                    <Typography variant="body1" color="text.secondary">No transactions found.</Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* ============================================= */}
            {/* VIEW 2: MOBILE CARDS (Hidden on Desktop)      */}
            {/* ============================================= */}
            <Box sx={{ display: { xs: 'flex', md: 'none' }, flexDirection: 'column', gap: 2 }}>
                {currentData.length > 0 ? (
                    currentData.map((row, index) => (
                        <Card key={index} variant="outlined" sx={{ borderRadius: 2 }}>
                            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                                {/* Top Row: Date and Amount */}
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                    <Chip 
                                        label={row.transactionDate} 
                                        size="small" 
                                        variant="outlined" 
                                        sx={{ fontSize: '0.7rem', height: 20 }} 
                                    />
                                    <Typography
                                        variant="subtitle1"
                                        sx={{
                                            fontWeight: '800',
                                            color: row.transactionType === 'EXPENSE' ? 'error.main' : 'success.main'
                                        }}
                                    >
                                        {row.transactionType === 'EXPENSE' ? `- ₹${row.amount}` : `+ ₹${row.amount}`}
                                    </Typography>
                                </Box>

                                {/* Middle Row: Title and Category */}
                                <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                                    {row.title}
                                </Typography>
                                <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                                    {row.category}
                                </Typography>

                                <Divider sx={{ my: 1 }} />

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, maxWidth: '75%' }}>
                                        <Description fontSize="inherit" color="action" sx={{ fontSize: 16 }} />
                                        <Typography variant="body2" color="text.secondary" noWrap>
                                            {row.description || "No description"}
                                        </Typography>
                                    </Box>
                                    
                                    {row.transactionType === 'EXPENSE' && (
                                        <IconButton 
                                            size="small" 
                                            onClick={() => handleOpenPreview(row.receipt)}
                                            sx={{ border: '1px solid #eee' }}
                                        >
                                            <Visibility fontSize="small" color="primary" />
                                        </IconButton>
                                    )}
                                </Box>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                        <Typography color="text.secondary">No transactions found.</Typography>
                    </Box>
                )}
            </Box>

            {/* PAGINATION (Visible on Both) */}
            <Box sx={{
                p: 2,
                mt: 1,
                borderTop: '1px solid',
                borderColor: 'divider',
                display: 'flex',
                justifyContent: 'center',
            }}>
                <Pagination
                    count={totalPages}
                    page={currentPage + 1}
                    onChange={handlePage}
                    color="primary" 
                    size="small"   
                    siblingCount={0}
                    showFirstButton
                    showLastButton
                    shape="rounded"
                />
            </Box>

            <Dialog open={OpenPreview} onClose={handleClosePreview} maxWidth='md' fullWidth>
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    Receipt Preview
                    <IconButton onClick={handleClosePreview}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers sx={{ display: 'flex', justifyContent: 'center', bgcolor: '#f5f5f5', p: 1 }}>
                    {currentImage && (
                        <img
                            src={currentImage}
                            alt="Receipt"
                            style={{
                                maxWidth: '100%',
                                maxHeight: '70vh',
                                objectFit: 'contain',
                                borderRadius: '4px'
                            }}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </Box>
    );
}

export default RecenTransaction;