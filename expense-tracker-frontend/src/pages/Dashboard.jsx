import { Box, Paper, Typography,Grid } from "@mui/material";
import ExpenseSummary from "./ExpenseSummary";
import PieChartWrapper from "./PieChartWrapper";
import BarChartWrapper from "./BarChartWrapper";

const Dashboard = () => {


  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        mt: 3,
        
      }}
    >
      <Paper
        elevation={2}
        sx={{
          boxShadow: {
            xs: "none",
            md: "0px 4px 10px rgba(0,0,0,0.12)",
          },
          borderRadius: 6,
          background: "#ffffff",
          width: "100%",
          py: {xs:2,sm:2,md:4},
          px: {xs:2,sm:2,md:4},
        }}
      >
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            Dashboard
          </Typography>

          <Typography sx={{ color: "#777", mt: 1 }}>
            Welcome back, here’s your financial overview.
          </Typography>
        </Box>

        {/* Divider */}
        <Box sx={{ height: "1px", background: "#e0e0e0", my: 4 }} />

        <ExpenseSummary />

        {/* Divider */}
        <Box sx={{ height: "2px", background: "#e0e0e0", my: 4 }} />
        
        <PieChartWrapper/>

         {/* Divider */}
        <Box sx={{ height: "2px", background: "#e0e0e0", my: 4 }} />

        <BarChartWrapper/>

      </Paper>
    </Box>
  );
};

export default Dashboard;
