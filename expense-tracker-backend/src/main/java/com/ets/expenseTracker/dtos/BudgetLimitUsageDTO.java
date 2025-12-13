package com.ets.expenseTracker.dtos;

import lombok.*;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BudgetLimitUsageDTO {
    private Double usagePercentage;
    private String alertMessage;
}
