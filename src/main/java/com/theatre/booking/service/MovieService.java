package com.theatre.booking.service;

import com.theatre.booking.model.Movie;
import com.theatre.booking.model.Showtime;
import com.theatre.booking.model.Seat;
import com.theatre.booking.repository.MovieRepository;
import com.theatre.booking.repository.ShowtimeRepository;
import com.theatre.booking.repository.SeatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class MovieService {

    @Autowired
    private MovieRepository movieRepository;
    
    @Autowired
    private ShowtimeRepository showtimeRepository;
    
    @Autowired
    private SeatRepository seatRepository;

    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }
    
    public Movie addMovie(Movie movie) {
        return movieRepository.save(movie);
    }

    public List<Showtime> getShowtimes(Long movieId) {
        return showtimeRepository.findByMovieId(movieId);
    }
    
    public Showtime addShowtime(Showtime showtime) {
        Showtime saved = showtimeRepository.save(showtime);
        // Create 50 seats for the new showtime
        for (int i = 1; i <= 50; i++) {
            Seat seat = new Seat();
            seat.setShowtime(saved);
            seat.setSeatNumber("S" + i);
            seat.setBooked(false);
            seatRepository.save(seat);
        }
        return saved;
    }

    public List<Seat> getSeats(Long showtimeId) {
        return seatRepository.findByShowtimeId(showtimeId);
    }
}
