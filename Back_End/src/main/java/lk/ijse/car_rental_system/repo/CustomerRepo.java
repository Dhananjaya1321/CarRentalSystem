package lk.ijse.car_rental_system.repo;

import lk.ijse.car_rental_system.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CustomerRepo extends JpaRepository<Customer,String> {
    @Query(value = "select nic from customer join user u on u.username = customer.user_username where user_username=?1",nativeQuery = true)
    String findCustomerNIC(String username);

    @Query(value = "select COUNT(nic) from customer ", nativeQuery = true)
    int getCustomerCount();
}
