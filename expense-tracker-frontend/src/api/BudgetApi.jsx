import axios from 'axios';

const createBudgetUrl = "http://localhost:8080/api/budget/create-budget/13";
const fetchBudgetUrl = "http://localhost:8080/api/budget/budgets/13";

const CreateBudgetAlertApi = async (user)=> {
    const response = await axios.post(createBudgetUrl,user);
    return response;
}

const FetchBudgetsApi = async (user)=> {
    const response = await axios.get(fetchBudgetUrl);
    return response;
}

const RemoveBudgetApi = async (id)=>{
    const deleteUrl = "http://localhost:8080/api/budget/remove/"+id;
    const response = await axios.delete(deleteUrl);
    return response;
}

export {CreateBudgetAlertApi,FetchBudgetsApi,RemoveBudgetApi};