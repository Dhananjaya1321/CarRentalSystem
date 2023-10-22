package lk.ijse.car_rental_system.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class RequestDTO {
    private String request_id;
    private String message;
    private String status;

    private RentalDTO rental;

    private UserDTO user;

    private List<PaymentDTO> payments;
}
