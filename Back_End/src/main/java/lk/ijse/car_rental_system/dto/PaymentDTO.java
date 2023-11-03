package lk.ijse.car_rental_system.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDate;
import java.time.LocalTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class PaymentDTO {
    private String payment_id;
    private double car_fee;
    private int days;
    private double driver_fee;
    private double loss_damage;
    private int mileage;
    private LocalDate payment_date;
    private LocalTime payment_time;
    private String payment_type;
    private String status;
    private double total;

//    private RequestDTO request;
}
