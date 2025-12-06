package com.ets.expenseTracker.dtos;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseGenericDTO {
    private boolean success;
    private String message;
}
