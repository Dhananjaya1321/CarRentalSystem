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
    private String address;
    private String contact;
    private String driving_license_number;
    private String driving_license_number_photo;
    private String email;
    private String nic_photo;
    @OneToOne(cascade = CascadeType.ALL)
    private User user;
    @OneToMany(mappedBy = "customer",cascade = {CascadeType.PERSIST})
    private List<Rental> rentals;
}
