package lk.ijse.car_rental_system.service;

import lk.ijse.car_rental_system.dto.PaymentDTO;

import java.util.List;

public interface PaymentService{
    void savePayment(PaymentDTO dto);

    String getLastPaymentID();
}
