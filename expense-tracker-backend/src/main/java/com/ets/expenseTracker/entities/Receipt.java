package com.ets.expenseTracker.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "receipts")
@Getter
@Setter
@NoArgsConstructor
public class Receipt extends Base{

    @Column(name="file_path")
    private String filePath;

    @Column(name="uploaded_at")
    private LocalDateTime uploadedAt = LocalDateTime.now();

    @OneToOne
    @JoinColumn(name = "transaction_id", nullable = false, unique = true)
    private Transaction transaction;

}
