// import React, { useEffect, useState } from 'react';
// import { 
//   Dashboard, 
//   Person, 
//   ReceiptLong, 
//   Menu as MenuIcon, 
//   Close as CloseIcon , Logout as LogoutIcon
// } from "@mui/icons-material";
// import { 
//   Box, 
//   Typography, 
//   Button, 
//   AppBar, 
//   Toolbar, 
//   Stack, 
//   IconButton, 
//   Drawer, 
//   List, 
//   Divider, 
//   Avatar
// } from "@mui/material";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const Navbar = () => {
//   const location = useLocation();
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [name, setName] = useState(null);
//   const navigate = useNavigate();

//   const navItems = [
//     { label: 'Dashboard', path: '/dashboard', icon: <Dashboard /> },
//     { label: 'Transaction', path: '/transaction', icon: <ReceiptLong /> },
//     { label: 'Budget', path: '/budget', icon: <ReceiptLong /> },
//     { label: 'Profile', path: '/profile', icon: <Person /> },
//   ];

//     useEffect(()=>{
//     const name = sessionStorage.getItem("name");
//     setName(name);
//   },[location]);

//   const handleNavigation = (path) => {
//     if (path === '/') {
//         navigate(path);
//         return;
//     }

//     const isAuth = sessionStorage.getItem('name');
    
//     if (isAuth) {
//         navigate(path); // Logged in? Go ahead.
//     } else {
//         toast.error("Please Login to access " + path.replace('/', '').toUpperCase()); 
//         navigate('/login'); 
//     }
//   };

//   const handleLogout = () => {
//     navigate('/');

//     sessionStorage.clear();
//     toast.success("Logged out successfully");
//     setName(null);
//   };

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   // --- Mobile Drawer Content ---
// const drawer = (
//     <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
//       {/* 1. Header Logo */}
//       <Box sx={{ py: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
//          <Typography variant="h6" sx={{ fontWeight: 700 }}>
//             Expense<span style={{ color: "#00A884" }}>Tracker</span>
//           </Typography>
//       </Box>
//       <Divider />

//       {/* 2. Navigation List */}
//       <List>
//         {navItems.map((item) => {
//            const isActive = location.pathname === item.path;
//            return (
//             <Button
//                     key={item.label}
//                     // 2. REMOVED: component={Link} and to={...}
//                     // 3. ADDED: onClick handler
//                     onClick={() => handleNavigation(item.path)}
                    
//                     startIcon={item.icon}
//                     variant={isActive ? "contained" : "text"}
//                     color={isActive ? "primary" : "inherit"}
//                     sx={{
//                       textTransform: 'none',
//                       fontWeight: isActive ? 700 : 500,
//                       borderRadius: 2,
//                       px: 2,
//                       color: isActive ? '#fff' : 'text.primary',
//                       '&:hover': {
//                         backgroundColor: isActive ? 'primary.dark' : 'rgba(0, 0, 0, 0.05)',
//                       },
//                     }}
//                   >
//                     {item.label}
//                   </Button>
//           );
//         })}
//       </List>

//       <Divider sx={{ my: 2 }} />

//       {/* 3. Auth Section (Dynamic) */}
//       <Box sx={{ px: 2, pb: 2 }}>
//         {name ? (
//           // === LOGGED IN STATE ===
//           <Stack spacing={2}>
//             {/* User Profile Info */}
//             <Box 
//                 sx={{ 
//                     display: 'flex', 
//                     alignItems: 'center', 
//                     gap: 2, 
//                     p: 1.5, 
//                     bgcolor: 'grey.100', 
//                     borderRadius: 2 
//                 }}
//             >
//                 <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32, fontSize: '0.9rem' }}>
//                     {name.charAt(0).toUpperCase()}
//                 </Avatar>
//                 <Box sx={{ textAlign: 'left' }}>
//                     <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
//                         {name}
//                     </Typography>
//                     <Typography variant="caption" color="text.secondary">
//                         Welcome back!
//                     </Typography>
//                 </Box>
//             </Box>

//             {/* Logout Button */}
//             <Button 
//                 fullWidth 
//                 variant="outlined" 
//                 color="error" 
//                 startIcon={<LogoutIcon />}
//                 onClick={handleLogout}
//             >
//                 Logout
//             </Button>
//           </Stack>
//         ) : (
//           // === LOGGED OUT STATE ===
//           <Stack spacing={2}>
//             <Button fullWidth variant="outlined" color="success" component={Link} to="/login">
//                 Login
//             </Button>
//             <Button fullWidth variant="contained" color="success" component={Link} to="/signup">
//                 Signup
//             </Button>
//           </Stack>
//         )}
//       </Box>
//     </Box>
//   );

//   return (
//     <Box sx={{ background: "#ffffff", width: "100%" }}>
//       <AppBar position="static" color="transparent" elevation={0}>
//         <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          
//           {/* 1. LOGO */}
//           <Typography variant="h5"
//             component={Link}
//             to="/"
//             sx={{ fontWeight: 700,textDecoration:'none' }}>
//             Expense<span style={{ color: "#00A884" }}>Tracker</span>
//           </Typography>

//           {/* 2. DESKTOP MENU (Hidden on Mobile) */}
//           <Stack 
//             direction="row" 
//             spacing={1} 
//             sx={{ display: { xs: 'none', md: 'flex' } }}
//           >
//             {navItems.map((item) => {
//               const isActive = location.pathname === item.path;
//               return (
//                 <Button
//                   key={item.label}
//                   component={Link}
//                   to={item.path}
//                   startIcon={item.icon}
//                   variant={isActive ? "contained" : "text"}
//                   color={isActive ? "success" : "inherit"}
//                   sx={{
//                     textTransform: 'none',
//                     fontWeight: isActive ? 700 : 500,
//                     borderRadius: 2,
//                     px: 2,
//                     color: isActive ? '#fff' : 'text.primary',
//                     '&:hover': {
//                       backgroundColor: isActive ? 'success.dark' : 'rgba(0, 0, 0, 0.05)',
//                     },
//                   }}
//                 >
//                   {item.label}
//                 </Button>
//               );
//             })}
//           </Stack>

//           {/* 3. DESKTOP AUTH BUTTONS (Hidden on Mobile) */}
//           <Box>
//             {name ? (
//               // ============ VIEW IF LOGGED IN ============
//               <Stack direction="row" spacing={2} alignItems="center">
                
//                 {/* Greeting with Avatar */}
//                 <Stack direction="row" spacing={1} alignItems="center">
//                     <Avatar 
//                         sx={{ width: 32, height: 32, bgcolor: 'primary.main', fontSize: '0.9rem' }}
//                     >
//                         {name.charAt(0).toUpperCase()}
//                     </Avatar>
//                     <Typography 
//                         variant="subtitle1" 
//                         sx={{ fontWeight: 600, display: { xs: 'none', sm: 'block' } }}
//                     >
//                         Hi, {name}
//                     </Typography>
//                 </Stack>

//                 {/* Logout Button */}
//                 <Button 
//                   variant="outlined" 
//                   color="error" 
//                   size="small"
//                   startIcon={<LogoutIcon />}
//                   onClick={handleLogout}
//                   sx={{ borderRadius: 2, textTransform: 'none' }}
//                 >
//                   Logout
//                 </Button>
//               </Stack>
//             ) : (
//               // ============ VIEW IF LOGGED OUT ============
//               <Stack direction="row" spacing={2}>
//                 <Button 
//                     component={Link} 
//                     to="/login" 
//                     variant="outlined" 
//                     sx={{ color: 'text.primary', fontWeight: 600, borderRadius: 5,px:3 }}
//                 >
//                   Login
//                 </Button>
//                 <Button 
//                     component={Link} 
//                     to="/signup" 
//                     variant="contained" 
//                     color="success"
//                     sx={{ borderRadius: 5, px: 3 }}
//                 >
//                   Signup
//                 </Button>
//               </Stack>
//             )}
//           </Box>

//           {/* 4. MOBILE HAMBURGER ICON (Visible on Mobile Only) */}
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             edge="start"
//             onClick={handleDrawerToggle}
//             sx={{ display: { md: 'none' } }} // Show on xs/sm, Hide on md+
//           >
//             <MenuIcon />
//           </IconButton>
//         </Toolbar>
//       </AppBar>

//       {/* 5. MOBILE DRAWER COMPONENT */}
//       <Drawer
//         variant="temporary"
//         anchor="left" // Opens from the right side
//         open={mobileOpen}
//         onClose={handleDrawerToggle}
//         ModalProps={{
//           keepMounted: true, // Better open performance on mobile.
//         }}
//         sx={{
//           display: { xs: 'block', md: 'none' },
//           '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
//         }}
//       >
//         {drawer}
//       </Drawer>
//     </Box>
//   );
// }

// export default Navbar;

import React, { useEffect, useState } from 'react';
import { 
  Dashboard, 
  Person, 
  ReceiptLong, 
  Menu as MenuIcon, 
  Close as CloseIcon, 
  Logout as LogoutIcon
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
  Divider, 
  Avatar
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [name, setName] = useState(null);

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: <Dashboard /> },
    { label: 'Transaction', path: '/transaction', icon: <ReceiptLong /> },
    { label: 'Budget', path: '/budget', icon: <ReceiptLong /> },
    { label: 'Profile', path: '/profile', icon: <Person /> },
  ];

  useEffect(() => {
    // Ensure this key matches your login logic ('name' vs 'userName')
    const storedName = sessionStorage.getItem("name");
    setName(storedName);
  }, [location]);

  const handleNavigation = (path) => {
    // 1. Always close mobile drawer after clicking
    setMobileOpen(false);

    if (path === '/') {
        navigate(path);
        return;
    }

    const isAuth = sessionStorage.getItem('name');
    
    if (isAuth) {
        navigate(path); 
    } else {
        // Prevent duplicate toasts by dismissing previous ones
        toast.dismiss();
        toast.error("Please Login to access " + path.replace('/', '').toUpperCase()); 
        navigate('/login'); 
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
    setName(null);
    toast.success("Logged out successfully");
    navigate('/');
    setMobileOpen(false); // Close drawer
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // --- Mobile Drawer Content ---
  const drawer = (
    <Box sx={{ textAlign: 'center' }}>
      {/* 1. Header Logo & Close Button */}
      <Box sx={{ py: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2 }}>
         <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Expense<span style={{ color: "#00A884" }}>Tracker</span>
          </Typography>
          <IconButton onClick={handleDrawerToggle}>
            <CloseIcon />
          </IconButton>
      </Box>
      <Divider />

      {/* 2. Navigation List */}
      <List>
        {navItems.map((item) => {
           const isActive = location.pathname === item.path;
           return (
            <ListItem key={item.label} disablePadding>
              <ListItemButton 
                onClick={() => handleNavigation(item.path)}
                sx={{ 
                  textAlign: 'left',
                  // Mobile Active State Styling
                  color: isActive ? "#00A884" : 'inherit',
                  bgcolor: isActive ? "rgba(0, 168, 132, 0.08)" : 'transparent',
                  borderRight: isActive ? '4px solid #00A884' : 'none'
                }}
              >
                <ListItemIcon sx={{ color: isActive ? "#00A884" : 'inherit', minWidth: 40 }}>
                    {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider sx={{ my: 2 }} />

      {/* 3. Auth Section (Dynamic) */}
      <Box sx={{ px: 2, pb: 2 }}>
        {name ? (
          // === LOGGED IN STATE ===
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 1.5, bgcolor: 'grey.100', borderRadius: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32, fontSize: '0.9rem' }}>
                    {name.charAt(0).toUpperCase()}
                </Avatar>
                <Box sx={{ textAlign: 'left' }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{name}</Typography>
                    <Typography variant="caption" color="text.secondary">Welcome back!</Typography>
                </Box>
            </Box>
            <Button fullWidth variant="outlined" color="error" startIcon={<LogoutIcon />} onClick={handleLogout}>
                Logout
            </Button>
          </Stack>
        ) : (
          // === LOGGED OUT STATE ===
          <Stack spacing={2}>
            <Button fullWidth variant="outlined" color="success" component={Link} to="/login" onClick={() => setMobileOpen(false)}>
                Login
            </Button>
            <Button fullWidth variant="contained" color="success" component={Link} to="/signup" onClick={() => setMobileOpen(false)}>
                Signup
            </Button>
          </Stack>
        )}
      </Box>
    </Box>
  );

  return (
    <Box sx={{ background: "#ffffff", width: "100%" }}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          
          {/* 1. LOGO */}
          <Typography variant="h5" component={Link} to="/" sx={{ fontWeight: 700, textDecoration:'none', color: 'inherit' }}>
            Expense<span style={{ color: "#00A884" }}>Tracker</span>
          </Typography>

          {/* 2. DESKTOP MENU */}
          <Stack direction="row" spacing={1} sx={{ display: { xs: 'none', md: 'flex' } }}>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Button
                  key={item.label}
                  onClick={() => handleNavigation(item.path)}
                  startIcon={item.icon}
                  variant={isActive ? "contained" : "text"}
                  color={isActive ? "success" : "inherit"}
                  sx={{
                    textTransform: 'none', fontWeight: isActive ? 700 : 500, borderRadius: 2, px: 2,
                    color: isActive ? '#fff' : 'text.primary',
                    '&:hover': { backgroundColor: isActive ? 'success.dark' : 'rgba(0, 0, 0, 0.05)' },
                  }}
                >
                  {item.label}
                </Button>
              );
            })}
          </Stack>

          {/* 3. DESKTOP AUTH BUTTONS */}
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            {name ? (
              <Stack direction="row" spacing={2} alignItems="center">
                <Stack direction="row" spacing={1} alignItems="center">
                    <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main', fontSize: '0.9rem' }}>
                        {name.charAt(0).toUpperCase()}
                    </Avatar>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Hi, {name}</Typography>
                </Stack>
                <Button variant="outlined" color="error" size="small" startIcon={<LogoutIcon />} onClick={handleLogout} sx={{ borderRadius: 2, textTransform: 'none' }}>
                  Logout
                </Button>
              </Stack>
            ) : (
              <Stack direction="row" spacing={2}>
                <Button component={Link} to="/login" variant="outlined" sx={{ color: 'text.primary', fontWeight: 600, borderRadius: 5, px:3 }}>Login</Button>
                <Button component={Link} to="/signup" variant="contained" color="success" sx={{ borderRadius: 5, px: 3 }}>Signup</Button>
              </Stack>
            )}
          </Box>

          {/* 4. MOBILE HAMBURGER ICON */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* 5. MOBILE DRAWER COMPONENT */}
      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280 }, // Increased width for better touch targets
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

export default Navbar;