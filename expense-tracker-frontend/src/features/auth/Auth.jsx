// import { useState } from "react";
// import { Box, Grid, Typography, Button } from "@mui/material";
// import Signup from "./Signup";
// import Login from "./Login"; // <-- you need a Login component
// import { useNavigate } from "react-router";

// const Auth = ({flag}) => {
  
//   const navigate = useNavigate();
//   const isLogin = flag;

//   return (
//     <Box
//       sx={{
//         minHeight: "80vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         background: "#ffffffd8",
//         py: isLogin ? 2:8,
//       }}
//     >
//       <Grid
//         container
//         sx={{
//           width: { xs: "100%", md: "75%" },
//           bgcolor: "#fff",
//           boxShadow: "0px 10px 30px rgba(0,0,0,0.1)",
//           borderRadius: "16px",
//           overflow: "hidden",
//           transition: "0.5s",
//           height:isLogin ? "450px" : "auto"
//         }}
//       >
//         {/* LEFT PANEL SWITCHING */}
//         <Grid
//           item
//           xs={12}
//           md={6}
//           sx={{
//             background: "#00A884",
//             px: 5,
//             color: "white",
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             textAlign: "left",
//             transition: "0.5s",
//           }}
//         >
//           {isLogin ? (
//             <>
//               <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
//                 Welcome Back!
//               </Typography>

//               <Typography sx={{ mb: 4 }}>
//                 Login to access your dashboard, track expenses, and manage budgets.
//               </Typography>
//               <Typography sx={{ mb: 2,fontWeight:"700" }}>
//                 Don't have an Account? Just tap below!
//               </Typography>

//               <Button
//                 variant="outlined"
//                 sx={{
//                   borderColor: "white",
//                   color: "white",
//                   width: "180px",
//                   borderRadius: "30px",
//                 }}
//                 onClick={() => navigate('/signup')}
//               >
//                 SIGN UP
//               </Button>
//             </>
//           ) : (
//             <>
//               <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
//                 Hello, Friend!
//               </Typography>

//               <Typography sx={{ mb: 4 }}>
//                 Enter your personal details and start your journey with us.
//               </Typography>

//               <Typography sx={{ mb: 2,fontWeight:"700" }}>
//                 Already have an Account? Just tap below!
//               </Typography>

//               <Button
//                 variant="outlined"
//                 sx={{
//                   borderColor: "white",
//                   color: "white",
//                   width: "180px",
//                   borderRadius: "30px",
//                 }}
//                 onClick={() => navigate('/login')}
//               >
//                 SIGN IN
//               </Button>
//             </>
//           )}
//         </Grid>

//         {/* RIGHT PANEL SWITCHING */}
//         <Grid
//           item
//           xs={12}
//           md={6}
//           sx={{
//             p: 5,
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             transition: "0.5s",
//           }}
//         >
//           {isLogin ? (
//             <>
//               <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
//                 Sign In
//               </Typography>
//               <Login />
//             </>
//           ) : (
//             <>  
//               <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
//                 Create Account
//               </Typography>
//               <Signup />
//             </>
//           )}
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default Auth;

import { useState } from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import Signup from "./Signup";
import Login from "./Login"; // <-- you need a Login component
import { useNavigate } from "react-router";

const Auth = ({ flag }) => {
  const navigate = useNavigate();
  const isLogin = flag;

  return (
    <Box
      sx={{
        mt: "100px",
        mb:'150px',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#ffffffd8",
        px: { xs: 1, sm: 2 },
      }}
    >
      <Grid
        container
        sx={{
          width: { xs: "100%", sm: "90%", md: "70%" },
          bgcolor: "#fff",
          boxShadow: "0px 10px 30px rgba(0,0,0,0.1)",
          borderRadius: "16px",
          overflow: "hidden",
        }}
      >
        {/* LEFT PANEL */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            background: "#00A884",
            px: { xs: 5, md: 5 },
            py: { xs: 4, md: 0 }, 
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: { xs: "center", md: "left" },
          }}
        >
          {isLogin ? (
            <>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                Welcome Back!
              </Typography>

              <Typography sx={{ mb: 3 }}>
                Login to access your dashboard and track expenses.
              </Typography>

              <Typography sx={{ mb: 2,fontWeight:"700" }}>
                  Don't have an Account? Just tap below!
               </Typography>

              <Button
                variant="outlined"
                sx={{
                  borderColor: "white",
                  color: "white",
                  width: "180px",
                  borderRadius: "30px",
                  mx: { xs: "auto", md: 0 },
                }}
                onClick={() => navigate("/signup")}
              >
                SIGN UP
              </Button>
            </>
          ) : (
            <>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                Hello, Friend!
              </Typography>

              <Typography sx={{ mb: 3 }}>
                Enter your details and start your journey.
              </Typography>

               <Typography sx={{ mb: 2,fontWeight:"700" }}>
                  Already have an Account? Just tap below!
               </Typography>

              <Button
                variant="outlined"
                sx={{
                  borderColor: "white",
                  color: "white",
                  width: "180px",
                  borderRadius: "30px",
                  mx: { xs: "auto", md: 0 },
                }}
                onClick={() => navigate("/login")}
              >
                SIGN IN
              </Button>
            </>
          )}
        </Grid>

        {/* RIGHT PANEL */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            p: { xs: 3, sm: 4, md: 7 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, mb: 3, textAlign: "center" }}
          >
            {isLogin ? "Sign In" : "Create Account"}
          </Typography>

          {isLogin ? <Login /> : <Signup />}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Auth;
