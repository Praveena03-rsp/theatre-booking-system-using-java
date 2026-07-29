package com.theatre.booking.controller;

import com.theatre.booking.model.Movie;
import com.theatre.booking.model.Showtime;
import com.theatre.booking.model.Snack;
import com.theatre.booking.service.MovieService;
import com.theatre.booking.service.SnackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin("*")
public class AdminController {

    @Autowired
    private MovieService movieService;

    @Autowired
    private SnackService snackService;

    @PostMapping("/movie")
    public ResponseEntity<Movie> addMovie(@RequestBody Movie movie) {
        return ResponseEntity.ok(movieService.addMovie(movie));
    }

    @PostMapping("/showtime")
    public ResponseEntity<Showtime> addShowtime(@RequestBody Showtime showtime) {
        return ResponseEntity.ok(movieService.addShowtime(showtime));
    }

    @PostMapping("/snack")
    public ResponseEntity<Snack> addSnack(@RequestBody Snack snack) {
        return ResponseEntity.ok(snackService.addSnack(snack));
    }

    @PutMapping("/snack/{id}/stock")
    public ResponseEntity<Snack> updateStock(@PathVariable Long id, @RequestParam int quantity) {
        return ResponseEntity.ok(snackService.updateStock(id, quantity));
    }
}
