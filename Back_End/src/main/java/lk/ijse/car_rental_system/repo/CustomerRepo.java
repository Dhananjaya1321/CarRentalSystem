package lk.ijse.car_rental_system.repo;

import lk.ijse.car_rental_system.entity.CustomEntity;
import lk.ijse.car_rental_system.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CustomerRepo extends JpaRepository<Customer,String> {
    @Query(value = "select nic from customer join user u on u.username = customer.user_username where user_username=?1",nativeQuery = true)
    String findCustomerNIC(String username);

    @Query(value = "select COUNT(nic) from customer ", nativeQuery = true)
    int getCustomerCount();

    @Query(value = "select new lk.ijse.car_rental_system.entity.CustomEntity(c.nic,c.address,c.contact,c.driving_license_number, c.email,c.license_back_photo," +
            "c.license_front_photo,c.nic_back_photo, c.nic_front_photo,u.username,u.password) from Customer c " +
            "join User u on c.user.username = u.username where u.username=?1")
    CustomEntity findCustomerByUsername(String username);
}
