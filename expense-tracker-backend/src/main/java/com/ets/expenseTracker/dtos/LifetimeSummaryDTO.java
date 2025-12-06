package com.ets.expenseTracker.dtos;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LifetimeSummaryDTO {
    private double totalIncome;
    private double totalExpense;
    private double totalBalance;
}
