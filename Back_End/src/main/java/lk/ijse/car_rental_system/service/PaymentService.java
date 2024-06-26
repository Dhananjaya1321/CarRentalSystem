package lk.ijse.car_rental_system.service;

import lk.ijse.car_rental_system.dto.PaymentDTO;

import java.util.List;

public interface PaymentService{
    void savePayment(PaymentDTO dto);

    void saveCartPayment(List<PaymentDTO> dto);

    String getLastPaymentID();

    void updatePayment(PaymentDTO dto, int thisRentalMiles, String registration_number);

    List<PaymentDTO> getAllPaymentFromLastYear(String lastYear);
}
