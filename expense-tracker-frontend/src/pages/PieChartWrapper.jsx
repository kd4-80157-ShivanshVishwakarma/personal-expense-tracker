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
                 toast.error(categoryWiseSummaryResponse.data.message); 
            }
            if(expenseSummaryResponse.data.success){
                expenseSummaryData = expenseSummaryResponse.data.data.map((data)=>({
                    name:data.type,
                    value : data.expenditure
                }));
            }
            else{
                 toast.error(expenseSummaryResponse.data.message); 
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
        <Box sx={{ mt: 6, px: {xs:0,sm:6,md:6,lg:6} }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mt: 1,ml:{xs:2,sm:2,md:2,lg:0} }}>
            Expense & Income Insights
          </Typography>

          <Typography sx={{ color: "#666", marginTop: 1, marginBottom:3, paddingLeft:1,ml:{xs:1,sm:1,md:2,lg:0}}}>
           Understand your financial habits to make smarter decisions.
          </Typography>
          <Grid container spacing={24}>
            
            {/* Pie Chart 1 */}
            <Grid item xs={12} md={6}>
              <PieChartCard
                padding={3.2}
                title="Monthly Spending Breakdown"
                data={CategoryWiseData}
              />
            </Grid>

            {/* Pie Chart 2 */}
            <Grid item xs={12} md={6}>
              <PieChartCard
                padding={1}
                title="Essential Non-Essential Expense Breakdown"
                description="Essential Items: Food,Bills,Rent,Travel. Non-Essential Items: Shopping,Beverage,Others"
                data={ExpenseSummaryData}
              />
            </Grid>

          </Grid>
        </Box>
  )
}

export default PieChartWrapper;
