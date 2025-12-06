import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Link
} from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import ResetPasswordApi from "../../api/ResetPasswordApi";
import { useNavigate } from "react-router";

const ResetPassword = () => {

    const navigate = useNavigate();
  
  const validationSchema = Yup.object({
    password: Yup.string().min(6).required("Password required"),
    confirmPassword:Yup.string().min(6).required("Confirm Password required").oneOf([Yup.ref('password'), null], 'Passwords must match')
  });

  const handleSubmit = async (values) => {
    try {
        const response = await ResetPasswordApi(values);
        if(response.data.success){
            navigate("/login");
            alert("Password Reset Successfully!")
        }
        else{
            console.log(response);
            alert("Something went wrong!");
        }
    } catch (error) {
        console.error(error);
        alert("Oops! Something went wrong")
    }
  };

  return (
    <Box sx={{display:"flex",
          justifyContent:"center"}}>
    <Box
      sx={{
          width: { xs: "35%", md: "40%" },
          bgcolor: "#fff",
          boxShadow: "0px 10px 30px rgba(0,0,0,0.1)",
          borderRadius: "16px",
          overflow: "hidden",
          transition: "0.5s",
          display:"flex",
          justifyContent:"center",
          my:5
        }}
    >
      <Box sx={{ width: "100%", maxWidth: 450, textAlign: "center", p: 4 }}>

        {/* Headings */}
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
          Reset your password
        </Typography>

        <Typography sx={{ color: "#555", mb: 4 }}>
          Enter new password to recover your account
        </Typography>

        <Formik
          initialValues={{ password: "", confirmPassword: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              
              <TextField
                size="small"
                fullWidth
                label="Password"
                name="password"
                value={values.password}
                onChange={handleChange}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                sx={{ mb: 2 }}
              />

                <TextField
                  size="small"
                  fullWidth
                  label="Confirm Password"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                  helperText={touched.confirmPassword && errors.confirmPassword}
                  sx={{ mb: 2 }}
                />

              <Button
                type="submit"
                variant="contained"
                color="success"
                sx={{ py: 1.2, borderRadius: "30px", mb: 2,width:"180px" }}>
                Submit
              </Button>

            </form>
          )}
        </Formik>
      </Box>
    </Box>
    </Box>
  );
};

export default ResetPassword;