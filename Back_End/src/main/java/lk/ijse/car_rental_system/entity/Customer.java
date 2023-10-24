package lk.ijse.car_rental_system.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class Customer {
    @Id
    private String nic;
    private String nic_front_photo;
    private String nic_back_photo;
    private String address;
    private String contact;
    private String driving_license_number;
    private String license_front_photo;
    private String license_back_photo;
    private String email;
    @OneToOne(cascade = CascadeType.ALL)
    private User user;
    @OneToMany(mappedBy = "customer",cascade = {CascadeType.PERSIST})
    private List<Rental> rentals;
}
