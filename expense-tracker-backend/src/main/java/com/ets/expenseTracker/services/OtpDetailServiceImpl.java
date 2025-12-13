package com.ets.expenseTracker.services;

import com.ets.expenseTracker.entities.*;
import com.ets.expenseTracker.repositories.OtpDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@Transactional
public class OtpDetailServiceImpl implements OtpDetailService{

    @Autowired
    private OtpDetailRepository otpRepo;

    @Override
    public boolean saveOtp(User user, String otp) {
        try{
            OTPDetails temp = otpRepo.save(new OTPDetails(user,otp,LocalDateTime.now(),LocalDateTime.now().plusSeconds(60)));
            if(temp!=null){
                return true;
            }
            else {
                return false;
            }
        }
        catch (RuntimeException e){
            return false;
        }
    }

    @Override
    public boolean verifyOtp( String otp,String email) {
        try{
            boolean flag = otpRepo.validateOtp(otp,email);
            if(flag){
                return true;
            }
            else {
                return false;
            }
        }
        catch (RuntimeException e){
            return false;
        }
    }
}
