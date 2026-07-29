package com.theatre.booking.dto;

import lombok.Data;
import java.util.List;

@Data
public class BookingRequest {
    private Long userId;
    private Long showtimeId;
    private List<Long> seatIds;
    private List<SnackRequest> snacks;
    private double totalPrice;
}
