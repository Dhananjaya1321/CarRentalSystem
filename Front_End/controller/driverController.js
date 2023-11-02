let drivers = [];

function getAllDrivers() {
    $.ajax({
        url: base_url + "driver",
        method: "get",
        async: false,
        success: function (rep) {
            drivers = rep.data;
            loadAllDriversForTable(drivers);
        },
        error: function (rep) {

        }
    });
}

function loadAllDriversForTable(array) {
    $("#driver-details-table-body").empty();
    for (const i in array) {
        let driver = array[i];
        let row = `<tr>
                        <td>${driver.driver_id}</td>
                        <td>${driver.nic}</td>
                        <td>${driver.name}</td>
                        <td>${driver.contact}</td>
                        <td>${driver.address}</td>
                        <td>${driver.email}</td>
                        <td>
                            <button type="button" class="btn btn-danger border-0" style="background-color: #ff0014">
                            <i class="fa-solid fa-trash-can"></i>
                            </button>
                        </td>
                    </tr>`;
        $("#driver-details-table-body").append(row);
    }
    deleteDriver();
}

function generateDriverID() {
    getAllDrivers();
    if (drivers === undefined) {
        return "D00-001";
    } else {
        if (drivers.length > 0) {
            return "D00-00" + (drivers.length + 1);
        } else {
            return "D00-001";
        }
    }

}

let driverID;

function getDriverID() {
    getAllDrivers();
    $.ajax({
        url: base_url + "driver?username=" + usernameForContinue,
        method: "get",
        async: false,
        success: function (rep) {
            driverID = rep.data;
            let driver = searchDriverDriverID(driverID);
            $("#driver-profile-name").text(driver.name);
            $("#driver-profile-nic>span").text(driver.nic);
            $("#driver-profile-email>span").text(driver.email);
            $("#driver-profile-contact>span").text(driver.contact);
            $("#driver-profile-address>span").text(driver.address);
            // $("#profile-photo").css("background",'url()');
        },
    });
}

$("#edit>button").click(function () {
    $("#driver-nic").val($("#driver-profile-nic>span").text());
    $("#driver-contact").val($("#driver-profile-contact>span").text());
    $("#driver-name").val($("#driver-profile-name").text());
    $("#driver-address").val($("#driver-profile-address>span").text());
    $("#driver-email").val($("#driver-profile-email>span").text());
    $("#driver-username").val(usernameForContinue);
    $("#driver-password").val(passwordForContinue);
});

$("#driver-details-update-btn").click(function () {
    $("#driver-password,#driver-address,#driver-contact,#driver-email,#driver-name,#driver-nic").css("border", "1px solid #ced4da");
    let data = {
        "driver_id": driverID,
        "address": $("#driver-address").val(),
        "contact": $("#driver-contact").val(),
        "email": $("#driver-email").val(),
        "name": $("#driver-name").val(),
        "nic": $("#driver-nic").val(),
        "user": {"username": $("#driver-username").val(), "password": $("#driver-password").val(), "role": "driver"},
    }

    if (ADDRESS.test($("#driver-address").val())) {
        if (CONTACT.test($("#driver-contact").val())) {
            if (EMAIL.test($("#driver-email").val())) {
                if (NAME.test($("#driver-name").val())) {
                    if (NIC.test($("#driver-nic").val())) {
                        if (PASSWORD.test($("#driver-password").val())) {
                            $.ajax({
                                url: base_url + "driver",
                                method: "put",
                                data: JSON.stringify(data),
                                contentType: "application/json",
                                success: function (rep) {
                                    alert(rep.message);
                                    $("#driver-password,#driver-address,#driver-contact,#driver-email,#driver-name,#driver-nic").css("border", "1px solid #ced4da");
                                },
                                error: function (rep) {
                                    alert(rep.responseJSON.data);
                                    $("#driver-password,#driver-address,#driver-contact,#driver-email,#driver-name,#driver-nic").css("border", "1px solid #ced4da");
                                }
                            })
                        } else {
                            $("#driver-password").css("border", "1px solid red");
                        }
                    } else {
                        $("#driver-nic").css("border", "1px solid red");
                    }
                } else {
                    $("#driver-name").css("border", "1px solid red");
                }
            } else {
                $("#driver-email").css("border", "1px solid red");
            }
        } else {
            $("#driver-contact").css("border", "1px solid red");
        }
    } else {
        $("#driver-address").css("border", "1px solid red");
    }
});

function searchDriverDriverID(driverID) {
    for (let i in drivers) {
        if (drivers[i].driver_id === driverID) {
            return drivers[i];
        }
    }
}

$("#driver-add-btn").click(function () {
    $("#driver-nic,#driver-contact,#driver-name,#driver-address,#driver-username,#driver-password,#driver-email").css("border", "1px solid #ced4da");
    $("#driver-nic,#driver-contact,#driver-name,#driver-address,#driver-username,#driver-password,#driver-email").val("");
    $("#driver-username-validation").text("");

    let driverNIC = $("#driver-nic").val();
    let contact = $("#driver-contact").val();
    let name = $("#driver-name").val();
    let address = $("#driver-address").val();
    let username = $("#driver-username").val();
    let password = $("#driver-password").val();
    let email = $("#driver-email").val();
    let driver_id = generateDriverID();
    if (!searchUsername(username)) {
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
        if (ADDRESS.test(address)) {
            if (CONTACT.test(contact)) {
                if (EMAIL.test(email)) {
                    if (NAME.test(name)) {
                        if (NIC.test(driverNIC)) {
                            if (PASSWORD.test(password)) {
                                $.ajax({
                                    url: base_url + "driver",
                                    method: "post",
                                    contentType: "application/json",
                                    data: JSON.stringify(newDriver),
                                    success: function (rep) {
                                        alert(rep.message);
                                        getAllDrivers();
                                        loadAllDriversForTable(drivers);
                                        $("#driver-nic,#driver-contact,#driver-name,#driver-address,#driver-username,#driver-password,#driver-email").css("border", "1px solid #ced4da");
                                        $("#driver-nic,#driver-contact,#driver-name,#driver-address,#driver-username,#driver-password,#driver-email").val("");
                                        $("#driver-username-validation,#driver-password-validation").text("");
                                    },
                                    error: function (rep) {
                                        alert(rep.responseJSON.message)
                                    }
                                });
                            } else {
                                $("#driver-password").css("border", "1px solid red");
                                $("#driver-password-validation").text("Must contain at least 8 characters including one uppercase letter, one lowercase letter, one number and one special character");
                                $("#driver-password-validation").css("color","red");
                            }
                        } else {
                            $("#driver-nic").css("border", "1px solid red");
                        }
                    } else {
                        $("#driver-name").css("border", "1px solid red");
                    }
                } else {
                    $("#driver-email").css("border", "1px solid red");
                }
            } else {
                $("#driver-contact").css("border", "1px solid red");
            }
        } else {
            $("#driver-address").css("border", "1px solid red");
        }

    } else {
        /*username already excites*/
        $("#driver-username-validation").text("Username already exists");
        $("#driver-username-validation").css("color","red");
        $("#driver-username-validation").focus();
    }
});

function deleteDriver() {
    $("#driver-details-table-body>tr>td>button").click(function () {
        let driver_id = $(this).parents("#driver-details-table-body>tr").children().eq(0).text();
        if (confirm("Do you want to delete...!")) {
            $.ajax({
                url: base_url + "driver?driver_id=" + driver_id,
                method: "delete",
                success: function (rep) {
                    getAllDrivers();
                    loadAllDriversForTable(drivers);
                    alert(rep.message);
                },
                error: function (rep) {
                    alert(rep.responseJson.message);
                }
            })
        }
    })
}

function getDriverByDriverId(driver_id) {
    let driver = null;
    $.ajax({
        url: base_url + "driver?driver_id=" + driver_id,
        method: "get",
        async: false,
        success: function (rep) {
            driver = rep.data;
        },
    });
    return driver;
}

function getDriverSchedule() {
    getDriverID();
    $.ajax({
        url: base_url + "driver/schedule?driver_id=" + driverID,
        method: "get",
        async: false,
        success: function (rep) {
            console.log(rep.data)
            $("#driver-schedule-table-body").empty();
            for (let i in rep.data) {
                let schedule = rep.data[i];
                let row = `
                        <tr>
                            <td>${schedule.rental_id}</td>
                            <td>${schedule.registration_number}</td>
                            <td>${schedule.pick_up_date}</td>
                            <td>${schedule.pick_up_time}</td>
                            <td>${schedule.return_date}</td>
                            <td>${schedule.return_time}</td>
                            <td>${schedule.location}</td>
                        </tr>`
                $("#driver-schedule-table-body").append(row);
            }
        },
    })
}
