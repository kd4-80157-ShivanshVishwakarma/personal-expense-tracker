package com.ets.expenseTracker.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
public class User extends Base{

    @Column(name="first_name", length = 20)
    private String firstName;
    @Column(name="last_name", length = 20)
    private String lastName;
    @Column(unique = true,nullable = false)
    private String email;
    @Column(nullable = false)
    private String password;
    @Enumerated(EnumType.STRING)
    private Role role;
    @Column(columnDefinition = "TINYINT(1) DEFAULT 0")
    private Boolean status;

    private LocalDate dob;
    @Enumerated(EnumType.STRING)
    private GenderType gender;
    @Column(name="created_at", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdAt;

    @OneToMany(
            mappedBy = "user", cascade = CascadeType.ALL,fetch = FetchType.LAZY
    )
    private List<OTPDetails> otpDetails;

    @OneToMany(
            mappedBy = "user", cascade = CascadeType.ALL,fetch = FetchType.LAZY
    )
    private List<Transaction> transactions;

    @OneToMany(
            mappedBy = "user", cascade = CascadeType.ALL,fetch = FetchType.LAZY
    )
    private List<Budget> budgets;
    @PrePersist
    protected void onCreate() {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
        if (status == null) {
            status = true;
        }
        if (role == null) {
            role = Role.User;
        }
    }

}
