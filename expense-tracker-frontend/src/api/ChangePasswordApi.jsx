import axios from 'axios';


const baseUrl = import.meta.env.VITE_BASE_API_URL;

const ChangePasswordApi = async (values)=> {
    const userId = sessionStorage.getItem("userId");
    const url = `${baseUrl}/api/account/change-pass/` + userId;
    return await axios.put(url,values);
}

export default ChangePasswordApi;