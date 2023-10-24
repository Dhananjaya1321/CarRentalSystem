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
public class CustomerDTO {
    private String nic;
    private MultipartFile nic_front_photo;
    private MultipartFile nic_back_photo;
    private String address;
    private String contact;
    private String driving_license_number;
    private MultipartFile license_front_photo;
    private MultipartFile license_back_photo;
    private String email;

    private UserDTO user;
}
