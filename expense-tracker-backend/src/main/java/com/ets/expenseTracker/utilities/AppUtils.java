package com.ets.expenseTracker.utilities;

import java.security.SecureRandom;

public final class AppUtils {

    private static final SecureRandom random = new SecureRandom();
    private AppUtils() {}

    public static String generateOtp(){
        String base62 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder otp = new StringBuilder();
        for(int i=0;i<5;i++){
            otp.append(base62.charAt(random.nextInt(base62.length())));
        }
        return otp.toString();
    }

}
