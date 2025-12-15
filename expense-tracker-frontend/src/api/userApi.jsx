import axios from 'axios';

const baseUrl = import.meta.env.VITE_BASE_API_URL;
const url = `${baseUrl}/api/account/signup`

const signupUser = async (user)=> {
    return await axios.post(url,user);
}

export default signupUser;