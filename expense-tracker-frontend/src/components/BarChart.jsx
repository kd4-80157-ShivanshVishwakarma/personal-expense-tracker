import { Paper, Typography, Box } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// 1. Create a stylish Custom Tooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Paper
        elevation={4}
        sx={{
          p: 2,
          backgroundColor: "#fff",
          borderRadius: 2,
          minWidth: 80,
          maxHeight:50
        }}
      >
        <Typography variant="subtitle2" sx={{ color: "#555", mb: 0.5 }}>
          {label}
        </Typography>
        <Typography variant="h6" sx={{ color: "#6c84b5", fontWeight: "bold" }}>
           {/* Formats number with commas (e.g., 22,910) */}
          ₹{payload[0].value.toLocaleString()}
        </Typography>
      </Paper>
    );
  }
  return null;
};

const formatYAxis = (tickItem) => {
  if (tickItem >= 1000) {
    return `${tickItem / 1000}k`;
  }
  return tickItem;
};

const BarChartCard = ({ title, data }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 5,
        width: "60%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "center",
      }}
    >
      <Typography
        variant="h6"
        sx={{ fontWeight: 700, textAlign: "center", mb: 1 }}
      >
        {title}
      </Typography>

      <Box sx={{ width: "100%", height: 400 }}>
        <ResponsiveContainer height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
            barCategoryGap="20%"
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" vertical={false} />
            
            <XAxis 
              dataKey="name" 
              axisLine={true} 
              tickLine={true} 
              tick={{ fill: "#666", fontSize: 12 }} 
              dy={10} // Push labels down slightly
            />
            
            <YAxis 
              axisLine={true} 
              tickLine={true} 
              tickFormatter={formatYAxis} 
              tick={{ fill: "#999", fontSize: 12 }} 
            />

            {/* Custom Tooltip applied here */}
            <Tooltip 
              content={<CustomTooltip />} 
              cursor={{ fill: "transparent" }} // Removes the grey hover block
            />
            
            <Legend 
               wrapperStyle={{ paddingTop: "20px" }}
            />

            <Bar 
              name="Expenditure" 
              dataKey="value" 
              fill="#879cc6ff" 
              radius={[8, 8, 0, 0]} 
              barSize={50} 
              animationDuration={1500}
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default BarChartCard;