package com.ets.expenseTracker.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BudgetResponseDTO {
    private Long id;
    private Double limitAmount;
    private LocalDate startDate;
    private LocalDate endDate;
    private Boolean status;
}
