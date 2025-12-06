import { Box, Typography, Grid, Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Box
      sx={{
        background: "#f2eeeeff",
        mt: 8,
        py: 6,
        px: 6,
        borderTop: "1px solid #e5e5e5",
      }}
    >
      <Grid container spacing={4}>
        
        {/* Brand */}
        <Grid item xs={12} md={4}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Expense<span style={{ color: "#00A884" }}>Tracker</span>
          </Typography>
          <Typography sx={{ color: "#666", mt: 1 }}>
            Take control of your financial life with smart tracking, analytics, 
            and budgeting tools.
          </Typography>
        </Grid>

        {/* Quick Links */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
            Quick Links
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <MuiLink component={Link} to="/features" underline="hover" color="inherit">
              Features
            </MuiLink>

            <MuiLink component={Link} to="/pricing" underline="hover" color="inherit">
              Pricing
            </MuiLink>

            <MuiLink component={Link} to="/about" underline="hover" color="inherit">
              About
            </MuiLink>

            <MuiLink component={Link} to="/contact" underline="hover" color="inherit">
              Contact
            </MuiLink>
          </Box>
        </Grid>

        {/* Footer Contact */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
            Stay Updated
          </Typography>
          <Typography sx={{ color: "#666" }}>
            New features, updates & budgeting tips — straight to your inbox.
          </Typography>
        </Grid>

      </Grid>

      {/* Bottom Bar */}
      <Box sx={{ textAlign: "center", mt: 4, pt: 3, borderTop: "1px solid #ddd" }}>
        <Typography sx={{ color: "#777" }}>
          © {new Date().getFullYear()} ExpenseTracker — All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
