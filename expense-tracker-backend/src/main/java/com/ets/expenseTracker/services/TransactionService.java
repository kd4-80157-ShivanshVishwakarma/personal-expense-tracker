package com.ets.expenseTracker.services;

import com.ets.expenseTracker.dtos.*;
import com.ets.expenseTracker.entities.*;

import java.util.List;

public interface TransactionService {
    ResponseGenericDTO createExpenseTransaction(ExpenseRequestDTO request, Long userId, TransactionType transactionType);
    ResponseGenericDTO createEarningTransaction(EarningRequestDTO request, Long userId, TransactionType transactionType);
    ResponseDTO<List<TransactionResponseDTO>> getTransactionsById(Long userId);
}
