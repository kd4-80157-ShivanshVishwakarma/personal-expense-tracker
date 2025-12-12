package com.ets.expenseTracker.controllers;


import com.ets.expenseTracker.dtos.*;
import com.ets.expenseTracker.entities.TransactionType;
import com.ets.expenseTracker.services.BudgetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/budget")
public class BudgetController {

    @Autowired
    private BudgetService budgetService;

    @PostMapping("/create-budget/{userId}")
    public ResponseEntity<?> budgetEntry(@RequestBody BudgetDTO request, @PathVariable Long userId) {
        ResponseGenericDTO response = budgetService.createBudget(request,userId);
        if(response.isSuccess()){
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.internalServerError().body(response);
    }

    @GetMapping("/budgets/{userId}")
    public ResponseEntity<?> fetchBudgets(@PathVariable Long userId) {
        ResponseDTO<List<BudgetResponseDTO>> response = budgetService.getBudgets(userId);
        if(response.isSuccess()){
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.internalServerError().body(response);
    }

    @DeleteMapping("/remove/{budgetId}")
    public ResponseEntity<?> removeBudget(@PathVariable Long budgetId) {
        ResponseGenericDTO response = budgetService.deleteBudget(budgetId);
        if(response.isSuccess()){
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.internalServerError().body(response);
    }



}
