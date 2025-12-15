import { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  ToggleButtonGroup,
  ToggleButton,
  Container,
  Avatar,
} from "@mui/material";
import { TrendingUp, TrendingDown, AccountBalanceWallet } from "@mui/icons-material";
import { Formik } from "formik";
import * as Yup from "yup";
import expenseSummary from "../api/DashboardApi";

const summarySchema = Yup.object({
  monthlySummary: Yup.object({ 
    monthlyIncome: Yup.number().required(),
    monthlyExpense: Yup.number().required(),
    monthlyBalance: Yup.number().required(),
  }),
  lifetimeSummary: Yup.object({
    totalIncome: Yup.number().required(),
    totalExpense: Yup.number().required(),
    totalBalance: Yup.number().required(),
  }),
});

const ExpenseSummary = () => {
  const [mode, setMode] = useState("monthly");
  const [loading, setLoading] = useState(true);
  const [initialValues, setInitialValues] = useState({
    monthlySummary: {
      monthlyIncome: 0,
      monthlyExpense: 0,
      monthlyBalance: 0,
    },
    lifetimeSummary: {
      totalIncome: 0,
      totalExpense: 0,
      totalBalance: 0,
    },
  });

  const handleModeChange = (_, value) => {
    if (value) setMode(value);
  };

  // Fetch API Data
  const getDashboardSummary = async () => {
    try {
      setLoading(true);
      const response = await expenseSummary();
      if (response.data.success) {
         summarySchema.validate(response.data.data); // validate using Yup
         setInitialValues(response.data.data); // store in formik
      }
    } catch (err) {
      console.error("ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboardSummary();
  }, []);

  if (loading) {
    return (
      <Typography sx={{ textAlign: "center", py: 4, fontSize: 18 }}>
        Loading dashboard...
      </Typography>
    );
  }

  return (
    <Formik initialValues={initialValues} enableReinitialize>
      {({ values }) => (
        <Box sx={{ width: "100%" }}>
          <Container maxWidth="xl">
            

            {/* TITLE */}
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
              {mode === "monthly" ? "Monthly Snapshot" : "Lifetime Summary"}
            </Typography>

            <Typography sx={{ mb: 3, color: "#666" }}>
              {mode === "monthly"
                ? "Overview for this month"
                : "All-time financial accumulation"}
            </Typography>

            {/* TOGGLE BUTTON */}
            <ToggleButtonGroup
              size="small"
              value={mode}
              exclusive
              onChange={handleModeChange}
              sx={{
                mt:2,mb:8,
                background: "#fff",
                borderRadius:5,
                border:'none',
                boxShadow: "0 4px 4px rgba(0,0,0,0.05)",
              }}
            >
              <ToggleButton
              size="small"
                value="monthly"
                sx={{
                  px: 5,
                  borderRadius: 5,
                  py: 1.5,
                  fontWeight: 600,
                  "&.Mui-selected": { background: "#00A884", color: "#fff" },
                }}
              >
                Monthly Summary
              </ToggleButton>

              <ToggleButton
              size="small"
                value="lifetime"
                sx={{
                  px: 5,
                  borderRadius: 5,
                  py: 1.5,
                  fontWeight: 600,
                  "&.Mui-selected": { background: "#00A884", color: "#fff" },
                }}
              >
                Lifetime Summary
              </ToggleButton>
            </ToggleButtonGroup>

            {/* GRID CARDS */}
            <Grid container spacing={{xs:5,md:5,lg:10}}>
              
              {/* INCOME CARD */}
              <Grid item xs={12} sm={6} md={4}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    borderRadius: 5,
                    minHeight: "8rem",
                    width: "18.5rem",
                  }}
                >
                  <Box sx={{ display: "flex", gap: 3 }}>
                    <Avatar 
                      sx={{ 
                        width: 55, 
                        height: 55, 
                        bgcolor: "#e9ffe9", // Light Green Background
                        color: "#2e7d32"    // Dark Green Icon
                      }}
                    >
                      <TrendingUp sx={{ fontSize: 32 }} />
                    </Avatar>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        {mode === "monthly"
                          ? "This Month's Income"
                          : "Total Lifetime Income"}
                      </Typography>

                      <Typography variant="h5" sx={{ fontWeight: 800, mt: 1 }}>
                        ₹
                        {mode === "monthly"
                          ? values.monthlySummary.monthlyIncome
                          : values.lifetimeSummary.totalIncome}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>

              {/* EXPENSE CARD */}
              <Grid item xs={12} sm={6} md={4}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    borderRadius: 5,
                    minHeight: "8rem",
                    width: "18.5rem",
                  }}
                >
                  <Box sx={{ display: "flex", gap: 3 }}>
                    <Avatar 
                      sx={{ 
                        width: 55, 
                        height: 55, 
                        bgcolor: "#ffecec", // Light Red Background
                        color: "#d32f2f"    // Dark Red Icon
                      }}>
                      <TrendingDown sx={{ fontSize: 32 }} />
                    </Avatar>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        {mode === "monthly"
                          ? "This Month's Expense"
                          : "Total Lifetime Spend"}
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 800, mt: 1 }}>
                        ₹
                        {mode === "monthly"
                          ? values.monthlySummary.monthlyExpense
                          : values.lifetimeSummary.totalExpense}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>

              {/* BALANCE CARD */}
              <Grid item xs={12} sm={6} md={4}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    borderRadius: 5,
                    minHeight: "8rem",
                    width: "18.5rem",
                  }}
                >
                  <Box sx={{ display: "flex", gap: 3.5 }}>
                    <Avatar 
                      sx={{ 
                        width: 55, 
                        height: 55, 
                        bgcolor: values.monthlySummary.monthlyBalance < 0 ? "#ffecec" : "#e8f3ff", 
                        color: values.monthlySummary.monthlyBalance < 0 ? "#d32f2f" : "#1976d2"
                      }}
                    >
                      <AccountBalanceWallet sx={{ fontSize: 32 }} />
                    </Avatar>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        {mode === "monthly"
                          ? "Monthly Balance"
                          : "Total Lifetime Balance"}
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 800, mt: 1 }}>
                        ₹
                        {mode === "monthly"
                          ? values.monthlySummary.monthlyBalance
                          : values.lifetimeSummary.totalBalance}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>

            </Grid>
          </Container>
        </Box>
      )}
    </Formik>
  );
};

export default ExpenseSummary;
