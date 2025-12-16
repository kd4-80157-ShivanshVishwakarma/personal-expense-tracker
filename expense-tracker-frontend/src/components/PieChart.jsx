
// import { 
//   Box, 
//   Paper, 
//   Typography, 
//   useTheme, 
//   useMediaQuery,
//   IconButton, 
//   Tooltip as MuiTooltip 
// } from "@mui/material";
// import { InfoOutlined } from "@mui/icons-material"; 
// import { 
//   PieChart, 
//   Pie, 
//   Cell, 
//   Tooltip as RechartsTooltip, 
//   Legend, 
//   ResponsiveContainer 
// } from "recharts";

// const COLORS = [
//   "#00A884", "#FF6F6F", "#FFC107", "#4C6EF5", 
//   "#A66BFF", "#FF8E72", "#b8cc8cff"
// ];

// const CustomTooltip = ({ active, payload }) => {
//   if (!active || !payload || payload.length === 0) return null;
//   return (
//     <Paper
//       elevation={4}
//       sx={{ px: 2, py: 1, borderRadius: 2, background: "#fff", border: "1px solid #e0e0e0" }}
//     >
//       <Typography sx={{ fontWeight: 600, fontSize: "14px" }}>
//         {payload[0].name}
//       </Typography>
//       <Typography sx={{ fontSize: "13px", color: "#555" }}>
//         {payload[0].value}%
//       </Typography>
//     </Paper>
//   );
// };

// const PieChartCard = ({ title, data, padding, description }) => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));

//   const hasData = data && data.length > 0 && data.some(item => item.value > 0);

//   const chartData = hasData ? data : [{ name: "None", value: 1 }];
//   const chartColors = hasData ? COLORS : ["#e0e0e0"];

//   return (
//     <Paper
//       elevation={3}
//       sx={{
//         py: {xs:padding, md: 4 + (padding || 0) },
//         px: { xs:padding,md: 4 + (padding || 0) },
//         borderRadius: 5,
//         width: "100%",
//         minHeight: 300,
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         mt: { xs: 5, md: 5, lg: 0 },
//         position: "relative"
//       }}
//     >
//       <Box 
//         sx={{ 
//           display: 'flex', 
//           alignItems: 'center', 
//           justifyContent: 'center', 
//           mb: 0, 
//           gap: {xs:0,md:1} 
//         }}
//       >
        
//         <Typography variant="h6" sx={{ fontWeight: 700, textAlign: 'center' }}>
//           {title}
//           {description && (
//           <MuiTooltip 
//             title={description} 
//             arrow 
//             placement="top"
//             enterTouchDelay={0} 
//           >
//             <IconButton size="small" >
//               <InfoOutlined fontSize="small" sx={{ color: 'text.secondary', opacity: 0.7 }} />
//             </IconButton>
//           </MuiTooltip>
//         )}
//         </Typography>

        
//       </Box>

//       <Box sx={{ width: "100%", height: 380, minWidth: { md: '340px' }, position: "relative" }}>
        
//         {!hasData && (
//           <Box
//             sx={{
//               position: "absolute",
//               top: "50%",
//               left: "50%",
//               transform: "translate(-50%, -50%)",
//               textAlign: "center",
//               zIndex: 10,
//               pointerEvents: "none" 
//             }}
//           >
//             <Typography variant="body2" sx={{ fontWeight: 700, color: "#9e9e9e" }}>
//               No Data Available
//             </Typography>
//           </Box>
//         )}

//         <ResponsiveContainer width="100%" height="100%">
//           <PieChart>
//             <Pie
//               data={chartData}
//               dataKey="value"
//               cx="50%"
//               cy="50%"
//               outerRadius={isMobile ? 90 : 95}
//               innerRadius={hasData ? 0 : 70} 
              
//               label={hasData ? (entry) => `${entry.value}%` : false}
//               labelLine={hasData}
//               stroke="none"
//               isAnimationActive={hasData}
//             >
//               {chartData.map((entry, index) => (
//                 <Cell
//                   key={index}
//                   fill={chartColors[index % chartColors.length]}
//                   style={{ 
//                     filter: hasData ? "drop-shadow(0px 2px 5px rgba(0,0,0,0.1))" : "none",
//                     cursor: hasData ? "pointer" : "default"
//                   }}
//                 />
//               ))}
//             </Pie>

//             {hasData && <RechartsTooltip content={<CustomTooltip />} />}
            
//             {hasData && (
//               <Legend
//                 layout={isMobile ? "horizontal" : "vertical"}
//                 verticalAlign={isMobile ? "bottom" : "middle"}
//                 align={isMobile ? "center" : "right"}
//                 wrapperStyle={isMobile ? { paddingTop: "20px" } : { paddingLeft: "20px" }}
//               />
//             )}
//           </PieChart>
//         </ResponsiveContainer>
//       </Box>
//     </Paper>
//   );
// };

// export default PieChartCard;

import React from "react";
import { 
  Box, 
  Paper, 
  Typography, 
  useTheme, 
  useMediaQuery, 
  IconButton, 
  Tooltip as MuiTooltip 
} from "@mui/material";
import { InfoOutlined } from "@mui/icons-material"; 
import { 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip as RechartsTooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";

const COLORS = [
  "#00A884", "#FF6F6F", "#FFC107", "#4C6EF5", 
  "#A66BFF", "#FF8E72", "#b8cc8cff"
];

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <Paper
      elevation={4}
      sx={{ px: 2, py: 1, borderRadius: 2, background: "#fff", border: "1px solid #e0e0e0" }}
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

const PieChartCard = ({ title, data, description }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); 

  const hasData = data && data.length > 0 && data.some(item => item.value > 0);

  const chartData = hasData ? data : [{ name: "None", value: 1 }];
  const chartColors = hasData ? COLORS : ["#e0e0e0"];

  return (
    <Paper
      elevation={3}
      sx={{
        p: { xs: 2, md: 4 },
        px:{ xs: 3, md: 8 },
        borderRadius: 5,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        minHeight: 350,
        
        
      }}
    >
      {/* Header Section */}
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          mb: 2, 
          gap: 1 
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700, textAlign: 'center', fontSize: { xs: '1rem', md: '1.25rem' } }}>
          {title}
          {description && (
          <MuiTooltip 
            title={description} 
            arrow 
            placement="top"
            enterTouchDelay={0} 
          >
            <IconButton size="small" sx={{ p: 0.5 }}>
              <InfoOutlined fontSize="small" sx={{ color: 'text.secondary', opacity: 0.7 }} />
            </IconButton>
          </MuiTooltip>
        )}
        </Typography>
        </Box>

      {/* Chart Section */}
      <Box sx={{ width: "100%", height: 320, position: "relative" }}>
        
        {!hasData && (
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              zIndex: 10,
              pointerEvents: "none" 
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 700, color: "#9e9e9e" }}>
              No Data Available
            </Typography>
          </Box>
        )}

        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              cx="50%"
              cy="50%" outerRadius={isMobile ? 80 : 100} 
              innerRadius={hasData ? 0 : 70} 
              
              label={hasData ? (entry) => `${entry.value}%` : false}
              labelLine={hasData} 
              stroke="none"
              isAnimationActive={hasData}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={chartColors[index % chartColors.length]}
                  style={{ 
                    filter: hasData ? "drop-shadow(0px 2px 5px rgba(0,0,0,0.1))" : "none",
                    cursor: hasData ? "pointer" : "default"
                  }}
                />
              ))}
            </Pie>

            {hasData && <RechartsTooltip content={<CustomTooltip />} />}
            
            {hasData && (
              <Legend
                layout={isMobile ? "horizontal" : "vertical"} 
                verticalAlign={isMobile ? "bottom" : "middle"}
                align={isMobile ? "center" : "right"}
                wrapperStyle={isMobile ? { paddingTop: "0px" } : { paddingLeft: "10px" }}
              />
            )}
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default PieChartCard;