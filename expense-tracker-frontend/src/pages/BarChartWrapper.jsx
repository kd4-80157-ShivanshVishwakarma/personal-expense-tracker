// import React, { useEffect, useState } from 'react'
// import { Box, Paper, Typography,Grid } from "@mui/material";
// import BarChartCard from '../components/BarChart';
// import { MonthlyExpensesApi as monthlyExpenseApi } from '../api/ChartApi';

// const BarChartWrapper = () => {

//     const[loading,setLoading] = useState(true);
//     const[MonthlyExpensesData,setMonthlyExpensesData] = useState([]);

//     const fetchChartData = async()=> {
//         try {
//             setLoading(true);
//             const monthlyExpensesResponse = await monthlyExpenseApi();
            
//             let monthlyExpenses;
//             if(monthlyExpensesResponse.data.success){
//                 monthlyExpenses = monthlyExpensesResponse.data.data.map((data)=>({
//                     name: data.monthName,
//                     value: data.expense
//                 }))
//             }
//             else{
//                 alert(monthlyExpensesResponse.data.response);
//             }

//             setMonthlyExpensesData(monthlyExpenses);

//         } catch (error) {
//             console.error(error);
//         }
//         finally {
//             setLoading(false);
//         }
//     }

//     useEffect(()=>{
//         fetchChartData();
//     },[])

//   return (
//         <Box sx={{ mt: 6, px: 6 }}>


//         <Box sx={{display:"flex",justifyContent:"center"}}>

//           <Typography variant="h4" sx={{ fontWeight: 700, mt: 1 }}>
//             Month-Wise Expense Analysis
//           </Typography>
//           </Box>    
//           <Box sx={{display:"flex",justifyContent:"center"}}>
//           <Typography sx={{ color: "#666", marginTop: 1, marginBottom:3, paddingLeft:1}}>
//             Track how your expenses change over time to improve your financial planning
//           </Typography>
//           </Box>
        

          
          
//           <Box sx={{display:"flex",justifyContent:"center"}}>
//             <BarChartCard
//                 title="Monthly Expense Overview"
//                 data={MonthlyExpensesData}
//             />
//           </Box>
          
          
//         </Box>
     
//   )
// }

// export default BarChartWrapper;


import React, { useEffect, useState } from 'react';
import { Box, Typography, Container, CircularProgress } from "@mui/material";
import BarChartCard from '../components/BarChart';
import { MonthlyExpensesApi as monthlyExpenseApi } from '../api/ChartApi';

const BarChartWrapper = () => {

    const [loading, setLoading] = useState(true);
    const [MonthlyExpensesData, setMonthlyExpensesData] = useState([]);

    const fetchChartData = async () => {
        try {
            setLoading(true);
            const monthlyExpensesResponse = await monthlyExpenseApi();

            let monthlyExpenses = [];
            if (monthlyExpensesResponse.data.success) {
                monthlyExpenses = monthlyExpensesResponse.data.data.map((data) => ({
                    name: data.monthName,
                    value: data.expense
                }));
            } else {
                console.error(monthlyExpensesResponse.data.response);
            }

            setMonthlyExpensesData(monthlyExpenses);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchChartData();
    }, [])

    return (
        <Container 
            maxWidth="lg" 
            sx={{ 
                mt: { xs: 3, md: 6 }, // Smaller margin on mobile
                mb: 5,
                px: { xs: 2, md: 4 }  // Smaller padding on mobile
            }}
        >
            {/* HEADER SECTION */}
            <Box sx={{ textAlign: "center", mb: 4 }}>
                <Typography 
                    variant="h4" 
                    sx={{ 
                        fontWeight: 700, 
                        fontSize: { xs: "1.5rem", md: "2.125rem" } // Responsive font size
                    }}
                >
                    Month-Wise Expense Analysis
                </Typography>
                
                <Typography 
                    sx={{ 
                        color: "#666", 
                        mt: 1, 
                        fontSize: { xs: "0.9rem", md: "1rem" },
                        px: { xs: 2, md: 0 } // Add padding on mobile so text doesn't touch edges
                    }}
                >
                    Track how your expenses change over time to improve your financial planning
                </Typography>
            </Box>

            {/* CHART SECTION */}
            <Box 
                sx={{ 
                    display: "flex", 
                    justifyContent: "center", 
                    width: "100%" 
                }}
            >
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
                        <CircularProgress color="success" />
                    </Box>
                ) : (
                    <Box sx={{ width: "100%", maxWidth: "1000px" }}> {/* Limits width on huge screens */}
                        <BarChartCard
                            title="Monthly Expense Overview"
                            data={MonthlyExpensesData}
                        />
                    </Box>
                )}
            </Box>
            
        </Container>
    )
}

export default BarChartWrapper;