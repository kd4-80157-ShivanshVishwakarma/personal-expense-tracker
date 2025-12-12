package com.ets.expenseTracker.repositories;

import com.ets.expenseTracker.dtos.BudgetDTO;
import com.ets.expenseTracker.entities.Budget;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface BudgetRepository extends JpaRepository<Budget,Long> {
    List<Budget> findByUserId(Long userId);

    @Query("""
            select count(b) > 0 from Budget b
            where b.user.id = :userId
            and b.status= true
            and (b.endDate >= :newStartDate)
    """)
    boolean checkBudgetByUserId(@Param("userId") Long userId, @Param("newStartDate") LocalDate newStartDate);

    @Query(value = """
            select round(coalesce(sum(t.amount),0)*100/temp_budget.limit_amount,2) Budget_Percentage from
                (select * from budget b
                where b.user_id=:userId
                and b.status = true
                and current_date() between b.start_date and b.end_date) as temp_budget
                join transactions t on temp_budget.user_id = t.user_id and t.transaction_date between temp_budget.start_date and temp_budget.end_date
                where t.type = 'EXPENSE'
                group by temp_budget.limit_amount;
            """, nativeQuery = true)
    Double getBudgetUsagePercentage(@Param("userId") Long userId);
}
