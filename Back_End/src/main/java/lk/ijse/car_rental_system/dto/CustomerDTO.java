package lk.ijse.car_rental_system.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class CustomerDTO {
    private String nic;
    private String address;
    private String contact;
    private String driving_license_number;
    private String driving_license_number_photo;
    private String email;
    private String nic_photo;

    private UserDTO user;
}
