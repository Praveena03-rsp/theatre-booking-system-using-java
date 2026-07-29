package com.theatre.booking.service;

import com.theatre.booking.model.*;
import com.theatre.booking.repository.*;
import com.theatre.booking.dto.BookingRequest;
import com.theatre.booking.dto.SnackRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.ArrayList;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private BookingSnackRepository bookingSnackRepository;
    @Autowired
    private SeatRepository seatRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ShowtimeRepository showtimeRepository;
    @Autowired
    private SnackRepository snackRepository;

    @Transactional
    public Booking bookTickets(BookingRequest request) {
        User user = userRepository.findById(request.getUserId()).orElseThrow(() -> new RuntimeException("User not found"));
        Showtime showtime = showtimeRepository.findById(request.getShowtimeId()).orElseThrow(() -> new RuntimeException("Showtime not found"));

        List<Seat> seatsToBook = new ArrayList<>();
        for (Long seatId : request.getSeatIds()) {
            Seat seat = seatRepository.findById(seatId).orElseThrow(() -> new RuntimeException("Seat not found"));
            if (seat.isBooked()) {
                throw new RuntimeException("Seat " + seat.getSeatNumber() + " is already booked.");
            }
            seat.setBooked(true);
            seatsToBook.add(seatRepository.save(seat));
        }

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setShowtime(showtime);
        booking.setSeats(seatsToBook);
        booking.setStatus("CONFIRMED");
        booking.setTotalPrice(request.getTotalPrice());
        booking = bookingRepository.save(booking);

        if (request.getSnacks() != null) {
            for (SnackRequest snackReq : request.getSnacks()) {
                Snack snack = snackRepository.findById(snackReq.getSnackId()).orElseThrow(() -> new RuntimeException("Snack not found"));
                if (snack.getStockQuantity() < snackReq.getQuantity()) {
                    throw new RuntimeException("Not enough stock for snack: " + snack.getName());
                }
                snack.setStockQuantity(snack.getStockQuantity() - snackReq.getQuantity());
                snackRepository.save(snack);

                BookingSnack bookingSnack = new BookingSnack();
                bookingSnack.setBooking(booking);
                bookingSnack.setSnack(snack);
                bookingSnack.setQuantity(snackReq.getQuantity());
                bookingSnackRepository.save(bookingSnack);
            }
        }

        return booking;
    }

    public List<Booking> getUserBookings(Long userId) {
        return bookingRepository.findByUserId(userId);
    }
}
