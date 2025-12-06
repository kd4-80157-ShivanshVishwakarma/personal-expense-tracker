import axios from 'axios';

const url = "http://localhost:8080/api/account/signup"

const signupUser = async (user)=> {
    return await axios.post(url,user);
}

export default signupUser;