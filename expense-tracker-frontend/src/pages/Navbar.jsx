// import { Dashboard, Person, ReceiptLong } from "@mui/icons-material";
// import { Box, Typography, Button, AppBar, Toolbar, Stack } from "@mui/material";
// import { Link, useLocation } from "react-router-dom";

// const Navbar = ()=>{

//   const location = useLocation();

//   const navItems = [
//     { label: 'Dashboard', path: '/dashboard', icon: <Dashboard /> },
//     { label: 'Transaction', path: '/transaction', icon: <ReceiptLong/> },
//     { label: 'Budget', path: '/budget', icon: <ReceiptLong /> },
//     { label: 'Profile', path: '/profile', icon: <Person /> },
//   ];
//     return (
//         <Box sx={{background: "#ffffff",width:"100%"}}>
//         {/* NAVBAR */}
//       <AppBar position="static" color="transparent" elevation={0}>
//         <Toolbar sx={{ display: "flex", justifyContent: "space-between"}}>
//           <Typography variant="h5" sx={{ fontWeight: 700 }} >
//             Expense<span style={{ color: "#00A884" }}>Tracker</span>
//           </Typography>

//           <Stack direction="row" spacing={1}>
//               {navItems.map((item) => {
//                 const isActive = location.pathname === item.path;

//                 return (
//                   <Button
//                     key={item.label}
//                     component={Link}
//                     to={item.path}
//                     startIcon={item.icon}
//                     variant={isActive ? "contained" : "text"}
//                     color={isActive ? "success" : "inherit"}
//                     sx={{
//                       textTransform: 'none',
//                       fontWeight: isActive ? 700 : 500,
//                       borderRadius: 2,
//                       px: 2,
//                       color: isActive ? '#fff' : 'text.primary', // Adjust color based on your Navbar background
//                       '&:hover': {
//                         backgroundColor: isActive ? 'success.dark' : 'rgba(0, 0, 0, 0.05)',
//                       },
//                     }}
//                   >
//                     {item.label}
//                   </Button>
//                 );
//               })}
//             </Stack>

//           <Box sx={{ display: "flex", gap: 2 }}>
//             <Button variant="outlined" color="success" component={Link} to="/login">Login</Button>
//             <Button variant="contained" color="success" component={Link} to="/signup">Signup</Button>
//           </Box>
//         </Toolbar>
//       </AppBar>
//       </Box> 

//     )
// }
// export default Navbar;


import React, { useState } from 'react';
import { 
  Dashboard, 
  Person, 
  ReceiptLong, 
  Menu as MenuIcon, 
  Close as CloseIcon 
} from "@mui/icons-material";
import { 
  Box, 
  Typography, 
  Button, 
  AppBar, 
  Toolbar, 
  Stack, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Divider 
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: <Dashboard /> },
    { label: 'Transaction', path: '/transaction', icon: <ReceiptLong /> },
    { label: 'Budget', path: '/budget', icon: <ReceiptLong /> },
    { label: 'Profile', path: '/profile', icon: <Person /> },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // --- Mobile Drawer Content ---
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Box sx={{ py: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
         <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Expense<span style={{ color: "#00A884" }}>Tracker</span>
          </Typography>
      </Box>
      <Divider />
      <List>
        {navItems.map((item) => {
           const isActive = location.pathname === item.path;
           return (
            <ListItem key={item.label} disablePadding>
              <ListItemButton 
                component={Link} 
                to={item.path}
                sx={{ 
                  textAlign: 'left',
                  color: isActive ? "#00A884" : 'inherit',
                  bgcolor: isActive ? "rgba(0, 168, 132, 0.08)" : 'transparent'
                }}
              >
                <ListItemIcon sx={{ color: isActive ? "#00A884" : 'inherit' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
      <Divider sx={{ my: 2 }} />
      <Stack spacing={2} sx={{ px: 2, pb: 2 }}>
        <Button fullWidth variant="outlined" color="success" component={Link} to="/login">Login</Button>
        <Button fullWidth variant="contained" color="success" component={Link} to="/signup">Signup</Button>
      </Stack>
    </Box>
  );

  return (
    <Box sx={{ background: "#ffffff", width: "100%" }}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          
          {/* 1. LOGO */}
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Expense<span style={{ color: "#00A884" }}>Tracker</span>
          </Typography>

          {/* 2. DESKTOP MENU (Hidden on Mobile) */}
          <Stack 
            direction="row" 
            spacing={1} 
            sx={{ display: { xs: 'none', md: 'flex' } }} // Hide on xs/sm, Show on md+
          >
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Button
                  key={item.label}
                  component={Link}
                  to={item.path}
                  startIcon={item.icon}
                  variant={isActive ? "contained" : "text"}
                  color={isActive ? "success" : "inherit"}
                  sx={{
                    textTransform: 'none',
                    fontWeight: isActive ? 700 : 500,
                    borderRadius: 2,
                    px: 2,
                    color: isActive ? '#fff' : 'text.primary',
                    '&:hover': {
                      backgroundColor: isActive ? 'success.dark' : 'rgba(0, 0, 0, 0.05)',
                    },
                  }}
                >
                  {item.label}
                </Button>
              );
            })}
          </Stack>

          {/* 3. DESKTOP AUTH BUTTONS (Hidden on Mobile) */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            <Button variant="outlined" color="success" component={Link} to="/login">Login</Button>
            <Button variant="contained" color="success" component={Link} to="/signup">Signup</Button>
          </Box>

          {/* 4. MOBILE HAMBURGER ICON (Visible on Mobile Only) */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { md: 'none' } }} // Show on xs/sm, Hide on md+
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* 5. MOBILE DRAWER COMPONENT */}
      <Drawer
        variant="temporary"
        anchor="left" // Opens from the right side
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

export default Navbar;