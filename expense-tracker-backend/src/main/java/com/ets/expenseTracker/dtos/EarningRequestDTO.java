package com.ets.expenseTracker.dtos;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EarningRequestDTO {
    private String title;
    private Long categoryId;
    private String description;
    private Double amount;
    private LocalDate date;
}
