package com.ets.expenseTracker.dtos;

import com.ets.expenseTracker.entities.CategoryType;
import com.ets.expenseTracker.entities.TransactionType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransactionResponseDTO {
    private String title;
    private Double amount;
    private CategoryType category;
    private String description;
    private LocalDate transactionDate;
    private String receipt;
    private TransactionType transactionType;
}
