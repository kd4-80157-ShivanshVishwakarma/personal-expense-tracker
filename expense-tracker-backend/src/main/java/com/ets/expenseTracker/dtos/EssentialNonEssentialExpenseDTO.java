package com.ets.expenseTracker.dtos;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EssentialNonEssentialExpenseDTO {

    private String type;
    private Double expenditure;
}
