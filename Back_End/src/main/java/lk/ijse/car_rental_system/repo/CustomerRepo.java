package lk.ijse.car_rental_system.repo;

import lk.ijse.car_rental_system.entity.CustomEntity;
import lk.ijse.car_rental_system.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CustomerRepo extends JpaRepository<Customer, String> {
    @Query(value = "select nic from customer join user u on u.username = customer.user_username where user_username=?1", nativeQuery = true)
    String findCustomerNIC(String username);

    @Query(value = "select COUNT(nic) from customer ", nativeQuery = true)
    int getCustomerCount();

    @Query(value = "select new lk.ijse.car_rental_system.entity.CustomEntity(c.nic,c.address,c.contact,c.driving_license_number, c.email,c.license_back_photo," +
            "c.license_front_photo,c.nic_back_photo, c.nic_front_photo,u.username,u.password) from Customer c " +
            "join User u on c.user.username = u.username where u.username=?1")
    CustomEntity findCustomerByUsername(String username);

    @Query(value = "select NEW lk.ijse.car_rental_system.entity.CustomEntity(r2.rental_id,r.car.registration_number,r2.pick_up_date,r2.return_date,r2.location,r.message,r.status) " +
            "from Rental r2 join Request r on r2.rental_id = r.rental.rental_id join Customer c on c.nic = r2.customer.nic " +
            "where c.nic=?1")
    List<CustomEntity> getRequests(String nic);

    @Query(value = "select NEW lk.ijse.car_rental_system.entity.Customer(c.nic,c.contact,c.nic_front_photo,c.nic_back_photo,c.driving_license_number,c.license_front_photo,c.license_back_photo) from Customer c")
    List<Customer> getAllCustomers();
}
