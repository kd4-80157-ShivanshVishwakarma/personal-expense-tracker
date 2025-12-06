package com.ets.expenseTracker.repositories;

import com.ets.expenseTracker.entities.Receipt;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReceiptRepository extends JpaRepository<Receipt, Long> {

}
