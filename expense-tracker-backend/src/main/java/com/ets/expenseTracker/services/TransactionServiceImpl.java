package com.ets.expenseTracker.services;

import com.ets.expenseTracker.dtos.*;
import com.ets.expenseTracker.entities.*;
import com.ets.expenseTracker.repositories.AccountRepository;
import com.ets.expenseTracker.repositories.CategoryRepository;
import com.ets.expenseTracker.repositories.ReceiptRepository;
import com.ets.expenseTracker.repositories.TransactionRepository;
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

    @Override
    public ResponseGenericDTO createExpenseTransaction(ExpenseRequestDTO request, Long  userId, TransactionType type) {
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
                        if(request.getReceiptImageFilePath()!=null && !request.getReceiptImageFilePath().isEmpty()){
                            Receipt receipt = new Receipt();
                            receipt.setFilePath(request.getReceiptImageFilePath());
                            receipt.setTransaction(transaction);
                            receiptRepository.save(receipt);
                        }
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
