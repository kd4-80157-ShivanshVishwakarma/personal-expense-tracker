import axios from 'axios';


const CategoryWiseSummaryApi = async ()=> {
    const userId = sessionStorage.getItem("userId");
    const url = "http://localhost:8080/api/dashboard/category-wise-summary/"+userId;
    const response = await axios.get(url);
    return response;
}

const ExpenseSummaryApi = async ()=> {
    const userId = sessionStorage.getItem("userId");
    const url = "http://localhost:8080/api/dashboard/essential-expense-summary/"+userId;
    const response = await axios.get(url);
    return response;
}

const MonthlyExpensesApi = async ()=> {
    const userId = sessionStorage.getItem("userId");
    const url = "http://localhost:8080/api/dashboard/monthly-expense/"+userId;
    const response = await axios.get(url);
    return response;
}

export  {CategoryWiseSummaryApi,ExpenseSummaryApi,MonthlyExpensesApi};