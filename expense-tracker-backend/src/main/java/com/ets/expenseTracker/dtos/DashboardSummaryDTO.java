package com.ets.expenseTracker.dtos;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DashboardSummaryDTO {
    private MonthlySummaryDTO monthlySummary;
    private LifetimeSummaryDTO lifetimeSummary;
}
