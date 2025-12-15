import axios from 'axios';

const baseUrl = import.meta.env.VITE_BASE_API_URL;

const ProfileGetApi = async ()=> {
    const userId = sessionStorage.getItem("userId");
    const getUrl = `${baseUrl}/api/account/get-user/`+userId;
    return await axios.get(getUrl);
}

const ProfileUpdateApi = async (user)=> {
    const userId = sessionStorage.getItem("userId");
    const updateUrl = `${baseUrl}/api/account/update-profile/`+userId;
    return await axios.put(updateUrl,user);
}

export {ProfileGetApi,ProfileUpdateApi};