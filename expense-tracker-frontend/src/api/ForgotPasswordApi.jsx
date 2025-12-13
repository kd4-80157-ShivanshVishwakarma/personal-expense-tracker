import axios from 'axios';


const ForgotPasswordApi = async (email)=> {
    const url = "http://localhost:8080/api/account/forgot-password";
    const response = await axios.patch(url,email);
    return response;
}

const OtpApi = async (otp)=>{
    const otpUrl = "http://localhost:8080/api/account/validate-otp";
    const response = await axios.post(otpUrl,otp);
    return response;
}

export {ForgotPasswordApi,OtpApi};