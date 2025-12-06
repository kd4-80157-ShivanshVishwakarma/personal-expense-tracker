package com.ets.expenseTracker.dtos;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MonthlySummaryDTO {
    private double monthlyIncome;
    private double monthlyExpense;
    private double monthlyBalance;
}
