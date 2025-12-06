import axios from 'axios';
const userId = sessionStorage.getItem("userId");
const getUrl = "http://localhost:8080/api/account/get-user/"+userId;
const updateUrl = "http://localhost:8080/api/account/update-profile/"+userId;

const ProfileGetApi = async ()=> {
    return await axios.get(getUrl);
}

const ProfileUpdateApi = async (user)=> {
    return await axios.put(updateUrl,user);
}

export {ProfileGetApi,ProfileUpdateApi};