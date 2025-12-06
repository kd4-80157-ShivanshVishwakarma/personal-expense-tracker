import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Paper,
} from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import signupUser from "../../api/userApi";

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
      const response = await signupUser(values);
      console.log("Signup Success:", response.data);
      alert("Signup Successful!");
    } catch (error) {
      console.error(error+"This is error message");
      alert("Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#fff",
        padding: 2,
        width:"400px"
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
                sx={{ mb: 2 }}
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

              <TextField
              size="small"
                fullWidth
                label="Date of Birth"
                name="dob"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={values.dob}
                onChange={handleChange}
                error={touched.dob && Boolean(errors.dob)}
                helperText={touched.dob && errors.dob}
                sx={{ mb: 2 }}
              />

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

              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                color="success"
                sx={{borderRadius:"30px",width:"180px",marginLeft:"120px"}}
              >
                {loading ? "Creating..." : "Sign Up"}
              </Button>
            </form>
          )}
        </Formik>
    </Box>
  );
};

export default Signup;
