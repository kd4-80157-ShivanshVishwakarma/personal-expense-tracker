import axios from 'axios';

const ChangePasswordApi = async (values)=> {
    const userId = sessionStorage.getItem("userId");
    const url = "http://localhost:8080/api/account/change-pass/" + userId;
    return await axios.put(url,values);
}

export default ChangePasswordApi;