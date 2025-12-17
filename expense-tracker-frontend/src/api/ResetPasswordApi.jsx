import axios from 'axios';

const baseUrl = import.meta.env.VITE_BASE_API_URL;

const ResetPasswordApi = async (password)=> {
    const url = `${baseUrl}/api/account/reset-password`;
    const response = await axios.post(url,password);
    return response;
}

export default ResetPasswordApi;