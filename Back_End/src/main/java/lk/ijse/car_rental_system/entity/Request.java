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
    private User user;
    @OneToOne
    private Rental rental;
    @OneToMany(mappedBy = "request")
    private List<Payment> payments;
}
