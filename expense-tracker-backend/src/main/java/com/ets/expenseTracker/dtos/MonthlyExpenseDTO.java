package com.ets.expenseTracker.dtos;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MonthlyExpenseDTO {

    private String monthName;
    private Double expense;

}