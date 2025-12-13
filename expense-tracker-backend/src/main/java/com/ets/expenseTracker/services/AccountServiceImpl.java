package com.ets.expenseTracker.services;

import com.ets.expenseTracker.*;
import com.ets.expenseTracker.dtos.*;
import com.ets.expenseTracker.entities.*;
import com.ets.expenseTracker.repositories.AccountRepository;
import com.ets.expenseTracker.utilities.AppUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountRepository accRepository;
    @Autowired
    private EmailService emailService;
    @Autowired
    private OtpDetailService otpDetailService;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public ResponseDTO<User> createUser(UserDTO request) {
        try{
            if (!(accRepository.existsByEmail(request.getEmail()))) {
                User usr = accRepository.save(modelMapper.map(request, User.class));
                if(usr!=null){
                    return new ResponseDTO<>(true,"Sign up successful!",usr);
                }
                return new ResponseDTO<>(false,"Internal Server Error",null);
            }
            return null;
        }catch(RuntimeException e){
            return new ResponseDTO<>(false,"Internal Server Error",null);
        }
    }

    @Override
    public ResponseDTO<UserAuthResponseDTO> login(LoginDTO request) {

        try{
            User user = accRepository.findByEmail(request.getEmail());
            if (request.getPassword().equals(user.getPassword())) {
                return new ResponseDTO<>(true, "Login Successful", new UserAuthResponseDTO(user.getId(),user.getEmail(),user.getFirstName()));
            }else{
                return new ResponseDTO<>(false,"Login Failed",null);
            }
        }catch(RuntimeException e){
            return new ResponseDTO<>(false,"Internal Server Error",null);
        }
    }

    @Override
    public ResponseDTO<Object> forgotPassword(String email) {

        try{
            User user = accRepository.findByEmail(email);
            if(user!=null) {
                String otp = AppUtils.generateOtp();
                boolean isMailSent = emailService.sendEmail(email,otp);
                if(isMailSent) {
                    boolean isSaved = otpDetailService.saveOtp(user,otp);
                    if(isSaved) {
                        return new ResponseDTO<>(true,"OTP has been sent successfully!",null);
                    }
                    else return new ResponseDTO<>(false,"Error occurred, Please, Try again!  ",null);
                }
                return new ResponseDTO<>(false,"Error occurred, Please, Try again!  ",null);
            }
            else return new ResponseDTO<>(false,"Email Id doesn't exist/Wrong Email Id",null);
        }catch(RuntimeException e){
            return new ResponseDTO<>(false,"Internal Server Error",e);
        }
    }


    @Override
    public ResponseDTO<User> resetPassword(ResetPasswordDTO request,Long id) {
        try{
            User user = accRepository.findById(id).get();
            if(user!=null) {
                if(request.getPassword().equals(request.getConfirmPassword())) {
                    user.setPassword(request.getPassword());
                    User usr = accRepository.save(user);
                    if(usr!=null) {
                        return new ResponseDTO<>(true,"Password Reset Successful",null);
                    }
                    else return new ResponseDTO<>(false,"Password Reset Failed",null);
                }
                else return new ResponseDTO<>(false,"Password is not matching with confirm password",null);
            }
            else return new ResponseDTO<>(false,"Email Id doesn't exist",null);
        } catch (RuntimeException e) {
            return new ResponseDTO<>(false,"Internal Server Error",null);
        }
    }

    @Override
    public ResponseDTO<User> updateName(Long userId, UpdateNameDTO request) {
        try{
            User user = accRepository.findById(userId).get();
            if(user!=null) {
                user.setFirstName(request.getName());
                return new ResponseDTO<>(true,"Update Successful",user);
            }
            else  return new ResponseDTO<>(false,"Email Id doesn't exist",null);
        }
        catch(RuntimeException e){
            return new ResponseDTO<>(false,"Internal Server Error",null);
        }
    }

    @Override
    public ResponseDTO<User> updateProfile(Long userId, UpdateRequestDTO request) {

        try {
            User user =  accRepository.findById(userId).get();
            if(user!=null) {
                user.setId(userId);
                user.setFirstName(request.getFirstName());
                user.setLastName(request.getLastName());
                user.setEmail(request.getEmail());
                user.setDob(request.getDob());
                if(accRepository.save(user)!=null) {
                    return new ResponseDTO<>(true,"Update Successful",null);
                }
                else return new ResponseDTO<>(false,"Update Unsuccessful",null);
            }
            return  new ResponseDTO<>(false,"Email Id doesn't exist",null);
        }
        catch(RuntimeException e){
            return new ResponseDTO<>(false,"Internal Server Error",null);
        }
    }

    @Override
    public boolean removeAccount(Long userId) {
        try{
            User usr =  accRepository.findById(userId).get();
            if(usr!=null) {
                usr.setStatus(false);
                if(accRepository.save(usr)!=null){
                    return true;
                }
                return  false;
            }
            return  false;
        }
        catch(RuntimeException e){
            return false;
        }
    }

    @Override
    public ResponseDTO<UserResponseDTO> getUserById(Long userId) {
        try{
            User usr =  accRepository.findById(userId).get();
            if(usr!=null) {
                UserResponseDTO urdto = modelMapper.map(usr,UserResponseDTO.class);
                if(urdto!=null) {
                    return new ResponseDTO<>(true,"Data has been fetched",urdto);
                }
                return new ResponseDTO<>(false,"Data has not been fetched",null);
            }
            return new ResponseDTO<>(false,"Email Id doesn't exist",null);
        }
        catch(RuntimeException e){
            return new ResponseDTO<>(false,"Internal Server Error",null);
        }
    }

    @Override
    public ResponseGenericDTO changePasswordById(Long userId, String oldPassword, String newPassword) {
        try{
            User usr =  accRepository.findById(userId).get();
            if(usr!=null) {
                if(usr.getPassword().equals(oldPassword)) {
                    usr.setPassword(newPassword);
                    User usr2 = accRepository.save(usr);
                    if (usr2 != null) {
                        return new ResponseGenericDTO(true,"Password changed successfully!");
                    }
                    else return new ResponseGenericDTO(false,"Something went wrong!");
                }
                return new ResponseGenericDTO(false, "Password did not match");
            }
            return new ResponseGenericDTO(false,"User doesn't exist");
        }
        catch(RuntimeException e){
            return new ResponseGenericDTO(false,"Internal Server Error");
        }
    }
}
