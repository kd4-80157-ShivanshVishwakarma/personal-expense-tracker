package com.ets.expenseTracker.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "otp_details")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OTPDetails extends Base{

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="user_id")
    private User user;
    @Column(name="otp_code",length = 5,nullable = false)
    private String otpCode;
    @Column(name = "generated_on")
    private LocalDateTime generatedOn;
    @Column(name = "valid_till")
    private LocalDateTime validTill;

}
