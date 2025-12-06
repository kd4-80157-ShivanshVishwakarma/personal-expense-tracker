package com.ets.expenseTracker.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "transactions")
@Data
@NoArgsConstructor
public class Transaction extends Base {

    private String title;
    private Double amount;

    @Enumerated(EnumType.STRING)
    private TransactionType type;

    @Column(name = "transaction_date")
    private LocalDate transactionDate;

    private String description;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @OneToOne(mappedBy = "transaction", cascade = CascadeType.ALL)
    private Receipt receipt;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
}
