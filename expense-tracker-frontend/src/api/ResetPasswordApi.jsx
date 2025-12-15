import axios from 'axios';

const baseUrl = import.meta.env.VITE_BASE_API_URL;

const ResetPasswordApi = async (password)=> {
    const userId = sessionStorage.getItem("userId");
    const url = `${baseUrl}/api/account/reset-password/`+userId;
    const response = await axios.put(url,password);
    return response;
}

export default ResetPasswordApi;