package com.theatre.booking.service;

import com.theatre.booking.model.User;
import com.theatre.booking.repository.UserRepository;
import com.theatre.booking.dto.SignupRequest;
import com.theatre.booking.dto.LoginRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    public User signup(SignupRequest request) {
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }
        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(request.getPassword()); // In a real app, hash this!
        user.setRole(request.getRole() != null ? request.getRole() : "USER");
        return userRepository.save(user);
    }

    public User login(LoginRequest request) {
        Optional<User> userOpt = userRepository.findByUsername(request.getUsername());
        if (userOpt.isPresent() && userOpt.get().getPassword().equals(request.getPassword())) {
            return userOpt.get();
        }
        throw new RuntimeException("Invalid username or password");
    }
}
