import axios from 'axios';

const baseUrl = import.meta.env.VITE_BASE_API_URL;

const ForgotPasswordApi = async (email)=> {
    const url = `${baseUrl}/api/account/forgot-password`;
    const response = await axios.patch(url,email);
    return response;
}

const OtpApi = async (otp)=>{
    const otpUrl = `${baseUrl}/api/account/validate-otp`;
    const response = await axios.post(otpUrl,otp);
    return response;
}

export {ForgotPasswordApi,OtpApi};