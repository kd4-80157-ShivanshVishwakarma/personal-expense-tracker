import axios from 'axios';


const LoginUser = async (user)=> {
    const baseUrl = import.meta.env.VITE_BASE_API_URL;
    const url = `${baseUrl}/api/account/login`;
    const response = await axios.post(url,user);
    return response;
}

export default LoginUser;   