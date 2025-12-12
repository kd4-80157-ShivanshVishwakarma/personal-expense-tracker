import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Container,
  Grid,
  TextField,
  Slider,
  Switch,
  FormControlLabel,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  InputAdornment,
  IconButton,
  Tooltip,
  Alert,
  Fade,
  Stack
} from '@mui/material';
import {
  AddAlert,
  DateRange,
  Save,
  Delete,
  TrendingUp,
  NotificationsActive
} from '@mui/icons-material';
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from 'dayjs';
import { CreateBudgetAlertApi as createBudgetAlertApi, FetchBudgetsApi as fetchBudgetApi,RemoveBudgetApi as removeBudgetApi} from '../../api/BudgetApi';
import { toast } from 'react-toastify';


const BudgetSchema = Yup.object({
  startDate: Yup.date().typeError("Invalid date").required("Start date required"),
  endDate: Yup.date().typeError("Invalid date").required("End date required"),
  limitAmount: Yup.number().min(100).required("limitAmount required")
});

const BudgetAlert = () => {
  const [budgets, setBudgets] = useState([]);
  const [notification, setNotification] = useState(null);
  const [loading,setLoading] = useState(false);


  const handleDelete = async(id) => {
    try{
            setLoading(true);
            const response = await removeBudgetApi(id);
            if(response.data.success){
                console.log(response.data);
                toast.success(response.data.message)
                FetchBudgets();
            }
            else{
                console.log(response.data);
                toast.error(response.data.message)
            }
        }
        catch (error) {
            setLoading(false);
            console.error("ERROR:", error);
            toast.error(error.response.data.message)
        }
  };

    const handleSubmit = async (values)=>{
        try{
            setLoading(true);
            const payload = {
                ...values,
                startDate:values.startDate.format("YYYY-MM-DD"),
                endDate: values.endDate.format("YYYY-MM-DD")
            }
            const response = await createBudgetAlertApi(payload);
            if(response.data.success){
                console.log(response.data);
                toast.success(response.data.message)
                setNotification({ type: "success", message: "Budget alert created!" });
                FetchBudgets();
            }
            else{
                console.log(response.data);
                toast.error(response.data.message)
            }
        }
        catch (error) {
            setLoading(false);
            console.error("ERROR:", error);
            toast.error(error.response.data.message)
        }
    }


  const FetchBudgets = async()=>{
        try{
            setLoading(true);
            const response = await fetchBudgetApi();
            if(response.data.success){
                console.log(response.data);
                setBudgets(response.data.data)
            }
            else{
                console.log(response.data);
                toast.error(response.data.message)
            }
        }
        catch (error) {
            setLoading(false);
            console.error("ERROR:", error);
            toast.error(response.data.message)
        }
    }

    useEffect(()=>{
        FetchBudgets();
    },[])

    return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Container maxWidth="md" sx={{ py: 4 }}>

        {/* NOTIFICATION */}
        {notification && (
        <Fade in>
            <Alert
            severity={notification.type}
            sx={{ mb: 3, borderRadius: 2 }}
            onClose={() => setNotification(null)}
            >
            {notification.message}
            </Alert>
        </Fade>
        )}

        {/* ===================== FORM SECTION ===================== */}
        <Paper sx={{ p: 3, borderRadius: 3, mb: 4 }}>

        <Box display="flex" alignItems="center" gap={2} mb={3}>
            <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: 'primary.main', color: '#fff' }}>
            <AddAlert />
            </Box>
            <Typography variant="h6" fontWeight={700}>
            Set Budget Alert
            </Typography>
        </Box>

        <Formik
            initialValues={{
                startDate: null,
                endDate: null,
                limitAmount: 1000,
                status: true
            }}
            validationSchema={BudgetSchema}
            onSubmit={handleSubmit}>

            {({ values, errors, touched, handleChange, setFieldValue }) => (
            <Form>

                <Stack spacing={4}>

                <Box>
                    <Typography variant='h6' fontWeight='bold' mb={2}>
                    <DateRange fontSize="small" /> Duration
                    </Typography>

                    <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <DatePicker
                            label="Start Date"
                            minDate={dayjs(Date.now())}
                            format='DD/MM/YYYY'
                            name='startDate'
                            value={values.startDate}
                            onChange={(newValue) => setFieldValue("startDate", newValue)}
                            slotProps={{
                                textField: {
                                fullWidth: true,
                                size: "small",
                                error: touched.startDate && Boolean(errors.startDate),
                                helperText: touched.startDate && errors.startDate
                                }
                            }}
                            />
                    </Grid>

                    <Grid item xs={6}>
                        <DatePicker
                            label="End Date"
                            minDate={values.startDate ? values.startDate.add(7,'day') : dayjs(Date.now())}
                            format='DD/MM/YYYY'
                            name='endDate'
                            value={values.endDate}
                            onChange={(newValue) => setFieldValue("endDate", newValue)}
                            slotProps={{
                                textField: {
                                fullWidth: true,
                                size: "small",
                                error: touched.endDate && Boolean(errors.endDate),
                                helperText: touched.endDate && errors.endDate
                                }
                            }}
                            />
                    </Grid>
                    </Grid>
                </Box>

                {/* limitAmount */}
                <Box>
                    <Box display="flex" justifyContent="space-between">
                    <Typography variant='h6' fontWeight='bold'>
                         Limit Amount
                    </Typography>
                    <Typography fontWeight="bold" color="success.main">
                        ₹{values.limitAmount}
                    </Typography>
                    </Box>

                    <Slider
                        value={values.limitAmount}
                        onChange={(e, v) => setFieldValue("limitAmount", v)}
                        min={0}
                        max={20000}
                        step={100}
                    />

                    <TextField
                        size="small"
                        name='limitAmount'
                        value={values.limitAmount}
                        onChange={(e) => setFieldValue("limitAmount", Number(e.target.value))}
                        slotProps={{
                            input: {
                            startAdornment: (
                                <InputAdornment position="start">₹</InputAdornment>
                            )
                            }
                        }}
                        sx={{ width: 140 }}
                    />
                </Box>

                {/* STATUS */}
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box display="flex" gap={1} alignItems="center">
                    <NotificationsActive color={values.status ? "primary" : "disabled"} />
                    <Typography>Alert</Typography>
                    </Box>

                    <FormControlLabel
                    control={
                        <Switch
                        checked={values.status}
                        name='status'
                        onChange={(e) => setFieldValue("status", e.target.checked)}
                        />
                    }
                    label={values.status ? "Active" : "Inactive"}
                    />
                </Box>

                <Box sx={{display:'flex',justifyContent:'center'}}>
                    <Button
                        type="submit"
                        variant="contained"
                        startIcon={<Save />}
                        size="large"
                        sx={{ py: 1.5, width:'30%',borderRadius:8 }}
                    >
                        Create Alert
                    </Button>
                </Box>

                </Stack>
            </Form>
            )}
        </Formik>
        </Paper>

        {/* ===================== TABLE SECTION ===================== */}
        <Paper sx={{ borderRadius: 3, mb: 3 }}>

        <Box p={3}>
            <Typography variant="h6" fontWeight={700}>
                Existing Alerts
            </Typography>
        </Box>

        <TableContainer>
            <Table>
            <TableHead>
                <TableRow >
                <TableCell sx={{fontWeight:'bold'}}>Date Range</TableCell>
                <TableCell sx={{fontWeight:'bold'}}>Limit</TableCell>
                <TableCell sx={{fontWeight:'bold'}}>Status</TableCell>
                <TableCell align="right" sx={{fontWeight:'bold'}}>Actions</TableCell>
                </TableRow>
            </TableHead>

            <TableBody>
                {budgets.map((row) => (
                <TableRow key={row.id}>
                    <TableCell>
                    {row.startDate} → {row.endDate}
                    </TableCell>

                    <TableCell>
                    ₹{row.limitAmount}
                    </TableCell>
                    <TableCell>

                    <Chip
                        label={row.status ? "ACTIVE":"INACTIVE"}
                        color={row.status ? "success" : "default"}
                    />
                    </TableCell>

                    <TableCell align="right">
                    {/* <Tooltip title="Edit">
                        <IconButton><Edit /></IconButton>
                    </Tooltip> */}
                    <Tooltip title="Delete">
                        <IconButton color="error" onClick={() => handleDelete(row.id)}>
                        <Delete />
                        </IconButton>
                    </Tooltip>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>

            </Table>
        </TableContainer>
        </Paper>

        {/* ===================== INFO ===================== */}
        <Alert severity="info" icon={<TrendingUp />}>
        You will be notified when usage reaches to the configured limit.
        </Alert>

    </Container>
    </LocalizationProvider>
    );
};

export default BudgetAlert;
