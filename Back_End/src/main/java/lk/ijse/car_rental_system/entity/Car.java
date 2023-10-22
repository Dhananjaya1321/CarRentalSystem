package lk.ijse.car_rental_system.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class Car {
    @Id
    private String registration_number;
    private String back_image;
    private String brand;
    private String color;
    private int free_mileage_for_day;
    private int free_mileage_for_month;
    private String front_image;
    private String fuel_type;
    private String interior_image;
    private int mileage_after_maintenance;
    private int mileage_before_maintenance;
    private int number_of_passengers;
    private double price_for_day;
    private double price_for_extra_km;
    private double price_for_month;
    private String side_image;
    private String status;
    private String transmission_type;
    private String type;
}
