package lk.ijse.car_rental_system.service.impl;

import lk.ijse.car_rental_system.dto.PaymentDTO;
import lk.ijse.car_rental_system.entity.Payment;
import lk.ijse.car_rental_system.repo.CarRepo;
import lk.ijse.car_rental_system.repo.PaymentRepo;
import lk.ijse.car_rental_system.service.PaymentService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class PaymentServiceImpl implements PaymentService {
    @Autowired
    PaymentRepo paymentRepo;

    @Autowired
    CarRepo carRepo;

    @Autowired
    ModelMapper modelMapper;

    @Override
    public void savePayment(PaymentDTO dto) {
        paymentRepo.save(modelMapper.map(dto, Payment.class));
    }

    @Override
    public String getLastPaymentID() {
        return paymentRepo.getLastPaymentID();
    }

    @Override
    public void updatePayment(PaymentDTO dto, int thisRentalMiles, String registration_number) {
        carRepo.updateCarMileageAfterMaintain(registration_number,thisRentalMiles);
        paymentRepo.save(modelMapper.map(dto,Payment.class));
    }
}
