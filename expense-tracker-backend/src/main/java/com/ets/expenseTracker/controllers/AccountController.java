package com.ets.expenseTracker.controllers;

import com.ets.expenseTracker.dtos.*;
import com.ets.expenseTracker.entities.User;
import com.ets.expenseTracker.services.AccountService;
import com.ets.expenseTracker.services.OtpDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/account")
public class AccountController {

    @Autowired
    private AccountService accountService;
    @Autowired
    private OtpDetailService otpDetailService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody UserDTO request) {
        if(accountService.createUser(request).isSuccess()){
            return ResponseEntity.ok("Signup successful");
        }
        return ResponseEntity.internalServerError().build();
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO request) {
        ResponseDTO<UserAuthResponseDTO> response = accountService.login(request);
        if(response.isSuccess()){
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.internalServerError().body(response.getMessage());
    }

    @PatchMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody ForgotPasswordDTO request) {
        ResponseDTO<Object> response = accountService.forgotPassword(request.getEmail());
        if(response.isSuccess()){
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.internalServerError().body(response);
    }

    @PostMapping("/validate-otp")
    public ResponseEntity<?> validateOtp(@RequestBody OtpDTO otpDTO) {
        boolean response = otpDetailService.verifyOtp(otpDTO.getOtp(),otpDTO.getEmail());
        if(response){
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.internalServerError().body(response);
    }

    @PutMapping("/reset-password/{userId}")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordDTO request,@PathVariable Long userId) {
        ResponseDTO<User> response = accountService.resetPassword(request,userId);
        if(response.isSuccess()){
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.internalServerError().body(response);
    }

    @PutMapping("/update-name/{userId}")
    public ResponseEntity<?> updateName(@RequestBody UpdateNameDTO request,
                                        @PathVariable Long userId) {
        if(request.getName() != null && !(request.getName().equals(""))){
            ResponseDTO<User> response = accountService.updateName(userId,request);
            if(response.isSuccess()){
                return ResponseEntity.ok(response.getMessage());
            }
            return ResponseEntity.internalServerError().body(response.getMessage());
        }
        return ResponseEntity.badRequest().body("Field is empty!");
    }

    @PutMapping("/update-profile/{userId}")
    public ResponseEntity<?> updateProfile(@RequestBody UpdateRequestDTO request, @PathVariable Long userId) {
        if(request != null){
            ResponseDTO<User> response = accountService.updateProfile(userId,request);
            if(response.isSuccess()){
                return ResponseEntity.ok(response);
            }
            return ResponseEntity.internalServerError().body(response);
        }
        return ResponseEntity.badRequest().body("Field is empty!");
    }

    @DeleteMapping("/remove/{userId}")
    public ResponseEntity<?> removeAccount(@PathVariable Long userId) {

        boolean response = accountService.removeAccount(userId);
        if(response){
            return ResponseEntity.ok("Account has been removed successfully");
        }
        return ResponseEntity.ok("Error Occurred");
    }

    @GetMapping("/get-user/{userId}")
    public ResponseEntity<?> GetById(@PathVariable Long userId) {
        ResponseDTO<UserResponseDTO>  response = accountService.getUserById(userId);
        if(response.isSuccess()){
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.ok(response);
    }
    @PutMapping("/change-pass/{userId}")
    public ResponseEntity<?> changePasswordByUserId(@PathVariable Long userId,@RequestBody ChangePasswordDTO dto) {
        ResponseGenericDTO response = accountService.changePasswordById(userId,dto.getOldPassword(),dto.getNewPassword());
        if(response.isSuccess()){
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.ok(response);
    }


}

