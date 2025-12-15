import { Box, Typography, Button, Card,CardContent, Grid } from "@mui/material";
import { Link } from "react-router";


const Home =()=> {
  return (
    <Box sx={{ width: "100%", minHeight: "100vh", background: "#ffffff" }}>
      
      {/* HERO SECTION */}
      <Grid
        container
        spacing={2}
        sx={{
          px:  {xs:2,md:6},
          py: 10,
          alignItems: "center",
        }}
      >
        {/* LEFT CONTENT */}
        <Grid item xs={12} md={6}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: "2rem", md: "3.5rem" },
            }}
          >
            Manage Your Money <br /> Smarter & Effortlessly
          </Typography>

          <Typography variant="h6" sx={{ color: "#555", mb: 4 }}>
            Track expenses, analyze spending habits, set budgets, and take control
            of your financial life — all in one clean, simple dashboard.
          </Typography>

          <Button variant="contained" size="large" color="success" component={Link} to='/dashboard'>
            Start Tracking → 
          </Button>
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 9,
            padding: "20px",
          }}
        >
          {/* Heading */}
          <Box sx={{display:"flex",alignItems:"center",justifyContent:"center",py:"10px"}} >
              <Typography variant="h4" sx={{fontWeight:700}}>Features</Typography>
          </Box>

          {/* Feature 1 */}
          <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
            <Box
              sx={{
                width: {xs:'130px',md:45},
                height: {xs:'35px',md:45},
                borderRadius: "50%",
                background: "#00A884",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: 700,
                fontSize: "20px",
              }}
            >
              ₹
            </Box>

            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Budget Alerts & Limits
              </Typography>
              <Typography sx={{ color: "#555" }}>
                Set monthly spending limits and receive alerts when nearing or crossing budget thresholds.
              </Typography>
            </Box>

            <Box
              sx={{
                width: {xs:'130px',md:45},
                height: {xs:'35px',md:45},
                borderRadius: "50%",
                background: "#FF6F69",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: 700,
                // fontSize: "12px",
              }}
            >
              📊
            </Box>

            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Category-wise Analytics
              </Typography>
              <Typography sx={{ color: "#555" }}>
                Know where you spend the most—food, travel, subscriptions, shopping, or essentials.
              </Typography>
            </Box>
          </Box>

          {/* Feature 2 */}
          {/* <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
            
          </Box> */}

          {/* Feature 3 */}
          <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
            <Box
              sx={{
                width: 45,
                height: 45,
                borderRadius: "50%",
                background: "#FFC857",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: 700,
                fontSize: "20px",
              }}
            >
              🔍
            </Box>

            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Smart Spending Insights
              </Typography>
              <Typography sx={{ color: "#555" }}>
                AI-powered insights help you cut unnecessary expenses and boost savings over time.
              </Typography>
            </Box>
          </Box>

        </Grid>
      </Grid>

      {/* IMPORTANCE CARDS SECTION */}
      <Box sx={{ px: 6, py: 10 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, textAlign: "center", mb: 6 }}
        >
          Why Personal Expense Tracking Matters?
        </Typography>

        <Grid container spacing={4}>
          {/* CARD 1 */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                p: 2,
                borderRadius: 4,
                boxShadow: "0px 6px 20px rgba(0,0,0,0.08)",
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  Understand Your Spending
                </Typography>
                <Typography sx={{ color: "#555" }}>
                  Identify where your money goes and monitor your daily, weekly,
                  and monthly spending patterns.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* CARD 2 */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                p: 2,
                borderRadius: 4,
                boxShadow: "0px 6px 20px rgba(0,0,0,0.08)",
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  Build Healthy Financial Habits
                </Typography>
                <Typography sx={{ color: "#555" }}>
                  Make informed financial decisions and stay consistent with your
                  budget goals.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* CARD 3 */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                p: 2,
                borderRadius: 4,
                boxShadow: "0px 6px 20px rgba(0,0,0,0.08)",
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  Save More, Stress Less
                </Typography>
                <Typography sx={{ color: "#555" }}>
                  Track your spending, cut unnecessary expenses, and achieve
                  financial stability faster.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Home;