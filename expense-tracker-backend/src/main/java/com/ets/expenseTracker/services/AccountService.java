package com.ets.expenseTracker.services;

import com.ets.expenseTracker.dtos.*;
import com.ets.expenseTracker.entities.User;

public interface AccountService {
    ResponseGenericDTO createUser(UserDTO request);
    ResponseDTO<UserAuthResponseDTO> login(LoginDTO request);
    ResponseDTO<Object> forgotPassword(String request);
    ResponseDTO<User> resetPassword(ResetPasswordDTO request);
    ResponseDTO<User> updateName(Long userId, UpdateNameDTO request);
    ResponseDTO<User> updateProfile(Long userId, UpdateRequestDTO request);
    boolean removeAccount(Long userId);
    ResponseDTO<UserResponseDTO>  getUserById(Long userId);
    ResponseGenericDTO changePasswordById(Long userId,String oldPassword,String newPassword);
}
