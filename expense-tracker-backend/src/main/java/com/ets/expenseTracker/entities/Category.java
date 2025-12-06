package com.ets.expenseTracker.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "categories")
@Getter
@Setter
@NoArgsConstructor
public class Category extends Base {

    @Enumerated(EnumType.STRING)
    private CategoryType type;

}

