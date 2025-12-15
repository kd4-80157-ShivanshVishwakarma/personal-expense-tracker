import axios from 'axios';

const baseUrl = import.meta.env.VITE_BASE_API_URL;

const ExpenseSummary = async ()=> {
    const userId = sessionStorage.getItem("userId");
    const url = `${baseUrl}/api/dashboard/summary/`+userId;
    const response = await axios.get(url);
    return response;
}

export default ExpenseSummary;