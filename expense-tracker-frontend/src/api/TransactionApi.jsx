import axios from 'axios';

const expenseUrl = "http://localhost:8080/api/transaction/expense";
const earningUrl = "http://localhost:8080/api/transaction/earning";

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
    const recentTransactionUrl = "http://localhost:8080/api/transaction/recent-transaction/"+userId;
    const response = await axios.get(recentTransactionUrl);
    return response;
}

export {TransactionExpenseApi,TransactionEarningApi,RecentTransactionApi};