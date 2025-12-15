import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTheme, useMediaQuery } from '@mui/material';

const GlobalToast = () => {
  const theme = useTheme();
  // Detect if screen is small (mobile)
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <ToastContainer
      // Responsive Position: Center on mobile, Top-Right on desktop
      // position={isMobile ? "top-center" : "top-right"}
      
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      
      // Responsive Styling
      toastStyle={{ 
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontSize: isMobile ? "14px" : "15px", // Slightly smaller text on mobile
        borderRadius: "8px", // Force rounded corners even on mobile
        marginBottom: isMobile ? "10px" : "default"
      }}
      
      style={{
        // On mobile, add some padding so it doesn't touch screen edges
        width: isMobile ? "70%" : "320px", 
        left: isMobile ? "auto" : "auto", // Center logic for width 90%
        top: isMobile ? "20px" : "1em"
      }}
    />
  );
};

export default GlobalToast;