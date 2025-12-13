import axios from 'axios';

const ExpenseSummary = async ()=> {
    const userId = sessionStorage.getItem("userId");
    const url = "http://localhost:8080/api/dashboard/summary/"+userId;
    const response = await axios.get(url);
    return response;
}

export default ExpenseSummary;