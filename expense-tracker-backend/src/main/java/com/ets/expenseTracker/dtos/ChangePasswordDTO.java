package com.ets.expenseTracker.dtos;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChangePasswordDTO {

    private  String oldPassword;
    private String newPassword;
}
