package lk.ijse.car_rental_system.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class Car {
    @Id
    private String registration_number;
    private String color;
    private String brand;
    private String type;
    private String fuel_type;
    private String transmission_type;
    private String status;
    private String front_image;
    private String back_image;
    private String side_image;
    private String interior_image;
    private double price_for_day;
    private int free_mileage_for_day;
    private double price_for_month;
    private int free_mileage_for_month;
    private double price_for_extra_km;
    private int number_of_passengers;
    private int mileage_after_maintenance;
    private int mileage_before_maintenance;
}
