package com.ets.expenseTracker.dtos;

import com.ets.expenseTracker.entities.CategoryType;
import lombok.*;

@Data
public class CategoryWiseExpenseSummaryDTO {
    private CategoryType category;   // Category name
    private Double expenditure;

    public CategoryWiseExpenseSummaryDTO(CategoryType category,Double expenditure) {
        this.expenditure = expenditure;
        this.category = category;
    }
}
