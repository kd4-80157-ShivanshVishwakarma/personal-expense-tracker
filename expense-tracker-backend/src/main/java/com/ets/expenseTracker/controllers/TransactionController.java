package com.ets.expenseTracker.controllers;

import com.ets.expenseTracker.dtos.*;
import com.ets.expenseTracker.dtos.UserDTO;
import com.ets.expenseTracker.entities.TransactionType;
import com.ets.expenseTracker.services.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/transaction")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @PostMapping("/expense")
    public ResponseEntity<?> expenseEntry(@RequestBody ExpenseRequestDTO request, @RequestParam Long userId, @RequestParam TransactionType type) {
        ResponseDTO<BudgetLimitUsageDTO>  response = transactionService.createExpenseTransaction(request,userId,type);
        if(response.isSuccess()){
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.internalServerError().body(response);
    }

    @PostMapping("/earning")
    public ResponseEntity<?> earningEntry(@RequestBody EarningRequestDTO request, @RequestParam Long userId, @RequestParam TransactionType type) {
        ResponseGenericDTO  response = transactionService.createEarningTransaction(request,userId,type);
        if(response.isSuccess()){
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.internalServerError().body(response);
    }

    @GetMapping("/recent-transaction/{userId}")
    public ResponseEntity<?> getTransactionsById(@PathVariable Long userId) {
        ResponseDTO<List<TransactionResponseDTO>> response = transactionService.getTransactionsById(userId);
        if(response.isSuccess()){
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.internalServerError().body(response);
    }


}
