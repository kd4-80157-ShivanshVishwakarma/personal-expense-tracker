package com.ets.expenseTracker.services;

import com.ets.expenseTracker.dtos.BudgetDTO;
import com.ets.expenseTracker.dtos.BudgetResponseDTO;
import com.ets.expenseTracker.dtos.ResponseDTO;
import com.ets.expenseTracker.dtos.ResponseGenericDTO;
import com.ets.expenseTracker.entities.Budget;
import com.ets.expenseTracker.entities.Category;
import com.ets.expenseTracker.entities.Transaction;
import com.ets.expenseTracker.entities.User;
import com.ets.expenseTracker.repositories.AccountRepository;
import com.ets.expenseTracker.repositories.BudgetRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class BudgetServiceImpl implements BudgetService{

    @Autowired
    BudgetRepository budgetRepository;

    @Autowired
    AccountRepository accountRepository;

    @Autowired
    ModelMapper mapper;

    @Override
    public ResponseGenericDTO createBudget(BudgetDTO budgetDTO, Long userId) {
        try{
            if(accountRepository.existsById(userId)){
                boolean checkedBudget = budgetRepository.checkBudgetByUserId(userId,budgetDTO.getStartDate());
                if(checkedBudget){
                    return new ResponseGenericDTO(false,"You already have an active budget." +
                            " The new budget must start after active budget date.");
                }
                Budget budget = mapper.map(budgetDTO, Budget.class);
                if(budget!=null){
                    budget.setUser(accountRepository.getReferenceById(userId));
                    Budget budget1 = budgetRepository.save(budget);
                    if(budget1!=null){
                        return new ResponseGenericDTO(true,"Alert has been created!");
                    }
                    return new ResponseGenericDTO(false,"Unsuccessful Attempt!");
                }
                return new ResponseGenericDTO(false,"Error Occurred!");
            }
            return new  ResponseGenericDTO(false,"User not found");
        }catch(RuntimeException e){
            return new ResponseGenericDTO(false,"Internal Sever Error");
        }
    }

    @Override
    public ResponseDTO<List<BudgetResponseDTO>> getBudgets(Long userId) {
        try{
            if(accountRepository.existsById(userId)){
                List<BudgetResponseDTO> list = budgetRepository.findByUserId(userId)
                        .stream()
                        .map(x-> mapper.map(x , BudgetResponseDTO.class)).toList();
                if(list!=null){
                    return new ResponseDTO<>(true,"Budgets Fetched Successfully!",list);
                }
                return new ResponseDTO<>(false,"Unsuccessful Attempt!",null);
            }
            return new ResponseDTO<>(false,"User not found",null);
        }catch(RuntimeException e){
            return new ResponseDTO<>(false,"Internal Sever Error",null);
        }
    }

    @Override
    public ResponseGenericDTO deleteBudget(Long budgetId) {
        try{
            if(budgetRepository.existsById(budgetId)){
                budgetRepository.deleteById(budgetId);
                return new ResponseGenericDTO(true,"Budget has been deleted!");
            }
            return new ResponseGenericDTO(false,"Budget does not exist!");
        }catch(RuntimeException e){
            return new ResponseGenericDTO(false,"Internal Sever Error");
        }
    }


}
