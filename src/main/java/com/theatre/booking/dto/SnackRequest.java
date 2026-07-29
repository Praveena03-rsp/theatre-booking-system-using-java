package com.theatre.booking.dto;

import lombok.Data;
import java.util.List;

@Data
public class SnackRequest {
    private Long snackId;
    private int quantity;
}
