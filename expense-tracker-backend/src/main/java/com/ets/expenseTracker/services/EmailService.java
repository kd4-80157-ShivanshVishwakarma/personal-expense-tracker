package com.ets.expenseTracker.services;

import com.ets.expenseTracker.dtos.ForgotPasswordDTO;

public interface EmailService {
    boolean sendEmail(String request, String otpCode);
}
