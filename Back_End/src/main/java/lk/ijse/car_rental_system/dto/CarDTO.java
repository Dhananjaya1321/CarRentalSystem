package lk.ijse.car_rental_system.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class CarDTO {
    private String registration_number;
    private MultipartFile back_image;
    private String brand;
    private String color;
    private int free_mileage_for_day;
    private int free_mileage_for_month;
    private MultipartFile front_image;
    private String fuel_type;
    private MultipartFile interior_image;
    private int mileage_after_maintenance;
    private int mileage_before_maintenance;
    private int number_of_passengers;
    private double price_for_day;
    private double price_for_extra_km;
    private double price_for_month;
    private MultipartFile side_image;
    private String status;
    private String transmission_type;
    private String type;
}
