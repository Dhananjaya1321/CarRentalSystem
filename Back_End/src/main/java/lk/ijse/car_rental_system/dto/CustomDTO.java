package lk.ijse.car_rental_system.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.LocalTime;
@NoArgsConstructor
@AllArgsConstructor
@Data
public class CustomDTO {
    private String registration_number;
    private String back_image;
    private String brand;
    private String color;
    private int free_mileage_for_day;
    private int free_mileage_for_month;
    private String front_image;
    private String fuel_type;
    private String interior_image;
    private double loss_damage_waiver;
    private int mileage_after_maintenance;
    private int number_of_passengers;
    private double price_for_day;
    private double price_for_extra_km;
    private double price_for_month;
    private String side_image;
    private String status;
    private String transmission_type;
    private String type;

    private String nic;
    private String nic_front_photo;
    private String nic_back_photo;
    private String address;
    private String contact;
    private String driving_license_number;
    private String license_front_photo;
    private String license_back_photo;
    private String email;

    private String driver_id;
    private String name;
    private String profile_photo;

    private String payment_id;
    private double car_fee;
    private int days;
    private double driver_fee;
    private double loss_damage;
    private int mileage;
    private LocalDate payment_date;
    private LocalTime payment_time;
    private String payment_type;

    private String rental_id;
    private String driver_or_not;
    private String location;
    private String loss_damage_back_slip;
    private LocalDate pick_up_date;
    private LocalTime pick_up_time;
    private LocalDate return_date;
    private LocalTime return_time;

    private String request_id;
    private String message;

    private String username;
    private String password;
    private String role;

    public CustomDTO(String request_id,String message,String status,String rental_id,String registration_number,
                     String driver_or_not,String location,String loss_damage_back_slip,LocalDate pick_up_date,
                     LocalTime pick_up_time, LocalDate return_date,LocalTime return_time,String nic) {
       this.request_id=request_id;
       this.message=message;
       this.status=status;
       this.rental_id=rental_id;
       this.registration_number=registration_number;
       this.driver_or_not=driver_or_not;
       this.location=location;
       this.loss_damage_back_slip=loss_damage_back_slip;
       this.pick_up_date=pick_up_date;
       this.pick_up_time=pick_up_time;
       this.return_date=return_date;
       this.return_time=return_time;
       this.nic=nic;
    }
}
