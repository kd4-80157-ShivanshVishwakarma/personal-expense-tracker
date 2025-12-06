package com.ets.expenseTracker.repositories;

import com.ets.expenseTracker.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category,Long> {
}
