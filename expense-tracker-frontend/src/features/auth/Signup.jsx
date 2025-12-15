import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import signupUser from "../../api/userApi";
import { toast } from "react-toastify";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const Signup = () => {
  const [loading, setLoading] = useState(false);

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dob: "",
    gender: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name required"),
    lastName: Yup.string().required("Last name required"),
    email: Yup.string().email("Invalid email").required("Email required"),
    password: Yup.string().min(6).required("Password required"),
    dob: Yup.string().required("Date of birth required"),
    gender: Yup.string().required("Gender required"),
  });

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      await signupUser(values);
      toast.success("Signup Successful!");
    } catch (error) {
      toast.error("Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 420,
        mx: "auto",
        // p: { xs: 0, sm: 1 },
        background: "#fff",
      }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, handleSubmit,setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <TextField
              size="small"
              fullWidth
              label="First Name"
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              error={touched.firstName && Boolean(errors.firstName)}
              helperText={touched.firstName && errors.firstName}
              sx={{ mb: 2 }}
            />

            <TextField
              size="small"
              fullWidth
              label="Last Name"
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
              error={touched.lastName && Boolean(errors.lastName)}
              helperText={touched.lastName && errors.lastName}
              sx={{ mb: 2,  }} 
            />

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

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date of Birth"
                format="DD/MM/YYYY"
                value={values.dob ? dayjs(values.dob) : null}
                name="dob"
                onChange={(newValue) => {
                    const formattedDate = newValue ? newValue.format("YYYY-MM-DD") : "";
                    setFieldValue("dob", formattedDate);
                }}
                slotProps={{
                  textField: {
                    size: "small",
                    fullWidth: true,
                    error: touched.dob && Boolean(errors.dob),
                    helperText: touched.dob && errors.dob,
                    sx: { mb: 2 }
                  }
                }}
              />
            </LocalizationProvider>

            <TextField
              size="small"
              fullWidth
              select
              label="Gender"
              name="gender"
              value={values.gender}
              onChange={handleChange}
              error={touched.gender && Boolean(errors.gender)}
              helperText={touched.gender && errors.gender}
              sx={{ mb: 3 }}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>

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
                {loading ? "Creating..." : "Sign Up"}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Signup;
