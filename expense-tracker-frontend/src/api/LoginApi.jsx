import axios from 'axios';

const url = "http://localhost:8080/api/account/login"

const LoginUser = async (user)=> {
    const response = await axios.post(url,user);
    return response;
}

export default LoginUser;