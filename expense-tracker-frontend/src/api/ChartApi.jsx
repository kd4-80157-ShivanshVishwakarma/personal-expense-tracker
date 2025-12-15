import axios from 'axios';

const baseUrl = import.meta.env.VITE_BASE_API_URL;

const CategoryWiseSummaryApi = async ()=> {
    const userId = sessionStorage.getItem("userId");
    const url = `${baseUrl}/api/dashboard/category-wise-summary/`+userId;
    const response = await axios.get(url);
    return response;
}

const ExpenseSummaryApi = async ()=> {
    const userId = sessionStorage.getItem("userId");
    const url = `${baseUrl}/api/dashboard/essential-expense-summary/`+userId;
    const response = await axios.get(url);
    return response;
}

const MonthlyExpensesApi = async ()=> {
    const userId = sessionStorage.getItem("userId");
    const url = `${baseUrl}/api/dashboard/monthly-expense/`+userId;
    const response = await axios.get(url);
    return response;
}

export  {CategoryWiseSummaryApi,ExpenseSummaryApi,MonthlyExpensesApi};