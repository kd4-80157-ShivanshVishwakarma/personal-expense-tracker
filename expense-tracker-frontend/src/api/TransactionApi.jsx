import axios from 'axios';

const baseUrl = import.meta.env.VITE_BASE_API_URL;
const expenseUrl = `${baseUrl}/api/transaction/expense`;
const earningUrl = `${baseUrl}/api/transaction/earning`;

const TransactionExpenseApi = async (values)=> {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.post(expenseUrl,values,{
        params:{
            userId:userId,
            type:"EXPENSE"
        }
    });
    return response;
}

const TransactionEarningApi = async (values)=> {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.post(earningUrl,values,{
        params:{
            userId:userId,
            type:"INCOME"
        }
    });
    return response;
}

const RecentTransactionApi = async ()=> {
    const userId = sessionStorage.getItem("userId");
    const recentTransactionUrl = `${baseUrl}/api/transaction/recent-transaction/`+userId;
    const response = await axios.get(recentTransactionUrl);
    return response;
}

export {TransactionExpenseApi,TransactionEarningApi,RecentTransactionApi};