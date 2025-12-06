package com.ets.expenseTracker.services;

import com.ets.expenseTracker.dtos.ForgotPasswordDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class EmailServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Override
    public boolean sendEmail(String email, String otp) {
        try {
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setTo(email);
            mailMessage.setSubject("OTP for ExpenseTracker");
            mailMessage.setText("Dear User,\n" +
                    "\n" + otp +
                    " is your One Time OTP to verify your gmail account for resetting your password.\n" +
                    "\n" +
                    "OTP is valid for 60 seconds.\n" +
                    "Never share OTP with anyone.\n" +
                    "\n" +
                    "Assuring you the best of our services.\n" +
                    "\n" +
                    "Warm Regards,\n" +
                    "ExpenseTracker Team");
            mailSender.send(mailMessage);
            return true;
        }
        catch (RuntimeException e) {
            return false;
        }
    }
}
