package com.ets.expenseTracker.repositories;

import com.ets.expenseTracker.entities.OTPDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface OtpDetailRepository extends JpaRepository<OTPDetails, Long> {

    @Query("""
                     select case when count(od) > 0 then true else false end
                     from OTPDetails od
                     where od.user.email = :email
                     and od.otpCode = :otp
                     and CURRENT_TIMESTAMP <= od.validTill
           """)
    boolean validateOtp(@Param("otp") String otp,@Param("email")  String email);
}
