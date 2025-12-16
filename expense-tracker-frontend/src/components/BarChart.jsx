// import { Paper, Typography, Box } from "@mui/material";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// // 1. Create a stylish Custom Tooltip
// const CustomTooltip = ({ active, payload, label }) => {
//   if (active && payload && payload.length) {
//     return (
//       <Paper
//         elevation={4}
//         sx={{
//           p: {xs:1,sm:1,lg:2},
//           backgroundColor: "#fff",
//           borderRadius: 2,
//           minWidth: 80,
//           border: "1px solid #e0e0e0" // Added subtle border for better contrast
//         }}
//       >
//         <Typography variant="subtitle2" sx={{ color: "#555", mb: 0.5 }}>
//           {label}
//         </Typography>
//         <Typography variant="h6" sx={{ color: "#6c84b5", fontWeight: "bold" }}>
//            ₹{payload[0].value.toLocaleString()}
//         </Typography>
//       </Paper>
//     );
//   }
//   return null;
// };

// const formatYAxis = (tickItem) => {
//   if (tickItem >= 1000) {
//     return `${tickItem / 1000}k`;
//   }
//   return tickItem;
// };

// const BarChartCard = ({ title, data }) => {
//   return (
//     <Paper
//       elevation={3}
//       sx={{
//         p: { xs: 1.5, md: 6 },
//         borderRadius: 5,
//         width: {xs:'100%',sm:'100%',md:"90%"}, 
//         display: "flex",
//         flexDirection: "column",
//         gap: 2,
//         alignItems: "center",
//       }}
//     >
//       <Typography
//         variant="h6"
//         sx={{ fontWeight: 700, textAlign: "center", mb: 1 }}
//       >
//         {title}
//       </Typography>

//       <Box sx={{ width: "100%", height: 400 }}>
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart
//             data={data}
//             margin={{ top: 20, right: 30, left: 0, bottom: 20 }} // Adjusted margins
//             barCategoryGap="20%"
//           >
//             <CartesianGrid strokeDasharray="3 3" stroke="#b49090ff" vertical={false} />
            
//             <XAxis 
//               dataKey="name" 
//               axisLine={true} 
//               tickLine={true} 
//               tick={{ fill: "#666", fontSize: 12 }} 
//               dy={10} 
//             />
            
//             <YAxis 
//               axisLine={true} 
//               tickLine={true} 
//               tickFormatter={formatYAxis} 
//               tick={{ fill: "#999", fontSize: 12 }} 
//             />

//             <Tooltip 
//               content={<CustomTooltip />} 
//               cursor={{ fill: "rgba(255, 253, 253, 0.05)" }} 
//             />
            
//             <Legend 
//                wrapperStyle={{ paddingTop: "20px" }}
//             />

//             <Bar 
//               name="Expenditure" 
//               dataKey="value" 
//               fill="#879cc6ff" 
//               radius={[8, 8, 0, 0]} 
//               // Responsive bar size: Max 50px, but shrinks if many items
//               maxBarSize={50} 
//               animationDuration={1500}
//             />
//           </BarChart>
//         </ResponsiveContainer>
//       </Box>
//     </Paper>
//   );
// };

// export default BarChartCard;


import React from "react";
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
          p: { xs: 1, sm: 1, lg: 2 },
          backgroundColor: "#fff",
          borderRadius: 2,
          minWidth: 80,
          border: "1px solid #e0e0e0",
        }}
      >
        <Typography variant="subtitle2" sx={{ color: "#555", mb: 0.5 }}>
          {label}
        </Typography>
        <Typography variant="h6" sx={{ color: "#6c84b5", fontWeight: "bold" }}>
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
  const hasData = data && data.length > 0;

  return (
    <Paper
      elevation={3}
      sx={{
        p: { xs: 0.5, md: 6 },
        borderRadius: 5,
        width: { xs: "100%", sm: "100%", md: "90%" },
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

      <Box sx={{ width: "100%", height: 380 }}>
        {hasData ? (
          // RENDER CHART IF DATA EXISTS
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
              barCategoryGap="20%"
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#b49090ff"
                vertical={false}
              />

              <XAxis
                dataKey="name"
                axisLine={true}
                tickLine={true}
                tick={{ fill: "#666", fontSize: 12 }}
                dy={10}
              />

              <YAxis
                axisLine={true}
                tickLine={true}
                tickFormatter={formatYAxis}
                tick={{ fill: "#999", fontSize: 12 }}
              />

              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: "rgba(255, 253, 253, 0.05)" }}
              />

              <Legend wrapperStyle={{ paddingTop: "20px" }} />

              <Bar
                name="Expenditure"
                dataKey="value"
                fill="#879cc6ff"
                radius={[8, 8, 0, 0]}
                maxBarSize={50}
                animationDuration={1500}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          // RENDER EMPTY STATE IF NO DATA
          <Box
            sx={{
              height: "100%",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              color: "#999",
              border: "2px dashed #e0e0e0", 
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" color="textSecondary">
              No Data Available
            </Typography>
            <Typography variant="body2" color="textSecondary">
              There are no records to display at this time.
            </Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default BarChartCard;