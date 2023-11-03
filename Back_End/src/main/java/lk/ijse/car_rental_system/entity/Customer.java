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
    @OneToMany(mappedBy = "customer", cascade = {CascadeType.PERSIST})
    private List<Rental> rentals;

    public Customer(String nic, String nic_front_photo, String nic_back_photo, String address, String contact, String driving_license_number, String license_front_photo, String license_back_photo, String email, User user) {
        this.nic=nic;
        this.nic_front_photo=nic_front_photo;
        this.nic_back_photo=nic_back_photo;
        this.address=address;
        this.contact=contact;
        this.driving_license_number=driving_license_number;
        this.license_front_photo=license_front_photo;
        this.license_back_photo=license_back_photo;
        this.email=email;
        this.user=user;
    }
    public Customer(String nic, String contact, String nic_front_photo, String nic_back_photo, String driving_license_number, String license_front_photo, String license_back_photo) {
        this.nic=nic;
        this.contact=contact;
        this.nic_front_photo=nic_front_photo;
        this.nic_back_photo=nic_back_photo;
        this.driving_license_number=driving_license_number;
        this.license_front_photo=license_front_photo;
        this.license_back_photo=license_back_photo;
    }
}
