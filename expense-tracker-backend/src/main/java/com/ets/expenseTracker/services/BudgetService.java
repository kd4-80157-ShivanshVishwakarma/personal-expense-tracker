package com.ets.expenseTracker.services;

import com.ets.expenseTracker.dtos.BudgetDTO;
import com.ets.expenseTracker.dtos.BudgetResponseDTO;
import com.ets.expenseTracker.dtos.ResponseDTO;
import com.ets.expenseTracker.dtos.ResponseGenericDTO;
import com.ets.expenseTracker.entities.Budget;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

public interface BudgetService {
    ResponseGenericDTO createBudget(BudgetDTO budgetDTO, Long userId);
    ResponseDTO<List<BudgetResponseDTO>> getBudgets(Long userId);
    ResponseGenericDTO deleteBudget(Long budgetId);
}
