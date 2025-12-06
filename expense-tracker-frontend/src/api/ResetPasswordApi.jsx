import axios from 'axios';

const userId = sessionStorage.getItem("userId");
const url = "http://localhost:8080/api/account/reset-password/"+userId;

const ResetPasswordApi = async (password)=> {
    const response = await axios.put(url,password);
    return response;
}

export default ResetPasswordApi;