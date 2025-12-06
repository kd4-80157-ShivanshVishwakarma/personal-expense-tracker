package com.ets.expenseTracker.dtos;


import com.ets.expenseTracker.entities.CategoryType;
import lombok.*;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExpenseRequestDTO {

    private String title;
    private Long categoryId;
    private String description;
    private Double amount;
    private LocalDate date;
    private String receiptImageFilePath;

}
