import axios from 'axios';

const expenseUrl = "http://localhost:8080/api/transaction/expense";
const earningUrl = "http://localhost:8080/api/transaction/earning";
const recentTransactionUrl = "http://localhost:8080/api/transaction/recent-transaction/13";

const TransactionExpenseApi = async (values)=> {
    const response = await axios.post(expenseUrl,values,{
        params:{
            userId:13,
            type:"EXPENSE"
        }
    });
    return response;
}

const TransactionEarningApi = async (values)=> {
    const response = await axios.post(earningUrl,values,{
        params:{
            userId:13,
            type:"INCOME"
        }
    });
    return response;
}

const RecentTransactionApi = async ()=> {
    const response = await axios.get(recentTransactionUrl);
    return response;
}

export {TransactionExpenseApi,TransactionEarningApi,RecentTransactionApi};