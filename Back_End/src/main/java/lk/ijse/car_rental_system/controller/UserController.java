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


   /* @PostMapping("/upload")
    public ResponseUtil uploadFile(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return new ResponseUtil("", "", "");
        }

        String uploadDir = "C:\\Users\\ACER\\Documents\\WorkZone\\CarRentalSystem\\Back_End\\src\\main\\resources\\files\\" + "upload-dir";
        try {
            String fileName = file.getOriginalFilename();
            String filePath = new File(uploadDir, fileName).getAbsolutePath();
            file.transferTo(new File(filePath));
            return new ResponseUtil("", "", "");
        } catch (IOException e) {
            return new ResponseUtil("", "", "");
        }
    }*/
}
