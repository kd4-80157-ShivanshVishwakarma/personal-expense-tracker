import React, { useEffect, useState } from 'react'
import { Box, Paper, Typography,Grid } from "@mui/material";
import PieChartCard from '../components/PieChart';
import {CategoryWiseSummaryApi as categoryWiseSummaryApi,ExpenseSummaryApi as expenseSummaryApi} from '../api/ChartApi'

const PieChartWrapper = () => {

    const[CategoryWiseData,setCategoryWiseData] = useState([]);
    const[ExpenseSummaryData,setExpenseSummaryData] = useState([]);
    const[loading,setLoading] = useState(true);

    const fetchChartData = async()=> {
        try {
            setLoading(true);
            const categoryWiseSummaryResponse = await categoryWiseSummaryApi();
            const expenseSummaryResponse = await expenseSummaryApi();

            let categoryData = [];
            let expenseSummaryData = [];

            if(categoryWiseSummaryResponse.data.success){
                categoryData = categoryWiseSummaryResponse.data.data.map((data)=>({
                    name:data.category,
                    value : data.expenditure
                }));          
            }
            else{
                alert(categoryWiseSummaryResponse.data.response); 
            }
            if(expenseSummaryResponse.data.success){
                expenseSummaryData = expenseSummaryResponse.data.data.map((data)=>({
                    name:data.type,
                    value : data.expenditure
                }));
            }
            else{
                alert(expenseSummaryResponse.data.response); 
            }
            
            setCategoryWiseData(categoryData);
            setExpenseSummaryData(expenseSummaryData);


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
          <Typography variant="h4" sx={{ fontWeight: 700, mt: 1 }}>
            Expense & Income Insights
          </Typography>

          <Typography sx={{ color: "#666", marginTop: 1, marginBottom:3, paddingLeft:1}}>
           Understand your financial habits to make smarter decisions.
          </Typography>
          <Grid container spacing={16}>
            
            {/* Pie Chart 1 */}
            <Grid item xs={12} md={6}>
              <PieChartCard
                title="Monthly Spending Breakdown"
                description="A detailed look at how you allocate funds across specific categories like Food, Shopping, and Bills."
                data={CategoryWiseData}
              />
            </Grid>

            {/* Pie Chart 2 */}
            <Grid item xs={12} md={6}>
              <PieChartCard
                title="Needs vs. Wants Analysis"
                description="Essential includes Food, Rent, Bills, & Travel. Everything else is considered Non-Essential."
                data={ExpenseSummaryData}
              />
            </Grid>

          </Grid>
        </Box>
     
  )
}

export default PieChartWrapper;
