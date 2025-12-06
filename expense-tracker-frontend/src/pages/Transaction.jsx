import React, { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Paper,Button
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
      }}
    >
      <Paper
        elevation={2}
        sx={{
          borderRadius: 6,
          background: "#ffffff",
          border: "1px solid #e6e6e6",
          width: "45%",
          py: 4,
          px: 5,
        }}
      >

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4 }}>

        <Button
          variant={tab === 0 ? "contained" : "outlined"}
          onClick={() => setTab(0)}
          sx={{
            borderRadius: 5,
            px: 4,
            py: 1,
            textTransform: "none",
            fontWeight: 600,
            fontSize: "1rem",
            boxShadow: tab === 0 ? "0px 4px 10px rgba(255, 111, 111, 0.4)" : "none",
            backgroundColor: tab === 0 ? "#FF6F6F" : "transparent",
            borderColor: "#FF6F6F",
            color: tab === 0 ? "#fff" : "#FF6F6F",
            '&:hover': {
              backgroundColor: tab === 0 ? "#d95f5f" : "rgba(255, 111, 111, 0.1)",
              borderColor: "#d95f5f",
            }
          }}>
          Add Expense
        </Button>

        <Button
          variant={tab === 1 ? "contained" : "outlined"}
          onClick={() => setTab(1)}
          sx={{
            borderRadius: 5,
            px: 4,
            py: 1,
            textTransform: "none",
            fontWeight: 600,
            fontSize: "1rem",
            boxShadow: tab === 1 ? "0px 4px 10px rgba(0, 168, 132, 0.4)" : "none",
            backgroundColor: tab === 1 ? "#00A884" : "transparent",
            borderColor: "#00A884",
            color: tab === 1 ? "#fff" : "#00A884",
            '&:hover': {
              backgroundColor: tab === 1 ? "#008a6c" : "rgba(0, 168, 132, 0.1)",
              borderColor: "#008a6c",
            }
          }}
        >
          Add Earnings
        </Button>
      </Box>

      {/* Form Box */}
      <Box elevation={3} sx={{ px:6, borderRadius: 3 }}>
        {tab === 0 ? <ExpenseForm /> : <EarningsForm />}
      </Box>
      <Box sx={{ height: "1px", background: "#e0e0e0", my: 4 }} />

      <Box >
          <RecenTransaction/>
      </Box>
      </Paper>
      </Box>
  );
};

export default TransactionPage;
