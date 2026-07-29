package com.theatre.booking.service;

import com.theatre.booking.model.Snack;
import com.theatre.booking.repository.SnackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SnackService {

    @Autowired
    private SnackRepository snackRepository;

    public List<Snack> getAllSnacks() {
        return snackRepository.findAll();
    }

    public Snack addSnack(Snack snack) {
        return snackRepository.save(snack);
    }

    public Snack updateStock(Long id, int quantity) {
        Snack snack = snackRepository.findById(id).orElseThrow(() -> new RuntimeException("Snack not found"));
        snack.setStockQuantity(quantity);
        return snackRepository.save(snack);
    }
}
