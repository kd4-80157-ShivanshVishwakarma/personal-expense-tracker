import axios from 'axios';

const baseUrl = import.meta.env.VITE_BASE_API_URL;

const CreateBudgetAlertApi = async (user)=> {
    
    const userId = sessionStorage.getItem("userId");
    const createBudgetUrl = `${baseUrl}/api/budget/create-budget/`+userId;
    const response = await axios.post(createBudgetUrl,user);
    return response;
}

const FetchBudgetsApi = async (user)=> {
    const userId = sessionStorage.getItem("userId");
    const fetchBudgetUrl = `${baseUrl}/api/budget/budgets/`+userId;
    const response = await axios.get(fetchBudgetUrl);
    return response;
}

const RemoveBudgetApi = async (id)=>{
    const deleteUrl = `${baseUrl}/api/budget/remove/`+id;
    const response = await axios.delete(deleteUrl);
    return response;
}

export {CreateBudgetAlertApi,FetchBudgetsApi,RemoveBudgetApi};