package lk.ijse.car_rental_system.util;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ResponseUtil {
    private String state;
    private String message;
    private Object data;
}
