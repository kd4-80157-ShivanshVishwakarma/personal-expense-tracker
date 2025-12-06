import { Box, Typography, Button, AppBar, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = ()=>{
    return (
        <Box sx={{background: "#ffffff",width:"100%"}}>
        {/* NAVBAR */}
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between"}}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Expense<span style={{ color: "#00A884" }}>Tracker</span>
          </Typography>

          <Box sx={{ display: "flex", gap: 3 }}>
            {/* <Typography variant="button">Features</Typography> */}
            <Typography variant="button">Feature</Typography>
            <Typography variant="button">About</Typography>
            <Typography variant="button">Pricing</Typography>
            <Typography variant="button">Contact</Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button variant="outlined" color="success" component={Link} to="/login">Login</Button>
            <Button variant="contained" color="success" component={Link} to="/signup">Signup</Button>
          </Box>
        </Toolbar>
      </AppBar>
      </Box> 

    )
}
export default Navbar;