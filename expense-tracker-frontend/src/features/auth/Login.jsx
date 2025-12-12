import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import LoginUser from "../../api/LoginApi";
import { toast } from "react-toastify";

const Login = () => {
  const [loading, setLoading] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email required"),
    password: Yup.string().min(6).required("Password required")
  });

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const response = await LoginUser(values);
      if(response.data.success){
        console.log("Login Success : ", response.data);
        toast.success("Login Successful!")
        sessionStorage.setItem("userId",response.data.data.userId);
        sessionStorage.setItem("email",response.data.data.email);
      }
    } catch (error) {
      console.error(error+", This is error message");
      toast.error(error.response.data.message);
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

              <Box sx={{display:"flex", justifyContent:"flex-end"}}>
                <Typography sx={{textDecoration:"underline",color:"blueviolet"}} component={Link} to="/forgotpass">
                    Forgot Password?
                </Typography>
              </Box>

              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                color="success"
                sx={{borderRadius:"30px",width:"180px",marginLeft:"120px",marginTop:"20px"}}
              >
                {loading ? "Wait up..." : "Login"}
              </Button>
            </form>
          )}
        </Formik>
    </Box>
  );
};

export default Login;
