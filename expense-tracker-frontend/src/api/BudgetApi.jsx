import axios from 'axios';

const CreateBudgetAlertApi = async (user)=> {
    const userId = sessionStorage.getItem("userId");
    const createBudgetUrl = "http://localhost:8080/api/budget/create-budget/"+userId;
    const response = await axios.post(createBudgetUrl,user);
    return response;
}

const FetchBudgetsApi = async (user)=> {
    const userId = sessionStorage.getItem("userId");
    const fetchBudgetUrl = "http://localhost:8080/api/budget/budgets/"+userId;
    const response = await axios.get(fetchBudgetUrl);
    return response;
}

const RemoveBudgetApi = async (id)=>{
    const deleteUrl = "http://localhost:8080/api/budget/remove/"+id;
    const response = await axios.delete(deleteUrl);
    return response;
}

export {CreateBudgetAlertApi,FetchBudgetsApi,RemoveBudgetApi};