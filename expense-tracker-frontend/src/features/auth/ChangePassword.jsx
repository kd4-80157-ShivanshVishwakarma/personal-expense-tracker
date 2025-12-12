import { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  InputAdornment,
  IconButton,
  Paper
} from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import changePasswordApi from "../../api/ChangePasswordApi";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const validationSchema = Yup.object({
    oldPassword: Yup.string().required("Old Password is required"),
    newPassword: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("New Password is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
        const response = await changePasswordApi(values);
        if(response.data.success){
            console.log(response.data);
            toast.success(response.data.message);
            resetForm();
        }
        else toast.error(response.data.message);
      } catch (error) {
        console.error(error);
        toast.error(error.response.data.message)
      }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        mt: 3
      }}
    >
      <Paper
        elevation={2}
        sx={{
          p: 4,
          borderRadius: 8,
          background: "#ffffff",
          border: "1px solid #f0f0f0",
          width: "100%",  
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: 700, mb: 3, textAlign: "left", display: "flex", justifyContent: "center" }}
        >
          Change Password
        </Typography>

        <Formik
        initialValues={{ oldPassword: "", newPassword: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
            <form
            onSubmit={handleSubmit}
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",   
                width: "100%"
            }}
            >
            {/* OLD PASSWORD */}
            <TextField
                size="small"
                fullWidth
                label="Old Password"
                name="oldPassword"
                type={showOld ? "text" : "password"}
                value={values.oldPassword}
                onChange={handleChange}
                error={touched.oldPassword && Boolean(errors.oldPassword)}
                helperText={touched.oldPassword && errors.oldPassword}
                sx={{ mb: 3, maxWidth: "350px" }}  // 🔥 FIXED WIDTH CENTERED
                InputProps={{
                sx: { borderRadius: 2 },
                endAdornment: (
                    <InputAdornment position="end">
                    <IconButton onClick={() => setShowOld(!showOld)}>
                        {showOld ? "🙈" : "👁️"}
                    </IconButton>
                    </InputAdornment>
                ),
                }}
            />

            {/* NEW PASSWORD */}
            <TextField
                size="small"
                fullWidth
                label="New Password"
                name="newPassword"
                type={showNew ? "text" : "password"}
                value={values.newPassword}
                onChange={handleChange}
                error={touched.newPassword && Boolean(errors.newPassword)}
                helperText={touched.newPassword && errors.newPassword}
                sx={{ mb: 3, maxWidth: "350px" }}  // 🔥 SAME WIDTH
                InputProps={{
                sx: { borderRadius: 2 },
                endAdornment: (
                    <InputAdornment position="end">
                    <IconButton onClick={() => setShowNew(!showNew)}>
                        {showNew ? "🙈" : "👁️"}
                    </IconButton>
                    </InputAdornment>
                ),
                }}
            />

            <Button
                type="submit"
                variant="contained"
                color="success"
                sx={{
                width: "180px",
                py: 1.2,
                borderRadius: "30px",
                fontWeight: 600,
                fontSize: "12px",
                mt: 1
                }}
            >
                UPDATE PASSWORD
            </Button>
            </form>
        )}
        </Formik>

      </Paper>
    </Box>
  );
};

export default ChangePassword;
