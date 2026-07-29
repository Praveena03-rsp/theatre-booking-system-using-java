package com.theatre.booking.repository;

import com.theatre.booking.model.Snack;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SnackRepository extends JpaRepository<Snack, Long> {
}
