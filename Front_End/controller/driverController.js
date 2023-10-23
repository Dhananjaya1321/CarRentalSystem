let base_url = "http://localhost:8080/Back_End_war/";
let drivers = getAllDrivers();

function getAllDrivers() {
    $.ajax({
        url: base_url + "driver",
        method: "get",
        success: function (rep) {
            return JSON.parse(rep.data)[0];
        },
        error: function (rep) {

        }
    });
}

function generateDriverID() {
    drivers = getAllDrivers();
    if (drivers.length > 0) {
        return "D00-00" + (drivers.length + 1);
    } else {
        return "D00-001";
    }
}

function searchDriverNIC(driverNIC) {
    drivers = getAllDrivers();
    return drivers.find(function (driverNIC) {
        return drivers.driverNIC === driverNIC;
    });
}

$("#driver-add-btn").click(function () {
    let driverNIC = $("#driver-nic").text();
    let contact = $("#driver-nic").text();
    let name = $("#driver-nic").text();
    let address = $("#driver-nic").text();
    let username = $("#driver-nic").text();
    let password = $("#driver-nic").text();
    let email = $("#driver-nic").text();
    if (undefined === searchDriverNIC(driverNIC)) {
        let driver_id = generateDriverID();
        let newDriver = {
            "driver_id": driver_id,
            "address": address,
            "contact": contact,
            "email": email,
            "name": name,
            "nic": driverNIC,
            "user": {"username": username, "password": password, "role": "driver"}
        }
        $.ajax({
            url: base_url + "driver",
            method: "post",
            contentType: "application/json",
            data: JSON.stringify(newDriver),
            success:function (rep) {

            },
            error:function (rep) {

            }
        })
    }
});