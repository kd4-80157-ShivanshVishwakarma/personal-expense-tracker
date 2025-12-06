import React, { useEffect, useState } from 'react'
import { Box, Paper, Typography,Grid } from "@mui/material";
import PieChartCard from '../components/PieChart';
import {CategoryWiseSummaryApi as categoryWiseSummaryApi,ExpenseSummaryApi as expenseSummaryApi} from '../api/ChartApi'
import BarChartCard from '../components/BarChart';
import { MonthlyExpensesApi as monthlyExpenseApi } from '../api/ChartApi';

const BarChartWrapper = () => {

    const[loading,setLoading] = useState(true);
    const[MonthlyExpensesData,setMonthlyExpensesData] = useState([]);

    const fetchChartData = async()=> {
        try {
            setLoading(true);
            const monthlyExpensesResponse = await monthlyExpenseApi();
            
            let monthlyExpenses;
            if(monthlyExpensesResponse.data.success){
                monthlyExpenses = monthlyExpensesResponse.data.data.map((data)=>({
                    name: data.monthName,
                    value: data.expense
                }))
            }
            else{
                alert(monthlyExpensesResponse.data.response);
            }

            setMonthlyExpensesData(monthlyExpenses);

        } catch (error) {
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(()=>{
        fetchChartData();
    },[])

  return (
        <Box sx={{ mt: 6, px: 6 }}>


        <Box sx={{display:"flex",justifyContent:"center"}}>

          <Typography variant="h4" sx={{ fontWeight: 700, mt: 1 }}>
            Month-Wise Expense Analysis
          </Typography>
          </Box>    
          <Box sx={{display:"flex",justifyContent:"center"}}>
          <Typography sx={{ color: "#666", marginTop: 1, marginBottom:3, paddingLeft:1}}>
            Track how your expenses change over time to improve your financial planning
          </Typography>
          </Box>
        

          
          
          <Box sx={{display:"flex",justifyContent:"center"}}>
            <BarChartCard
                title="Monthly Expense Overview"
                data={MonthlyExpensesData}
            />
          </Box>
          
          
        </Box>
     
  )
}

export default BarChartWrapper;
