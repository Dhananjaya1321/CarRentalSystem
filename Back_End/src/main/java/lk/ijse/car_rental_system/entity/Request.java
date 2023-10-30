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
public class Request {
    @Id
    private String request_id;
    private String message;
    private String status;
    @ManyToOne
    private Rental rental;

    @OneToOne(cascade = CascadeType.PERSIST)
    private Car car;
}
