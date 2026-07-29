package com.theatre.booking.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "snacks")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Snack {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String category; // e.g., Popcorn, Beverage, Snack
    private String name; // e.g., French Fries, Popcorn, Pepsi
    private String variant; // e.g., Regular, Medium, Large, Butter, Salted, Cheese
    private double price;
    private int stockQuantity;
}
