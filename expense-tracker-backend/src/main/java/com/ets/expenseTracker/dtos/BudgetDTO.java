package com.ets.expenseTracker.dtos;

import com.ets.expenseTracker.entities.User;
import lombok.*;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BudgetDTO {
    private Double limitAmount;
    private LocalDate startDate;
    private LocalDate endDate;
    private Boolean status;
}
