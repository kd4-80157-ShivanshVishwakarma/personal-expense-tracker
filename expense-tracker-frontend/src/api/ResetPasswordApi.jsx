import axios from 'axios';

const ResetPasswordApi = async (password)=> {
    const userId = sessionStorage.getItem("userId");
    const url = "http://localhost:8080/api/account/reset-password/"+userId;
    const response = await axios.put(url,password);
    return response;
}

export default ResetPasswordApi;