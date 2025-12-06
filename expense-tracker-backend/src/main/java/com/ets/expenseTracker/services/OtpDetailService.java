package com.ets.expenseTracker.services;

import com.ets.expenseTracker.dtos.*;
import com.ets.expenseTracker.entities.*;

public interface OtpDetailService {

    boolean saveOtp(User user, String otp);
    boolean verifyOtp(Long userId, String otp);
}
