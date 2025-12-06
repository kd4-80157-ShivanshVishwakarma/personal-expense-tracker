package com.ets.expenseTracker.controllers;

import com.ets.expenseTracker.dtos.*;
import com.ets.expenseTracker.services.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/summary/{userId}")
    public ResponseEntity<?> getMonthlyAndLifeTimeSummary(@PathVariable Long userId) {

        ResponseDTO<DashboardSummaryDTO> summary = dashboardService.getDashboardSummary(userId);
        if(summary.isSuccess()){
            return ResponseEntity.ok(summary);
        }
        else return ResponseEntity.internalServerError().body(summary);
    }

    @GetMapping("/category-wise-summary/{userId}")
    public ResponseEntity<?> getCategoryWiseMonthlySalary(@PathVariable Long userId) {

        ResponseDTO<List<CategoryWiseExpenseSummaryDTO>> response = dashboardService.getCategoryWiseExpenseData(userId);
        if(response.isSuccess()){
            return ResponseEntity.ok(response);
        }
        else return ResponseEntity.internalServerError().body(response);
    }

    @GetMapping("/essential-expense-summary/{userId}")
    public ResponseEntity<?> getEssentialNonEssentialExpenses(@PathVariable Long userId) {
        ResponseDTO<List<EssentialNonEssentialExpenseDTO>> response = dashboardService.getEssentialNonEssentialExpenseData(userId);
        if(response.isSuccess()){
            return ResponseEntity.ok(response);
        }
        else return ResponseEntity.internalServerError().body(response);
    }

    @GetMapping("/monthly-expense/{userId}")
    public ResponseEntity<?> getMonthlyExpenses(@PathVariable Long userId) {
        ResponseDTO<List<MonthlyExpenseDTO>> response = dashboardService.getMonthlyExpensesData(userId);
        if(response.isSuccess()){
            return ResponseEntity.ok(response);
        }
        else return ResponseEntity.internalServerError().body(response);
    }
}
