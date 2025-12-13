import { useState, useEffect } from "react";
import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  Grid,
  Dialog,
  DialogContent,
  DialogActions,Paper
} from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import {ProfileGetApi,ProfileUpdateApi} from "../api/ProfileApi";
import ChangePassword from "../features/auth/ChangePassword";
import { toast } from "react-toastify";

const UpdateProfile = () => {
  const [openDeactivate, setOpenDeactivate] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(null);

  const handleSubmit = async (values) => {
      try {
        const response = await ProfileUpdateApi(values);
        if(response.data.success){
            console.log(response.data);
            toast.success("Profile has been updated!");
            setIsEditing(false);
        }
      } catch (error) {
        console.error(error);
        toast.error(error.response.data.message);
      }
    };
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await ProfileGetApi();
        console.log(response);
        if(response.data.success){
          setProfileData(response.data.data);
        }
        else toast.error(response.data.message)
      } catch (error) {
        console.error(error);
        toast.error(error.response.data.message)
      }
    };
    fetchUser();
  }, []);

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    dob: Yup.string().required("Required"),
  });

  if (!profileData) {
    return <Typography sx={{ mt: 10, textAlign: "center" }}>Loading...</Typography>;
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        background: "#fff",
        py: 6,
        px: 2,
      }}>
      <Card
        sx={{
          width: { xs: "100%", sm: "500px", md: "720px" },
          borderRadius: 4,
          boxShadow: "0px 8px 25px rgba(0,0,0,0.1)",
          overflow: "hidden",
        }}
      >
        {/* TOP BANNER */}
        <Box
          sx={{
            height: "140px",
            background: "#BFE4C7",
            position: "relative",
            borderBottom: "1px solid #eee",
          }}
        >
          {/* Profile Icon */}
          <Box
            sx={{
              width: 90,
              height: 90,
              borderRadius: "50%",
              background: "white",
              border: "4px solid #00A884",
              position: "absolute",
              left: "50%",
              bottom: "-45px",
              transform: "translateX(-50%)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#00A884",
              fontSize: "50px",
            }}
          >
            👤
          </Box>
        </Box>

        {/* INNER CONTENT */}
        <Box sx={{ p: 4, pt: 5 }}>
           <Typography variant="h5" sx={{ fontWeight: 700, my: 2, paddingLeft:3 }}>
                Manage Profile
            </Typography>

          <Paper
            elevation={1}
            sx={{
              p: 4,
              mt: 3,
              borderRadius: 8,
              background: "#ffffffff",
              border: "1px solid #f6f2f2ff",
            }}
          >
          <Formik
            enableReinitialize
            initialValues={profileData}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit: formikHandleSubmit,
            }) => (
              <>
                {/* --- FORM START --- */}
                <form onSubmit={formikHandleSubmit}>
                  
                  {/* EDIT PROFILE */}
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, my: 4, display: "flex", justifyContent: "center" }}
                >
                  Edit Profile
                </Typography>

                <Box>
                  <Grid
                    container
                    spacing={4}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    {/* FIRST NAME */}
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        size="small"
                        label="First Name"
                        name="firstName"
                        value={values.firstName}
                        onChange={handleChange}
                        disabled={!isEditing}
                        error={touched.firstName && Boolean(errors.firstName)}
                        helperText={touched.firstName && errors.firstName}
                      />
                    </Grid>

                    {/* LAST NAME */}
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Last Name"
                        name="lastName"
                        value={values.lastName}
                        onChange={handleChange}
                        disabled={!isEditing}
                        error={touched.lastName && Boolean(errors.lastName)}
                        helperText={touched.lastName && errors.lastName}
                      />
                    </Grid>

                    {/* EMAIL */}
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        disabled={!isEditing}
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                      />
                    </Grid>

                    {/* DOB */}
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Date of Birth"
                        name="dob"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={values.dob}
                        onChange={handleChange}
                        disabled={!isEditing}
                        error={touched.dob && Boolean(errors.dob)}
                        helperText={touched.dob && errors.dob}
                        sx={{ width: "222px" }}
                      />
                    </Grid>
                  </Grid>
                </Box>

                  {/* SAVE BUTTON ONLY */}
                  {isEditing && (
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="success"
                        sx={{ mt: 3, width: "150px", borderRadius: "30px",fontSize: "12px",fontWeight: 600,}}
                      >
                        Save Changes
                      </Button>

                      <Button
                        variant="contained"
                        color="error"
                        sx={{ mt: 3, width: "120px", borderRadius: "30px",fontWeight: 600,
                          fontSize: "12px",ml:2 }}
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </Button>
                    </Box>
                  )}
                    {!isEditing && (
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <Button
                        variant="contained"
                        color="success"
                        sx={{ mt: 3, width: "140px", borderRadius: "30px",fontWeight: 600,
                          fontSize: "12px", }}
                        onClick={() => setIsEditing(true)}
                      >
                        Edit Profile
                      </Button>
                    </Box>
                  )}
                </form>              
              </>
            )}
          </Formik>
          </Paper>

            <Box
                sx={{
                  height: "1px",
                  background: "#e0e0e0",
                  my: 4,
                }}
              ></Box>

              {/* ACCOUNT SECURITY SECTION */}
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2,paddingLeft:3 }}>
                Account Security
              </Typography>

              <ChangePassword />
        </Box>
      </Card>

      {/* DEACTIVATE DIALOG
      <Dialog open={openDeactivate} onClose={() => setOpenDeactivate(false)}>
        <DialogContent sx={{ textAlign: "center", p: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Are you sure?
          </Typography>
          <Typography sx={{ color: "#666" }}>
            This will deactivate your account permanently.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2, justifyContent: "center" }}>
          <Button onClick={() => setOpenDeactivate(false)}>Cancel</Button>
          <Button
            color="error"
            variant="contained"
            onClick={() => {
              setOpenDeactivate(false);
              alert("Account Deactivated!");
            }}
          >
            Deactivate
          </Button>
        </DialogActions>
      </Dialog> */}
    </Box>
  );
};

export default UpdateProfile;
