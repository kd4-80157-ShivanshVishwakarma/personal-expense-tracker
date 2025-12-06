import { useState } from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import Signup from "./Signup";
import Login from "./Login"; // <-- you need a Login component

const Auth = (props) => {
  const [isLogin, setIsLogin] = useState(props.flag);
  return (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#ffffffd8",
        py: isLogin ? 2:8,
      }}
    >
      <Grid
        container
        sx={{
          width: { xs: "100%", md: "75%" },
          bgcolor: "#fff",
          boxShadow: "0px 10px 30px rgba(0,0,0,0.1)",
          borderRadius: "16px",
          overflow: "hidden",
          transition: "0.5s",
          height:isLogin ? "450px" : "auto"
        }}
      >
        {/* LEFT PANEL SWITCHING */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            background: "#00A884",
            px: 5,
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "left",
            transition: "0.5s",
          }}
        >
          {isLogin ? (
            <>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                Welcome Back!
              </Typography>

              <Typography sx={{ mb: 4 }}>
                Login to access your dashboard, track expenses, and manage budgets.
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
                }}
                onClick={() => setIsLogin(false)}
              >
                SIGN UP
              </Button>
            </>
          ) : (
            <>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                Hello, Friend!
              </Typography>

              <Typography sx={{ mb: 4 }}>
                Enter your personal details and start your journey with us.
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
                }}
                onClick={() => setIsLogin(true)}
              >
                SIGN IN
              </Button>
            </>
          )}
        </Grid>

        {/* RIGHT PANEL SWITCHING */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            p: 5,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            transition: "0.5s",
          }}
        >
          {isLogin ? (
            <>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
                Sign In
              </Typography>
              <Login />
            </>
          ) : (
            <>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
                Create Account
              </Typography>
              <Signup />
            </>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Auth;
