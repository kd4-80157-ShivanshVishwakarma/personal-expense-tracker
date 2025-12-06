import { Box, Paper, Typography } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = [
  "#00A884", // Green
  "#FF6F6F", // Red
  "#FFC107", // Yellow
  "#4C6EF5", // Blue
  "#A66BFF", // Purple
  "#FF8E72",
  "#b8cc8cff", // Orange
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <Paper
      elevation={4}
      sx={{
        px: 2,
        py: 1,
        borderRadius: 2,
        background: "#fff",
      }}
    >
      <Typography sx={{ fontWeight: 600, fontSize: "14px" }}>
        {payload[0].name}
      </Typography>

      <Typography sx={{ fontSize: "13px", color: "#555" }}>
        {payload[0].value}%  
      </Typography>
    </Paper>
  );
};


const PieChartCard = ({ title,description, data }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        borderRadius: 5,
        width: "100%",
        minHeight: 350,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
        {title}
      </Typography>
      {/* <Typography variant="body2" sx={{width:'100%',maxWidth: "20%",}}>
        {description}
      </Typography> */}


      <PieChart width={510} height={325}>
        <Pie
          dataKey="value"
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={95}
          label={(entry) => `${entry.value}%`}
          stroke="none"              
          animationDuration={700}
          
        >
          {data.map((entry, index) => (
            <Cell
              key={index}
              fill={COLORS[index % COLORS.length]}
              style={{ filter: "drop-shadow(0px 2px 5px rgba(0,0,0,0.1))" }}
            />
          ))}
        </Pie>

        <Tooltip content={<CustomTooltip />} />
        <Legend 
        layout="vertical" 
        verticalAlign="middle" 
        align="right"
        wrapperStyle={{ paddingLeft: "20px" }}/>
      </PieChart>
    </Paper>
  );
};

export default PieChartCard;
