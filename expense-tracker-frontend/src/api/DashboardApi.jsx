import axios from 'axios';

const url = "http://localhost:8080/api/dashboard/summary/13";

const ExpenseSummary = async ()=> {
    const response = await axios.get(url);
    return response;
}

export default ExpenseSummary;