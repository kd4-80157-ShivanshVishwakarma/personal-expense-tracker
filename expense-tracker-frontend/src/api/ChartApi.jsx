import axios from 'axios';

const url1 = "http://localhost:8080/api/dashboard/category-wise-summary/13";
const url2 = "http://localhost:8080/api/dashboard/essential-expense-summary/13";
const url3 = "http://localhost:8080/api/dashboard/monthly-expense/13";

const CategoryWiseSummaryApi = async ()=> {
    const response = await axios.get(url1);
    return response;
}

const ExpenseSummaryApi = async ()=> {
    const response = await axios.get(url2);
    return response;
}

const MonthlyExpensesApi = async ()=> {
    const response = await axios.get(url3);
    return response;
}

export  {CategoryWiseSummaryApi,ExpenseSummaryApi,MonthlyExpensesApi};