package lk.ijse.car_rental_system.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class DriverDTO {
    private String driver_id;
    private String address;
    private String contact;
    private String email;
    private String name;
    private String nic;
    private String profile_photo;

    private UserDTO user;
}
