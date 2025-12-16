
import { useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import ResetPasswordApi from "../../api/ResetPasswordApi";
import { useNavigate, useLocation } from "react-router-dom"; 
import { toast } from "react-toastify";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
        toast.error("Session expired. Please try again.");
        navigate("/forgotpass");
    }
  }, [email, navigate]);

  const validationSchema = Yup.object({
    password: Yup.string().min(6, "Must be at least 6 characters").required("Password required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required("Confirm Password required")
  });

  const handleSubmit = async (values) => {
    try {
      const payload = {
        email: email, 
        password: values.password,
        confirmPassword: values.confirmPassword
      };

      const response = await ResetPasswordApi(payload);
      
      if (response.data.success) {
        toast.success("Password Reset Successfully!");
        navigate("/login");
      } else {
        toast.error("Failed to reset password. Try again.");
      }
    } catch (error) {
      console.error(error);
      const errorMsg = error.response?.data?.message || "Something went wrong";
      toast.error(errorMsg);
    }
  };

  return (
    <Box
      sx={{
        minHeight: {xs:"60vh", md:"90vh"},
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#ffffff", 
        p: 2
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", sm: "80%", md: "450px" }, 
          maxWidth: "450px",
          bgcolor: "#fff",
          boxShadow: "0px 10px 30px rgba(0,0,0,0.08)",
          borderRadius: "24px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: { xs: 3, md: 8 }, 
        }}
      >
        <Box sx={{ mb: 2 }}>
            <img 
                src="https://cdn-icons-png.flaticon.com/512/3064/3064197.png" 
                width="70" 
                alt="Reset Password"
                style={{ opacity: 0.8 }} 
            />
        </Box>

        {/* Headings */}
        <Typography variant="h5" sx={{ fontWeight: 800, mb: 1, color: "#333", textAlign: 'center' }}>
          Reset Password
        </Typography>

        <Typography sx={{ color: "#666", mb: 4, textAlign: 'center', fontSize: "0.9rem" }}>
          Create a strong password for <strong>{email}</strong>
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
            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
              
              <TextField
                fullWidth
                label="New Password"
                name="password"
                type="password" // IMPORTANT: Hides text
                value={values.password}
                onChange={handleChange}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                sx={{ mb: 3 }}
                InputProps={{ style: { borderRadius: "12px" } }}
              />

              <TextField
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type="password" // IMPORTANT: Hides text
                value={values.confirmPassword}
                onChange={handleChange}
                error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                helperText={touched.confirmPassword && errors.confirmPassword}
                sx={{ mb: 3 }}
                InputProps={{ style: { borderRadius: "12px" } }}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ 
                    py: 1.5, 
                    borderRadius: "12px", 
                    fontWeight: "bold",
                    textTransform: "none",
                    bgcolor: "#00A884",
                    "&:hover": { bgcolor: "#008f70" }
                }}
              >
                Reset Password
              </Button>

            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default ResetPassword;