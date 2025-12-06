package com.ets.expenseTracker.repositories;

import com.ets.expenseTracker.dtos.CategoryWiseExpenseSummaryDTO;
import com.ets.expenseTracker.dtos.EssentialNonEssentialExpenseDTO;
import com.ets.expenseTracker.dtos.MonthlyExpenseDTO;
import com.ets.expenseTracker.dtos.TransactionResponseDTO;
import com.ets.expenseTracker.entities.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    @Query("""
        SELECT COALESCE(SUM(t.amount), 0)
        FROM Transaction t
        WHERE t.user.id = :userId
          AND t.type = 'INCOME'
          AND FUNCTION('MONTH', t.transactionDate) = FUNCTION('MONTH', CURRENT_DATE)
          AND FUNCTION('YEAR', t.transactionDate) = FUNCTION('YEAR', CURRENT_DATE)
    """)
    double getMonthlyIncome(Long userId);

    @Query("""
        SELECT COALESCE(SUM(t.amount), 0)
        FROM Transaction t
        WHERE t.user.id = :userId
          AND t.type = 'EXPENSE'
          AND FUNCTION('MONTH', t.transactionDate) = FUNCTION('MONTH', CURRENT_DATE)
          AND FUNCTION('YEAR', t.transactionDate) = FUNCTION('YEAR', CURRENT_DATE)
    """)
    double getMonthlyExpense(Long userId);

    @Query("""
        SELECT COALESCE(
            SUM(
                CASE 
                    WHEN t.type = 'INCOME' THEN t.amount
                    WHEN t.type = 'EXPENSE' THEN -t.amount
                END
            ), 0
        )
        FROM Transaction t
        WHERE t.user.id = :userId
          AND FUNCTION('MONTH', t.transactionDate) = FUNCTION('MONTH', CURRENT_DATE)
          AND FUNCTION('YEAR', t.transactionDate) = FUNCTION('YEAR', CURRENT_DATE)
    """)
    double getMonthlyBalance(Long userId);

    @Query("""
        SELECT COALESCE(SUM(t.amount), 0)
        FROM Transaction t
        WHERE t.user.id = :userId
          AND t.type = 'INCOME'
    """)
    double getLifetimeIncome(Long userId);

    @Query("""
        SELECT COALESCE(SUM(t.amount), 0)
        FROM Transaction t
        WHERE t.user.id = :userId
          AND t.type = 'EXPENSE'
    """)
    double getLifetimeExpense(Long userId);

    @Query("""
        SELECT COALESCE(
            SUM(
                CASE 
                    WHEN t.type = 'INCOME' THEN t.amount
                    WHEN t.type = 'EXPENSE' THEN -t.amount
                END
            ), 0
        )
        FROM Transaction t
        WHERE t.user.id = :userId
    """)
    double getLifetimeBalance(Long userId);

    @Query("""
    select new com.ets.expenseTracker.dtos.CategoryWiseExpenseSummaryDTO(
        c.type, round(( cast(sum(t.amount) as double) * 100.0 ) /
            ( select cast(sum(t2.amount) as double)
                from Transaction t2
                where t2.user.id = :userId
                  and t2.type = 'EXPENSE'
                  and function('MONTH', t2.transactionDate) = function('MONTH', current_date)
                  and function('YEAR', t2.transactionDate) = function('YEAR', current_date)
            )
        , 2)
    )
    from Transaction t
    join t.category c
    where t.user.id = :userId
      and t.type = 'EXPENSE'
      and function('MONTH', t.transactionDate) = function('MONTH', current_date)
      and function('YEAR', t.transactionDate) = function('YEAR', current_date)
    group by c.type
    """)
    List<CategoryWiseExpenseSummaryDTO> getCategoryWiseExpenseSummaries(@Param("userId") Long userId);

    @Query("""
        select new com.ets.expenseTracker.dtos.EssentialNonEssentialExpenseDTO(
            case 
                when cat.type in ("FOOD","BILLS","RENT","TRAVEL") then "ESSENTIAL"
                else "NON-ESSENTIAL"
            end AS expense,
            round((cast(sum(t.amount) as double) * 100.0 ) /
            (select cast(sum(t2.amount) as double)
                from Transaction t2
                where t2.user.id = :userId
                  and t2.type = 'EXPENSE'
                  and function('MONTH', t2.transactionDate) = function('MONTH', current_date)
                  and function('YEAR', t2.transactionDate) = function('YEAR', current_date)
            )
        , 2)
        ) from Transaction t
        join Category cat on t.category.id = cat.id
        where t.user.id = :userId and t.type = "EXPENSE"
        and function('MONTH', t.transactionDate) = function('MONTH', current_date)
        and function('YEAR', t.transactionDate) = function('YEAR', current_date)
        group by expense
    """)
    List<EssentialNonEssentialExpenseDTO> getEssentialNonEssentialExpenseSummaries(@Param("userId") Long userId);

    @Query(value = """
    select DATE_FORMAT(transaction_date, '%M') AS monthName,
           sum(t.amount) AS expense
    from transactions t
    where t.user_id = :userId
      and t.type = 'EXPENSE'
      and year(t.transaction_date) = year(curdate())
    group by month(t.transaction_date), DATE_FORMAT(transaction_date, '%M')
    """,
            nativeQuery = true)
    List<MonthlyExpenseDTO> getMonthlyExpenses(@Param("userId") Long userId);

    @Query("""
            select new com.ets.expenseTracker.dtos.TransactionResponseDTO(t.title,t.amount,cat.type,t.description,t.transactionDate,r.filePath,t.type)
            from Transaction t 
            join Category cat on t.category.id = cat.id
            left join Receipt r on r.transaction.id = t.id
            where t.user.id = :userId
            order by t.id desc
            """)
    List<TransactionResponseDTO> getTransactions(@Param("userId") Long userId);

}
