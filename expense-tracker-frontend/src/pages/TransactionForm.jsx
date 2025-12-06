import React, { useState } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Typography,
  InputAdornment,Grid
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {TransactionExpenseApi as transactionExpenseApi,TransactionEarningApi as transactionEarningApi} from "../api/TransactionApi";
import { uploadImageToCloudinary } from "../services/cloudinaryService";

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

  const[Loading,setLoading] = useState(true);
  
  const handleSubmit= async (values)=>{
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
        alert(response.data.message);
      }
      else{
        alert(response.data.response);
      }
    } catch (error) {
      console.error(error+"This is error message");
      alert("Something went wrong");
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
          <Typography variant="h5" sx={{ mb: 3, display: "flex", justifyContent: "center", fontWeight:700 }}>
            Expense Entry
          </Typography>
          <Box sx={{ height: "1px", background: "#e0e0e0", my: 4 }} />

          {/* Grid Container starts here */}
          <Grid container spacing={5}>
            
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
                error={touched.title && Boolean(errors.title)}
                helperText={touched.title && errors.title}
                sx={{width:"16rem",'& .MuiFilledInput-root': {
                        backgroundColor: '#f9f1f19c',
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
                        backgroundColor: '#f9f1f19c',
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
                multiline
                sx={{width:"16rem",'& .MuiFilledInput-root': {
                        backgroundColor: '#f9f1f19c',
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
                        backgroundColor: '#f9f1f19c',
                        }}}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
              required
                fullWidth
                size="small"
                variant="filled"
                type="date"
                label="Date"
                name="date"
                value={values.date}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                error={touched.date && Boolean(errors.date)}
                helperText={touched.date && errors.date}
                sx={{width:"16rem",
                    '& .MuiFilledInput-root': {
                        backgroundColor: '#f9f1f19c',
                        }
                }}
              />
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
              >
                Add Expense
              </Button>
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

  const[Loading,setLoading] = useState(true);

  const handleSubmit= async (values)=>{
    try {
      setLoading(true);
      const response = await transactionEarningApi(values);
      if(response.data.success){
        console.log(response.data);
        alert(response.data.message);
      }
      else{
        alert(response.data.response);
      }
    } catch (error) {
      console.error(error+"This is error message");
      alert("Something went wrong");
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
      {({ values, errors, touched, handleChange }) => (
        <Form>
          <Typography variant="h5" sx={{ mb: 3, display: "flex", justifyContent: "center", fontWeight:700 }}>
            Earning Entry
          </Typography>
          <Box sx={{ height: "1px", background: "#e0e0e0", my: 4 }} />

          {/* Grid Container starts here */}
          <Grid container spacing={5}>
            
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
                error={touched.title && Boolean(errors.title)}
                helperText={touched.title && errors.title}
                sx={{width:"16rem",'& .MuiFilledInput-root': {
                        backgroundColor: '#f9f1f19c',
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
                        backgroundColor: '#f9f1f19c',
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
                multiline
                sx={{width:"16rem",'& .MuiFilledInput-root': {
                        backgroundColor: '#f9f1f19c',
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
                        backgroundColor: '#f9f1f19c',
                        }}}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
              required
                fullWidth
                size="small"
                variant="filled"
                type="date"
                label="Date"
                name="date"
                value={values.date}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                error={touched.date && Boolean(errors.date)}
                helperText={touched.date && errors.date}
                sx={{width:"16rem",
                    '& .MuiFilledInput-root': {
                        backgroundColor: '#f9f1f19c',
                }
                }}
              />
            </Grid>
            </Grid>

            <Box sx={{display:"flex",justifyContent:"center"}}>
              <Button
                type="submit"
                variant="contained"
                color="success"
                sx={{ my: 4, py: 1.2, borderRadius: 5,width:"200px",fontWeight:700 }}
              >
                Add Earning
              </Button>
            </Box>

          
        </Form>
      )}
    </Formik>
  );
};

export {ExpenseForm,EarningsForm};