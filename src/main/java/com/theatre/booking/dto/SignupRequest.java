package com.theatre.booking.dto;

import lombok.Data;

@Data
public class SignupRequest {
    private String username;
    private String password;
    private String role; // Optional, can default to USER
}
