import axios from 'axios';

const userId = sessionStorage.getItem("userId");
const url = "http://localhost:8080/api/account/change-pass/" + userId;

const ChangePasswordApi = async (values)=> {
    return await axios.put(url,values);
}

export default ChangePasswordApi;