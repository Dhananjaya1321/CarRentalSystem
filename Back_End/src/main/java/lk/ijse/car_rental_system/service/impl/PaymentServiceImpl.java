package lk.ijse.car_rental_system.service.impl;

import lk.ijse.car_rental_system.repo.PaymentRepo;
import lk.ijse.car_rental_system.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class PaymentServiceImpl implements PaymentService {
    @Autowired
    PaymentRepo paymentRepo;

    @Override
    public String getLastPaymentID(){
        return paymentRepo.getLastPaymentID();
    }
}
