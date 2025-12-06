package com.ets.expenseTracker.services;

import com.ets.expenseTracker.dtos.*;
import com.ets.expenseTracker.repositories.AccountRepository;
import com.ets.expenseTracker.repositories.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class DashboardServiceImpl implements DashboardService{

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private AccountRepository accRepository;

    public ResponseDTO<DashboardSummaryDTO> getDashboardSummary(Long userId) {

        try{
            if(accRepository.existsById(userId)){
                MonthlySummaryDTO monthlySummary = new MonthlySummaryDTO(
                        transactionRepository.getMonthlyIncome(userId),
                        transactionRepository.getMonthlyExpense(userId),
                        transactionRepository.getMonthlyBalance(userId)
                );
                LifetimeSummaryDTO lifetimeSummary = new LifetimeSummaryDTO(
                        transactionRepository.getLifetimeIncome(userId),
                        transactionRepository.getLifetimeExpense(userId),
                        transactionRepository.getLifetimeBalance(userId)
                );
                return new ResponseDTO<>(true,"Dashboard Summary",
                        new DashboardSummaryDTO(monthlySummary,lifetimeSummary));
            }
            return new ResponseDTO<>(false,"User does not exist!",null);
        }catch(RuntimeException e){
            return new ResponseDTO<>(false,"Internal Server Error",null);
        }
    }

    @Override
    public ResponseDTO<List<CategoryWiseExpenseSummaryDTO>> getCategoryWiseExpenseData(Long userId) {
        try{
            if(accRepository.existsById(userId)){
                List<CategoryWiseExpenseSummaryDTO> list = transactionRepository.getCategoryWiseExpenseSummaries(userId);
                if(list!=null){
                    return new ResponseDTO<>(true,"Category Chart Date Fetched!",list);
                }
                return new ResponseDTO<>(false,"Something went wrong",null);
            }
            return new ResponseDTO<>(false,"User does not exist!",null);
        }catch(RuntimeException e){
            return new ResponseDTO<>(false,"Internal Server Error",null);
        }
    }

    @Override
    public ResponseDTO<List<EssentialNonEssentialExpenseDTO>> getEssentialNonEssentialExpenseData(Long userId) {
        try{
            if(accRepository.existsById(userId)){
                List<EssentialNonEssentialExpenseDTO> list = transactionRepository.getEssentialNonEssentialExpenseSummaries(userId);
                if(list!=null){
                    return new ResponseDTO<>(true,"Data Successfully Fetched",list);
                }
                return new ResponseDTO<>(false,"Something went wrong",null);
            }
            return new ResponseDTO<>(false,"User does not exist!",null);
        }catch(RuntimeException e){
            return new ResponseDTO<>(false,"Internal Server Error",null);
        }
    }

    @Override
    public ResponseDTO<List<MonthlyExpenseDTO>> getMonthlyExpensesData(Long userId) {
        try{
            if(accRepository.existsById(userId)){
                List<MonthlyExpenseDTO> list = transactionRepository.getMonthlyExpenses(userId);
                if(list!=null){
                    return new ResponseDTO<>(true,"Data Successfully Fetched",list);
                }
                return new ResponseDTO<>(false,"Something went wrong",null);
            }
            return new ResponseDTO<>(false,"User does not exist!",null);
        }catch(RuntimeException e){
            return new ResponseDTO<>(false,"Internal Server Error",null);
        }
    }

}
