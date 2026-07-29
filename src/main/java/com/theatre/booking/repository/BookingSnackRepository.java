package com.theatre.booking.repository;

import com.theatre.booking.model.BookingSnack;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingSnackRepository extends JpaRepository<BookingSnack, Long> {
}
