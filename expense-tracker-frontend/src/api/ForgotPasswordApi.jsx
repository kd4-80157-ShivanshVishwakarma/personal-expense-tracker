import axios from 'axios';

const url = "http://localhost:8080/api/account/forgot-password";
const userId = sessionStorage.getItem("userId");
const otpUrl = "http://localhost:8080/api/account/validate-otp/"+userId;

const ForgotPasswordApi = async (email)=> {
    const response = await axios.patch(url,email);
    return response;
}

const OtpApi = async (otp)=>{
    const response = await axios.put(otpUrl,otp);
    return response;
}

export {ForgotPasswordApi,OtpApi};