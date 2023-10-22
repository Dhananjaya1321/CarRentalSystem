package lk.ijse.car_rental_system.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
@IdClass(Schedule_PK.class)
public class Schedule {
    @Id
    private String rental_id;
    @Id
    private String driver_id;

    @ManyToOne
    @JoinColumn(name = "rental_id", referencedColumnName = "rental_id", insertable = false, updatable = false)
    private Rental rental;

    @ManyToOne
    @JoinColumn(name = "driver_id", referencedColumnName = "driver_id", insertable = false, updatable = false)
    private Driver driver;
}
