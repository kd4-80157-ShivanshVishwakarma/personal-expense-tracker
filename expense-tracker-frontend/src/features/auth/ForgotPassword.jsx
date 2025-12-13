import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Link,
  CircularProgress
} from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { ForgotPasswordApi, OtpApi } from "../../api/ForgotPasswordApi";
import { useNavigate } from "react-router-dom"; // Fixed import (was 'react-router')
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(60);
  const navigate = useNavigate();

  useEffect(() => {
    let interval;
    if (otpSent && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email required"),
    otp: otpSent
      ? Yup.string().required("OTP required")
      : Yup.string().notRequired(),
  });

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      if (!otpSent) {
        // Step 1: Send OTP
        const payload = { email: values.email };
        const response = await ForgotPasswordApi(payload);
        
        if (response.data.success) {
          setOtpSent(true);
          setTimer(60);
          toast.success("OTP sent to your email!");
        } else {
          toast.error("Wrong Email ID, Please Try again!");
        }
      } else {
        
        const payload = { email: values.email, otp: values.otp };
        const response = await OtpApi(payload);
        
        if (response.data.success || response.data) {
          
          navigate("/resetpass", { state: { email: values.email } });
        } else {
          toast.warning("You entered a wrong OTP");
        }
      }
    } catch (error) {
      console.error("ERROR:", error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: {xs:"60vh", md:"90vh"}, 
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#fff",
        p: 2, 
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", sm: "70%", md: "45%", lg: "35%" },
          maxWidth: "500px",
          bgcolor: "#fff",
          boxShadow: "0px 10px 40px rgba(0,0,0,0.08)",
          borderRadius: "24px", 
          overflow: "hidden",
          transition: "0.3s",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: { xs: 3, md: 8 }, 
        }}
      >
        {/* Top Illustration */}
        <Box sx={{ mb: 3 }}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/6195/6195699.png"
            width="80"
            alt="Forgot Password Icon"
            style={{ opacity: 0.9 }}
          />
        </Box>

        {/* Headings */}
        <Typography variant="h5" sx={{ fontWeight: 800, mb: 1, color: "#333" }}>
          Forgot Password?
        </Typography>

        <Typography sx={{ color: "#666", mb: 4, textAlign: "center", fontSize: "0.95rem" }}>
          {otpSent 
            ? `We sent a code to your email. Enter it below.` 
            : "Enter your registered email to receive a verification code."}
        </Typography>

        <Formik
          initialValues={{ email: "", otp: "" }}
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
                label="Email Address"
                name="email"
                value={values.email}
                onChange={handleChange}
                disabled={otpSent} 
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                sx={{ mb: 3 }}
                InputProps={{
                    style: { borderRadius: "12px" }
                }}
              />

              {/* Smooth Animation for OTP Field */}
              {otpSent && (
                <TextField
                  fullWidth
                  label="Enter 6-digit OTP"
                  name="otp"
                  value={values.otp}
                  onChange={handleChange}
                  error={touched.otp && Boolean(errors.otp)}
                  helperText={touched.otp && errors.otp}
                  sx={{ mb: 2, animation: "fadeIn 0.5s" }}
                  InputProps={{
                    style: { borderRadius: "12px" }
                }}
                />
              )}

              <Button
                type="submit"
                variant="contained"
                fullWidth // Make button full width for better mobile UX
                disabled={loading}
                sx={{
                  py: 1.5,
                  borderRadius: "12px",
                  mb: 2,
                  fontWeight: "bold",
                  bgcolor: "#00A884", // Using your brand color
                  "&:hover": { bgcolor: "#008f70" },
                  textTransform: "none",
                  fontSize: "1rem"
                }}
              >
                {loading 
                  ? "Processing..." 
                  : (!otpSent ? "Send Verification Code" : "Verify & Proceed")}
              </Button>

              {/* Timer + Resend */}
              {otpSent && (
                <Box sx={{ mb: 3, textAlign: 'center' }}>
                  {timer > 0 ? (
                    <Typography sx={{ fontSize: "14px", color: "#777" }}>
                      Resend code in <strong style={{color: "#00A884"}}>{timer}s</strong>
                    </Typography>
                  ) : (
                    <Button
                      variant="text"
                      onClick={() => {
                        setOtpSent(false); // Reset to allow email editing/resending
                        setTimer(60);
                      }}
                      sx={{ textTransform: "none", color: "#00A884", fontWeight: 600 }}
                    >
                      Resend Code
                    </Button>
                  )}
                </Box>
              )}

              {/* Back to login */}
              <Box sx={{ mt: 1, textAlign: "center" }}>
                <Link 
                    component="button" // Use button behavior to prevent refresh
                    onClick={() => navigate('/login')}
                    underline="hover" 
                    sx={{ color: "#555", fontSize: "0.9rem", fontWeight: 500 }}
                >
                  ← Back to Login
                </Link>
              </Box>
            </form>
          )}
        </Formik>
      </Box>

      {/* Loading Overlay */}
      {loading && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            bgcolor: "rgba(255, 255, 255, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            backdropFilter: "blur(4px)",
          }}
        >
          <CircularProgress size={50} sx={{ color: "#00A884" }} />
        </Box>
      )}
    </Box>
  );
};

export default ForgotPassword;