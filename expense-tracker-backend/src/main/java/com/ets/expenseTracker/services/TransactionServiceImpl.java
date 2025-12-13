package com.ets.expenseTracker.services;

import com.ets.expenseTracker.dtos.*;
import com.ets.expenseTracker.entities.*;
import com.ets.expenseTracker.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class TransactionServiceImpl implements  TransactionService {

    @Autowired
    private CategoryRepository catRepository;

    @Autowired
    private AccountRepository accRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private ReceiptRepository receiptRepository;

    @Autowired
    private BudgetRepository budgetRepository;

    @Override
    public ResponseDTO<BudgetLimitUsageDTO> createExpenseTransaction(ExpenseRequestDTO request, Long userId, TransactionType type) {
        try {
            User user = accRepository.findById(userId).orElse(null);
            if (user != null) {
                Category category = catRepository.findById(request.getCategoryId()).orElse(null);
                if (category != null) {
                    // 1. Create and Save Transaction
                    Transaction transaction = new Transaction();
                    transaction.setTitle(request.getTitle());
                    transaction.setCategory(category);
                    transaction.setAmount(request.getAmount());
                    transaction.setDescription(request.getDescription());
                    transaction.setUser(user);
                    transaction.setTransactionDate(request.getDate());
                    transaction.setType(type);

                    Transaction t = transactionRepository.saveAndFlush(transaction);

                    if (t != null) {
                        // Handle Receipt Image
                        if (request.getReceiptImageFilePath() != null && !request.getReceiptImageFilePath().isEmpty()) {
                            Receipt receipt = new Receipt();
                            receipt.setFilePath(request.getReceiptImageFilePath());
                            receipt.setTransaction(transaction);
                            receiptRepository.save(receipt);
                        }

                        // 2. BUDGET LOGIC

                        Double percentage = budgetRepository.getBudgetUsagePercentage(userId);

                        if (percentage == null) {
                            percentage = 0.0;
                        }

                        String mainMessage = "Transaction created successfully";
                        String alertMessage = "Within Budget";

                        // Check Thresholds (Highest to Lowest)
                        if (percentage >= 100) {
                            mainMessage = "Transaction saved successfully. ALERT: Budget Limit EXCEEDED!";
                            alertMessage = "You have exceeded 100% of your budget!";
                        } else if (percentage >= 90) {
                            mainMessage = "Transaction saved successfully. CRITICAL 90% budget used.";
                            alertMessage = "You have used over 90% of your budget.";
                        } else if (percentage >= 80) {
                            mainMessage = "Transaction saved successfully. WARNING: 80% budget used.";
                            alertMessage = "You have used over 80% of your budget.";
                        }

                        // 3. Prepare the Data Object
                        BudgetLimitUsageDTO data = new BudgetLimitUsageDTO(percentage, alertMessage);

                        return new ResponseDTO<>(true, mainMessage, data);
                    } else {
                        return new ResponseDTO<>(false, "Transaction failed to save", null);
                    }
                } else {
                    return new ResponseDTO<>(false, "Category not found", null);
                }
            }
            return new ResponseDTO<>(false, "User not found", null);
        } catch (RuntimeException e) {
            e.printStackTrace();
            return new ResponseDTO<>(false, "Internal Server Error", null);
        }
    }

    @Override
    public ResponseGenericDTO createEarningTransaction(EarningRequestDTO request, Long userId, TransactionType type) {
        try{
            User user = accRepository.findById(userId).orElse(null);
            if(user!=null){
                Category category = catRepository.findById(request.getCategoryId()).orElse(null);
                if(category!=null){
                    Transaction transaction = new Transaction();
                    transaction.setTitle(request.getTitle());
                    transaction.setCategory(category);
                    transaction.setAmount(request.getAmount());
                    transaction.setDescription(request.getDescription());
                    transaction.setUser(user);
                    transaction.setTransactionDate(request.getDate());
                    transaction.setType(type);
                    Transaction t = transactionRepository.save(transaction);
                    if(t!=null){
                        return new ResponseGenericDTO(true,"Transaction created successfully");
                    }
                    else return new ResponseGenericDTO(false,"Transaction failed");
                }
                else return new ResponseGenericDTO(false,"Category not found");
            }
            return new  ResponseGenericDTO(false,"User not found");
        }catch(RuntimeException e){
            return new ResponseGenericDTO(false,"Internal Sever Error");
        }
    }

    @Override
    public ResponseDTO<List<TransactionResponseDTO>> getTransactionsById(Long userId) {
        try{
            User user = accRepository.findById(userId).orElse(null);
            if(user!=null){
                List<TransactionResponseDTO> list = transactionRepository.getTransactions(userId);
                if(list!=null){
                    return new ResponseDTO<>(true,"Recent Transactions are fetched",list);
                }
                return new ResponseDTO<>(true,"Data not fetched",null);
            }
            return new ResponseDTO<>(false,"User does not exist",null);
        }catch(RuntimeException e){
            return new ResponseDTO<>(false,"Internal Server Error",null);
        }
    }
}
