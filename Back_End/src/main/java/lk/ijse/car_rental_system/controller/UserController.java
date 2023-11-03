package lk.ijse.car_rental_system.controller;

import lk.ijse.car_rental_system.service.UserService;
import lk.ijse.car_rental_system.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {
    @Autowired
    UserService user;

    @GetMapping(params = {"username"})
    public ResponseUtil findUser(String username) {
        return new ResponseUtil("Ok", "", user.findUser(username));
    }

    @GetMapping
    public ResponseUtil getAllUsers() {
        return new ResponseUtil("Ok", "Successfully loaded...!", user.getAllUsers());
    }

    @GetMapping(path = "/mail",params = {"username"})
    public ResponseUtil getOTPCode(String username) {
        return new ResponseUtil("Ok", "Successfully loaded...!",user.sendEmail(username));
    }


}
