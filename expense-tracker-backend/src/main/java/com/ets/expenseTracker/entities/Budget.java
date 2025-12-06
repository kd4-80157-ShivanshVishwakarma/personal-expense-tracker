package com.ets.expenseTracker.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "budget")
@Getter
@Setter
@NoArgsConstructor
public class Budget extends Base {

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "limit_amount", nullable = false)
    private Double limitAmount;

    @Column(name = "start_date",nullable = false)
    private LocalDate startDate;

    @Column(name = "end_date",nullable = false)
    private LocalDate endDate;

    @Column(columnDefinition = "TINYINT(1) DEFAULT 0")
    private Boolean status;

}

