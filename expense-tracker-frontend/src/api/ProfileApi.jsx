import axios from 'axios';

const ProfileGetApi = async ()=> {
    const userId = sessionStorage.getItem("userId");
    const getUrl = "http://localhost:8080/api/account/get-user/"+userId;
    return await axios.get(getUrl);
}

const ProfileUpdateApi = async (user)=> {
    const userId = sessionStorage.getItem("userId");
    const updateUrl = "http://localhost:8080/api/account/update-profile/"+userId;
    return await axios.put(updateUrl,user);
}

export {ProfileGetApi,ProfileUpdateApi};