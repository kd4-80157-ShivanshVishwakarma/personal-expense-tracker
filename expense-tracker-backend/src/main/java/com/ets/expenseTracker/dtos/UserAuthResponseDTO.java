package com.ets.expenseTracker.dtos;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserAuthResponseDTO {
    private Long userId;
    private String email;
}
