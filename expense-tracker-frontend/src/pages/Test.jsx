import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  TextField,
  CircularProgress,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";

const CloudinaryTest = () => {
  const [uploadedImage, setUploadedImage] = useState("");
  const [loading, setLoading] = useState(false);

  const initialValues = {
    title: "",
    image: null,
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Required"),
    image: Yup.mixed().required("Image is required"),
  });

  const handleUpload = async (file) => {
    setLoading(true);
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", "mtxudsvf"); // unsigned preset

    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/dxh2gfplk/image/upload`,
      formData
    );

    setUploadedImage(res.data.secure_url);
    setLoading(false);
    return res.data.secure_url;
  };

  const handleSubmit = async (values, { resetForm }) => {
    const url = await handleUpload(values.image);

    console.log("Uploaded URL:", url);

    alert("Image Uploaded:\n" + url);

    resetForm();
    setUploadedImage("");
  };

  return (
    <Paper
      sx={{
        p: 4,
        maxWidth: 500,
        mx: "auto",
        mt: 5,
        borderRadius: 4,
      }}
      elevation={3}
    >
      <Typography variant="h5" mb={2} fontWeight={600}>
        Cloudinary Upload Test
      </Typography>

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ errors, touched, setFieldValue }) => (
          <Form>
            {/* Title Input */}
            <TextField
              fullWidth
              name="title"
              label="Title"
              margin="normal"
              error={Boolean(errors.title && touched.title)}
              helperText={touched.title && errors.title}
              onChange={(e) => setFieldValue("title", e.target.value)}
            />

            {/* Image Input */}
            <Button variant="contained" component="label" sx={{ mt: 2 }}>
              Select Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => setFieldValue("image", e.target.files[0])}
              />
            </Button>
            {errors.image && touched.image && (
              <Typography color="error" fontSize={13} mt={1}>
                {errors.image}
              </Typography>
            )}

            {/* Loading Spinner */}
            {loading && <CircularProgress sx={{ mt: 2 }} />}

            {/* Image Preview */}
            {uploadedImage && (
              <Box mt={3} textAlign="center">
                <img
                  src={uploadedImage}
                  alt="uploaded"
                  width="200"
                  style={{ borderRadius: 8 }}
                />
                <Typography mt={1}>{uploadedImage}</Typography>
              </Box>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="success"
              sx={{ mt: 3, py: 1.2, borderRadius: 2 }}
            >
              Upload Image
            </Button>
          </Form>
        )}
      </Formik>
    </Paper>
  );
};

export default CloudinaryTest;
