import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Typography,
  InputAdornment,Grid,
  Alert,
  Collapse,
  IconButton,
  AlertTitle,
  CircularProgress
} from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import CloseIcon from '@mui/icons-material/Close';
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {TransactionExpenseApi as transactionExpenseApi,TransactionEarningApi as transactionEarningApi} from "../api/TransactionApi";
import { uploadImageToCloudinary } from "../services/cloudinaryService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const expenseCategories = [
  {id:1, value: "FOOD"},
  {id:2,value:"TRAVEL"},
  {id:3, value: "SHOPPING"},
  {id:4,value:"BEVERAGE"},
  {id:5, value: "BILLS"},
  {id:6,value:"RENT"},
  {id:11, value: "OTHERS"}
];

const earningCategories = [
  {id:7, value: "SALARY"},
  {id:8,value:"REFUND"},
  {id:9, value: "INVESTMENT"},
  {id:10,value:"CASHBACKS"},
  {id:11, value: "OTHERS"},
];

// Yup Validation Schemas
const ExpenseSchema = Yup.object({
  title: Yup.string().required("Title is required").max(15,"Characters are exceeded"),
  categoryId: Yup.string().required("Select a category"),
  description: Yup.string().max(30,"Characters are exceeded"),
  amount: Yup.number().typeError("Enter a valid amount").required("Amount required"),
  date: Yup.date().required("Select a date"),
});

const EarningsSchema = Yup.object({
  title: Yup.string().required("Title is required").max(15,"Characters are exceeded"),
  categoryId: Yup.string().required("Select a category"),
  description: Yup.string().max(30,"Characters are exceeded"),
  amount: Yup.number().typeError("Enter a valid amount").required("Amount required"),
  date: Yup.date().required("Select a date"),
});

const ExpenseForm = () => {

  const[loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const [budgetWarning, setBudgetWarning] = useState(null);

  useEffect(() => {
      if (budgetWarning) {
        const timer = setTimeout(() => {
          setBudgetWarning(null);
        }, 8000);

        return () => clearTimeout(timer);
      }
    }, [budgetWarning]);
  
  const handleSubmit= async (values,{resetForm})=>{
    try {
      setLoading(true);
      let uploadImage = null;
      if(values.receiptImageFilePath!==null){
        uploadImage  = await uploadImageToCloudinary(values.receiptImageFilePath);
        values.receiptImageFilePath = uploadImage;
      }
      const response = await transactionExpenseApi(values);
      if(response.data.success){
        console.log(response.data);
        resetForm();

        const data = response.data.data;
        
        if (data && data.usagePercentage >= 80) {
            setBudgetWarning({
                severity: data.usagePercentage >= 100 ? "error" : "warning", 
                title: data.usagePercentage >= 100 ? "Budget Limit Exceeded! 🚨" : "Approaching Limit ",
                message: data.alertMessage || `You have used ${data.usagePercentage}% of your budget.`
            });
            
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        toast.success(response.data.message)
      }
      else{
        toast.success(response.data.response);
      }
    } catch (error) {
      console.error(error+"This is error message");
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Formik
      initialValues={{
        title: "",
        categoryId: "",
        description: "",
        amount: "",
        date: "",
        receiptImageFilePath: null,
      }}
      validationSchema={ExpenseSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, handleChange, setFieldValue }) => (
        <Form>
          <Typography variant="h5" sx={{   display: "flex", justifyContent: "center", fontWeight:700 }}>
            Expense Entry
          </Typography>
          <Typography sx={{my:2,display: "flex", justifyContent: "center",}}>
            Enter the details of your spending
          </Typography>

          {/* ================= 3. UI: DYNAMIC BUDGET WARNING ================= */}
  
          <Collapse in={Boolean(budgetWarning)}>
            <Box sx={{ mb: 3 }}>
                <Alert
                    severity={budgetWarning?.severity || "info"}
                    variant="standard" 
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => setBudgetWarning(null)}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ borderRadius: 2, boxShadow: 3 }}
                >
                    <AlertTitle sx={{ fontWeight: 'bold' }}>
                        {budgetWarning?.title}
                    </AlertTitle>
                    {budgetWarning?.message}
                </Alert>
            </Box>
          </Collapse>

          <Box sx={{ height: "1px", background: "#e0e0e0", my: 4 }} />

          <Grid container spacing={5}>
            
            <Grid item xs={12} sm={6}>
              <TextField
              required
                fullWidth
                size="small"
                variant="filled"
                label="Title"
                name="title"
                value={values.title}
                onChange={handleChange}
                placeholder="e.g. Lunch at Dominos"
                error={touched.title && Boolean(errors.title)}
                helperText={touched.title && errors.title}
                sx={{width:"16rem",'& .MuiFilledInput-root': {
                        backgroundColor: '#fbfafa90',
                        }}}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
              required
                select
                size="small"
                variant="filled"
                label="Category"
                name="categoryId"
                value={values.categoryId}
                onChange={handleChange}
                error={touched.categoryId && Boolean(errors.categoryId)}
                helperText={touched.categoryId && errors.categoryId}
                sx={{width:"16rem",'& .MuiFilledInput-root': {
                        backgroundColor: '#fbfafa90',
                        }}}
              >

                {expenseCategories.map((d) => (
                  <MenuItem key={d.id} value={d.id}>
                    {d.value}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                variant="filled"
                label="Description"
                name="description"
                value={values.description}
                onChange={handleChange}
                placeholder="e.g. Ordered Pizza and Taco"
                multiline
                sx={{width:"16rem",'& .MuiFilledInput-root': {
                        backgroundColor: '#fbfafa90',
                        }}}
              />
            </Grid>

            {/* ROW 3: Amount & Date */}
            <Grid item xs={12} sm={6}>
              <TextField
              required
                fullWidth
                size="small"
                variant="filled"
                label="Amount"
                name="amount"
                value={values.amount}
                onChange={handleChange}
                placeholder="e.g. 1000"
                error={touched.amount && Boolean(errors.amount)}
                helperText={touched.amount && errors.amount}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">₹</InputAdornment>
                    ),
                  },
                  inputLabel: { shrink: true },
                }}
                sx={{width:"16rem",'& .MuiFilledInput-root': {
                        backgroundColor: '#fbfafa90',
                        }}}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date"
                  format="DD/MM/YYYY" 
                  value={values.date ? dayjs(values.date) : null}
                  name="date"
                  onChange={(newValue) => {
                    const formattedDate = newValue ? newValue.format('YYYY-MM-DD') : '';
                    setFieldValue("date", formattedDate);
                  }}
                  sx={{
                    backgroundColor:"white"
                  }}
                  slotProps={{
                    textField: {
                      required: true,
                      fullWidth: true,
                      size: "small",
                      variant: "filled", 
                      error: touched.date && Boolean(errors.date),
                      helperText: touched.date && errors.date,
                      
                    }
                  }}
                />
              </LocalizationProvider>
            </Grid>

            {/* ROW 4: Receipt Upload (Full Width) */}
            <Grid item xs={12}>
              <Box >
                <Typography variant="body1" sx={{ mb: 1, color: 'text.secondary' }}>
                  Upload Receipt (optional)
                </Typography>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => setFieldValue("receiptImageFilePath", e.target.files[0])}
                />
              </Box>
            </Grid>
            </Grid>

            <Box sx={{display:"flex",justifyContent:"center"}}>
              <Button
                type="submit"
                variant="contained"
                color="success"
                sx={{ my: 4, py: 1.2, borderRadius: 5,width:"200px",fontWeight:700 }}
                disabled={loading}
              >
                {loading ? (
                <CircularProgress size={24} color="inherit" />
                ) : (
                "Add Expense"
                )}
              </Button>
            </Box>

            {/* ================= PROMOTIONAL BUDGET ALERT ================= */}
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
              <Alert 
                severity="info" 
                variant="outlined" 
                sx={{ 
                  width: '100%', 
                  cursor: 'pointer',
                  borderStyle: 'dashed',
                  transition: '0.3s',
                  '&:hover': { 
                    bgcolor: 'rgba(2, 136, 209, 0.08)', // subtle blue hover
                    borderColor: 'info.main',
                    transform: 'translateY(-2px)' // slight lift effect
                  }
                }}
                onClick={() => navigate('/budget')}
              >
                <strong>Smart earners are smart spenders.</strong> 💡 Click here to set a <strong>Budget Limit</strong> and maximize your savings!
              </Alert>
            </Box>

          
        </Form>
      )}
    </Formik>
  );
};


//////////////////////////////////
//    EARNINGS FORM
//////////////////////////////////

const EarningsForm = () => {

  const[loading,setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit= async (values,{resetForm})=>{
    try {
      setLoading(true);
      const response = await transactionEarningApi(values);
      if(response.data.success){
        console.log(response.data);
         toast.success(response.data.message);
         resetForm();
      }
      else{
         toast.success(response.data.response);
      }
    } catch (error) {
      console.error(error+"This is error message");
       toast.success("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (

    <Formik
      initialValues={{
        title: "",
        categoryId: "",
        description: "",
        amount: "",
        date: ""
      }}
      validationSchema={EarningsSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, handleChange,setFieldValue }) => (
        <Form>
          <Typography variant="h5" sx={{ display: "flex", justifyContent: "center", fontWeight:700 }}>
            Earning Entry
          </Typography>
          <Typography sx={{my:2,display: "flex", justifyContent: "center",}}>
            Enter the details of your earnings
          </Typography>
          
          <Box sx={{ height: "1px", background: "#e0e0e0", my: 4 }} />

          {/* Grid Container starts here */}
          <Grid container spacing={5} >
            
            {/* ROW 1: Title & Category */}
            <Grid item xs={12} sm={6}>
              <TextField
              required
                fullWidth
                size="small"
                variant="filled"
                label="Title"
                name="title"
                value={values.title}
                onChange={handleChange}
                placeholder="e.g. October Salary"
                error={touched.title && Boolean(errors.title)}
                helperText={touched.title && errors.title}
                sx={{width:"16rem",'& .MuiFilledInput-root': {
                        backgroundColor: '#fbfafa90',
                        }}}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                select
                size="small"
                variant="filled"
                label="Category"
                name="categoryId"
                value={values.categoryId}
                onChange={handleChange}
                error={touched.categoryId && Boolean(errors.categoryId)}
                helperText={touched.categoryId && errors.categoryId}
                sx={{width:"16rem",'& .MuiFilledInput-root': {
                        backgroundColor: '#fbfafa90',
                }}}
              >

                {earningCategories.map((d) => (
                  <MenuItem key={d.id} value={d.id}>
                    {d.value}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                variant="filled"
                label="Description"
                name="description"
                value={values.description}
                onChange={handleChange}
                placeholder="e.g. Salary Credited"
                multiline
                sx={{width:"16rem",'& .MuiFilledInput-root': {
                        backgroundColor: '#fbfafa90',
                }}}
              />
            </Grid>

            {/* ROW 3: Amount & Date */}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                size="small"
                variant="filled"
                label="Amount"
                name="amount"
                value={values.amount}
                onChange={handleChange}
                placeholder="e.g. 60000"
                error={touched.amount && Boolean(errors.amount)}
                helperText={touched.amount && errors.amount}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">₹</InputAdornment>
                    ),
                  },
                  inputLabel: { shrink: true },
                }}
                sx={{width:"16rem",'& .MuiFilledInput-root': {
                        backgroundColor: '#fbfafa90',
                        }}}
              />
            </Grid>

             <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date"
                  format="DD/MM/YYYY" 
                  value={values.date ? dayjs(values.date) : null}
                  name="date"
                  onChange={(newValue) => {
                    const formattedDate = newValue ? newValue.format('YYYY-MM-DD') : '';
                    setFieldValue("date", formattedDate);
                  }}
                  sx={{
                    backgroundColor:"white"
                  }}
                  slotProps={{
                    textField: {
                      required: true,
                      fullWidth: true,
                      size: "small",
                      variant: "filled", 
                      error: touched.date && Boolean(errors.date),
                      helperText: touched.date && errors.date,
                      
                    }
                  }}
                />
              </LocalizationProvider>
            </Grid>
            </Grid>

            <Box sx={{display:"flex",justifyContent:"center"}}>
              <Button
                type="submit"
                variant="contained"
                color="success"
                sx={{ my: 4, py: 1.2, borderRadius: 5,width:"200px",fontWeight:700 }}
              >
                {loading ? (
                <CircularProgress size={24} color="inherit" />
                ) : (
                "Add Earning"
                )}
              </Button>
            </Box>

             {/* ================= PROMOTIONAL BUDGET ALERT ================= */}
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center', }}>
              <Alert 
                severity="info" 
                variant="outlined" 
                sx={{ 
                  width: '100%', 
                  cursor: 'pointer',
                  borderStyle: 'dashed',
                  transition: '0.3s',
                  '&:hover': { 
                    bgcolor: 'rgba(2, 136, 209, 0.08)', 
                    borderColor: 'info.main',
                    transform: 'translateY(-2px)' 
                  }
                }}
                onClick={() => navigate('/budget')}
              >
                <strong>Smart earners are smart spenders.</strong> 💡 Click here to set a <strong>Budget Limit</strong> and maximize your savings!
              </Alert>
            </Box>
        </Form>
      )}
    </Formik>
  );
};
export {ExpenseForm,EarningsForm};