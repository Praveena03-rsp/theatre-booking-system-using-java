package com.theatre.booking.controller;

import com.theatre.booking.model.*;
import com.theatre.booking.service.*;
import com.theatre.booking.dto.BookingRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private MovieService movieService;

    @Autowired
    private SnackService snackService;

    @Autowired
    private BookingService bookingService;

    @GetMapping("/movies")
    public ResponseEntity<List<Movie>> getMovies() {
        return ResponseEntity.ok(movieService.getAllMovies());
    }

    @GetMapping("/showtimes/{movieId}")
    public ResponseEntity<List<Showtime>> getShowtimes(@PathVariable Long movieId) {
        return ResponseEntity.ok(movieService.getShowtimes(movieId));
    }

    @GetMapping("/seats/{showtimeId}")
    public ResponseEntity<List<Seat>> getSeats(@PathVariable Long showtimeId) {
        return ResponseEntity.ok(movieService.getSeats(showtimeId));
    }

    @GetMapping("/snacks")
    public ResponseEntity<List<Snack>> getSnacks() {
        return ResponseEntity.ok(snackService.getAllSnacks());
    }

    @PostMapping("/book")
    public ResponseEntity<?> bookTickets(@RequestBody BookingRequest request) {
        try {
            Booking booking = bookingService.bookTickets(request);
            return ResponseEntity.ok(booking);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/bookings/{userId}")
    public ResponseEntity<List<Booking>> getUserBookings(@PathVariable Long userId) {
        return ResponseEntity.ok(bookingService.getUserBookings(userId));
    }
}
