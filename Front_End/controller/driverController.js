let base_url = "http://localhost:8080/Back_End_war/";
let drivers = getAllDrivers();

function getAllDrivers() {
    $.ajax({
        url: base_url + "driver",
        method: "get",
        success: function (rep) {
             let array=rep.data;
             console.log(array)
            return array;
        },
        error: function (rep) {

        }
    });
}

function generateDriverID() {
    drivers = getAllDrivers();
    if (drivers === undefined){
        return "D00-001";
    }else {
        if (drivers.length > 0) {
            return "D00-00" + (drivers.length + 1);
        } else {
            return "D00-001";
        }
    }

}

function searchDriverNIC(driverNIC) {
    drivers = getAllDrivers();
    return drivers.find(function (driverNIC) {
        return drivers.driverNIC === driverNIC;
    });
}

$("#driver-add-btn").click(function () {
    let driverNIC = $("#driver-nic").val();
    let contact = $("#driver-contact").val();
    let name = $("#driver-name").text();
    let address = $("#driver-address").val();
    let username = $("#driver-username").val();
    let password = $("#driver-password").val();
    let email = $("#driver-email").val();
    // if (undefined === searchDriverNIC(driverNIC)) {
        let driver_id = generateDriverID();
        let newDriver = {
            "driver_id": driver_id,
            "address": address,
            "contact": contact,
            "email": email,
            "name": name,
            "nic": driverNIC,
            "profile_photo": null,
            "user": {"username": username, "password": password, "role": "driver"}
        }
        $.ajax({
            url: base_url + "driver",
            method: "post",
            contentType: "application/json",
            data: JSON.stringify(newDriver),
            success:function (rep) {
                alert(rep.message);
            },
            error:function (rep) {
                alert(rep.responseJSON.message)
            }
        })
    // }
});