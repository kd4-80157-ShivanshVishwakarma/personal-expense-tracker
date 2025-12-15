import React, { useState } from "react";
import {
  Box,
  Paper,
  Button,
  Typography 
} from "@mui/material";
import { EarningsForm, ExpenseForm } from "./TransactionForm";
import RecenTransaction from "./RecenTransaction";

const TransactionPage = () => {
  const [tab, setTab] = useState(0);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        mt: 3,
        mb: 5,
      }}
    >
      <Paper
        elevation={2}
        sx={{
          boxShadow: {
            xs: "none",
            md: "0px 4px 10px rgba(0,0,0,0.12)",
          },
          borderRadius: { xs: 4, md: 6 },
          background: "#ffffff",
          border: { xs: "none", md: "1px solid #e6e6e6" },
          width: { xs: "94%", sm: "85%", md: "70%", lg: "50%" },
          py: { xs: 3, md: 5 }, // Increased top padding slightly for the header
          px: { xs: 2, md: 4 },
          mt: { xs: 5, md: 0 },
        }}
      >
        {/* --- NEW HEADER SECTION --- */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 700, 
              color: "#333",
              fontSize: { xs: "1.5rem", md: "2rem" } 
            }}
          >
            Manage Transactions
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: "text.secondary", 
              mt: 1,
              fontWeight: 500
            }}
          >
            Track your financial activity effectively
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: { xs: 0, sm: 0, md: 2 },
            mb: 4,
            flexWrap: "wrap",
          }}
        >
          <Button
            variant={tab === 0 ? "contained" : "outlined"}
            onClick={() => setTab(0)}
            fullWidth={false}
            sx={{
              borderRadius: 5,
              px: { xs: 3, md: 4 },
              py: 1,
              textTransform: "none",
              fontWeight: 600,
              fontSize: { xs: "0.9rem", md: "1rem" },
              boxShadow:
                tab === 0 ? "0px 4px 10px rgba(255, 111, 111, 0.4)" : "none",
              backgroundColor: tab === 0 ? "#FF6F6F" : "transparent",
              borderColor: "#FF6F6F",
              color: tab === 0 ? "#fff" : "#FF6F6F",
              width: { xs: "40%", sm: "auto" },
              "&:hover": {
                backgroundColor:
                  tab === 0 ? "#d95f5f" : "rgba(255, 111, 111, 0.1)",
                borderColor: "#d95f5f",
              },
            }}
          >
            Add Expense
          </Button>

          <Button
            variant={tab === 1 ? "contained" : "outlined"}
            onClick={() => setTab(1)}
            sx={{
              borderRadius: 5,
              px: { xs: 3, md: 4 },
              py: 1,
              ml: { xs: 2, sm: 2 },
              textTransform: "none",
              fontWeight: 600,
              fontSize: { xs: "0.9rem", md: "1rem" },
              boxShadow:
                tab === 1 ? "0px 4px 10px rgba(0, 168, 132, 0.4)" : "none",
              backgroundColor: tab === 1 ? "#00A884" : "transparent",
              borderColor: "#00A884",
              color: tab === 1 ? "#fff" : "#00A884",
              width: { xs: "40%", sm: "auto" },
              "&:hover": {
                backgroundColor:
                  tab === 1 ? "#008a6c" : "rgba(0, 168, 132, 0.1)",
                borderColor: "#008a6c",
              },
            }}
          >
            Add Earnings
          </Button>
        </Box>

        {/* Form Box */}
        <Box
          elevation={3}
          sx={{
            px: { xs: 9, sm: 9, md: 9, lg: 12 },
            borderRadius: 3,
          }}
        >
          {tab === 0 ? <ExpenseForm /> : <EarningsForm />}
        </Box>

        <Box sx={{ height: "1px", background: "#e0e0e0", my: 4 }} />

        {/* Recent Transactions */}
        <Box>
          <RecenTransaction />
        </Box>
      </Paper>
    </Box>
  );
};

export default TransactionPage;