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
import {ForgotPasswordApi,OtpApi} from "../../api/ForgotPasswordApi";
import { useNavigate } from "react-router";

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
    try{
      setLoading(true);
      if (!otpSent) {
        const payload ={email: values.email};
        const response = await ForgotPasswordApi(payload);
        console.log(response);
        if(response.data.success){
            setLoading(false);
            setOtpSent(true);
            setTimer(60);
            alert("OTP sent to your email!");
        }
        else{
          setLoading(false);
            alert("Wront Email ID, Please Try again!");
        }
      
    } else {
            const payload= {otp:values.otp}
            const response = await OtpApi(payload);
            console.log(response);
            if(response.data.success || response.data){
              navigate("/resetpass");
            }
            else alert("You entered a wrong OTP");    
        }
    }
    catch (error) {
      setLoading(false);
        console.error("ERROR:", error);
        alert("Something went wrong.");
    }
  };

  return (
    <Box sx={{display:"flex",
          justifyContent:"center",bgcolor:"#ffffffd8"}}>
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
        {/* Top Illustration */}
        <Box sx={{ mb: 2 }}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/6195/6195699.png"
            width="90"
            alt="Forgot"
          />
        </Box>

        {/* Headings */}
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
          Forgot your password?
        </Typography>

        <Typography sx={{ color: "#555", mb: 4 }}>
          Enter your email to receive an OTP for password reset.
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
            <form onSubmit={handleSubmit}>
              
              <TextField
                size="small"
                fullWidth
                label="Email"
                name="email"
                value={values.email}
                onChange={handleChange}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                sx={{ mb: 2 }}
              />

              {otpSent && (
                <TextField
                  size="small"
                  fullWidth
                  label="Enter OTP"
                  name="otp"
                  value={values.otp}
                  onChange={handleChange}
                  error={touched.otp && Boolean(errors.otp)}
                  helperText={touched.otp && errors.otp}
                  sx={{ mb: 2 }}
                />
              )}

              <Button
                type="submit"
                variant="contained"
                color="success"
                sx={{ py: 1.2, borderRadius: "30px", mb: 2,width:"180px" }}
              >
                {!otpSent ? "Send OTP" : "Verify OTP"}
              </Button>

              {/* Timer + Resend */}
              {otpSent && (
                <Box sx={{ mb: 2 }}>
                  {timer > 0 ? (
                    <Typography sx={{ fontSize: "14px", color: "#777" }}>
                      Resend OTP in <strong>{timer}</strong> sec
                    </Typography>
                  ) : (
                    <Button
                      variant="text"
                      onClick={() => {
                        setOtpSent(false);
                        setTimer(60);
                      }}
                    >
                      Resend OTP
                    </Button>
                  )}
                </Box>
              )}

              {/* Back to login */}
              <Box sx={{ mt: 3 }}>
                <Link href="/login" underline="none" sx={{ color: "#444" }}>
                  ← Back to Login
                </Link>
              </Box>
            </form>
          )}
        </Formik>

        {/* Footer */}
      </Box>
    </Box>
    {loading && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(255, 255, 255, 0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            backdropFilter: "blur(3px)",
          }}
        >
         <CircularProgress size={60} color="success" />
        </Box>
      )}
    </Box>
  );
};
export default ForgotPassword;
