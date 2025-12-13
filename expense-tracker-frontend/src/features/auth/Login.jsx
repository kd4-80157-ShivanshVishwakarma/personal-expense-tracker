import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import LoginUser from "../../api/LoginApi";
import { toast } from "react-toastify";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email required"),
    password: Yup.string().min(6).required("Password required"),
  });

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const response = await LoginUser(values);
      if (response.data.success) {
        toast.success("Login Successful!");

        sessionStorage.setItem("userId", response.data.data.userId);
        sessionStorage.setItem("email", response.data.data.email);
        sessionStorage.setItem("name", response.data.data.name);

        navigate("/");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 400,
        mx: "auto",
        p: { xs: 2, sm: 3 },
        px:{xs:0,sm:3},
        background: "#fff",
      }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
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

            <TextField
              size="small"
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ mb: 2 }}
            />

            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
              <Typography
                component={Link}
                to="/forgotpass"
                sx={{
                  fontSize: "14px",
                  textDecoration: "underline",
                  color: "blueviolet",
                }}
              >
                Forgot Password?
              </Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                type="submit"
                variant="contained"
                color="success"
                disabled={loading}
                sx={{
                  borderRadius: "30px",
                  width: "180px",
                }}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Login;
