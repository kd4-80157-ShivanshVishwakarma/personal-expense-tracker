package com.ets.expenseTracker.services;

import com.ets.expenseTracker.dtos.*;

import java.util.List;

public interface DashboardService {
    ResponseDTO<DashboardSummaryDTO> getDashboardSummary(Long userId);
    ResponseDTO<List<CategoryWiseExpenseSummaryDTO>> getCategoryWiseExpenseData(Long userId);
    ResponseDTO<List<EssentialNonEssentialExpenseDTO>> getEssentialNonEssentialExpenseData(Long userId);
    ResponseDTO<List<MonthlyExpenseDTO>> getMonthlyExpensesData(Long userId);
}
