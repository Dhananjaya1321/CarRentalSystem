package lk.ijse.car_rental_system.controller;

import lk.ijse.car_rental_system.dto.DriverDTO;
import lk.ijse.car_rental_system.service.DriverService;
import lk.ijse.car_rental_system.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/driver")
public class DriverController {
    @Autowired
    DriverService driverService;

    @PostMapping
    public ResponseUtil addDriver(@RequestBody DriverDTO dto) {
        System.out.println(dto.toString());
        driverService.saveDriver(dto);
        return new ResponseUtil("Ok", "Successfully added...!", dto);
    }

    @DeleteMapping(params = {"driver_id"})
    public ResponseUtil deleteDriver(String driver_id) {
        driverService.deleteDriver(driver_id);
        return new ResponseUtil("Ok", "Successfully deleted...!", driver_id);
    }

    @GetMapping
    public ResponseUtil getAllDrivers() {
        return new ResponseUtil("Ok", "Successfully loaded...!", driverService.getAllDrivers());
    }

    @GetMapping(params = {"driver_id"})
    public ResponseUtil getDriverByDriverId(String driver_id) {
        return new ResponseUtil("Ok", "Successfully loaded...!", driverService.getDriverByDriverId(driver_id));
    }

    @GetMapping(path = "/available/count")
    public ResponseUtil getAvailableDriversCount() {
        return new ResponseUtil("Ok", "Successfully loaded...!", driverService.getAvailableDriversCount());
    }

    @GetMapping(path = "/occupied/count",params = {"date"})
    public ResponseUtil getOccupiedDriversCount(String date) {
        return new ResponseUtil("Ok", "Successfully loaded...!", driverService.getOccupiedDriversCount(date));
    }

    @GetMapping(params = {"nic"})
    public ResponseUtil findDriver(String nic) {
        return new ResponseUtil("Ok", "Successfully loaded...!", driverService.findDriverByNic(nic));
    }
    @GetMapping(params = {"username"})
    public ResponseUtil getDriverId(String username) {
        return new ResponseUtil("Ok", "Successfully loaded...!", driverService.getDriverId(username));
    }
}
