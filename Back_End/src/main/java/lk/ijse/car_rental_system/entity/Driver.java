package lk.ijse.car_rental_system.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class Driver {
    @Id
    private String driver_id;
    private String address;
    private String contact;
    private String email;
    private String name;
    private String nic;
    @OneToOne(cascade = CascadeType.ALL)
    private User user;
}
