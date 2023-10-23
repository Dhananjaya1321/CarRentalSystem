let base_url = "http://localhost:8080/Back_End_war/";
let drivers = [];

function getAllDrivers() {
    $.ajax({
        url: base_url + "driver",
        method: "get",
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

/*
function searchDriverNIC(driverNIC) {
    let resp = false;
    $.ajax({
        url: base_url + "driver?nic=" + driverNIC,
        method: "get",
        async: false,
        success: function (rep) {
            return true;
        },
        error: function (rep) {
            return false;
        }
    })
}
*/

function searchUsername(username) {
    let resp = false;
    $.ajax({
        url: base_url + "user",
        method: "get",
        async: false,
        success: function (rep) {
            let users = rep.data;
            resp = users.find(function (user) {
                return user.username === username;
            });
        },
        error: function (rep) {
            resp = false;
        }
    });
    return resp;
}

$("#driver-add-btn").click(function () {
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
        $.ajax({
            url: base_url + "driver",
            method: "post",
            contentType: "application/json",
            data: JSON.stringify(newDriver),
            success: function (rep) {
                alert(rep.message);
                getAllDrivers();
                loadAllDriversForTable(drivers);
            },
            error: function (rep) {
                alert(rep.responseJSON.message)
            }
        });
    } else {
        /*username already excites*/
    }
});


$("#home-btn").css("backgroundColor", "white");
$("#logout-btn").css("backgroundColor", "white");
$("#manage-cars-btn").css("backgroundColor", "white");
$("#manage-drivers-btn").css("backgroundColor", "white");
$("#rental-request-btn").css("backgroundColor", "white");
$("#payments-btn").css("backgroundColor", "white");
$("#income-btn").css("backgroundColor", "white");

$("#dashboard-btn").click(function () {
    $("#dashboard").css("display", "flex");
    $("#cars-section").css("display", "none");
    $("#drivers-section").css("display", "none");
    $("#cars-rental-request").css("display", "none");

    $("#dashboard-btn").css("backgroundColor", "#b3bdff");
    $("#manage-cars-btn").css("backgroundColor", "white");
    $("#manage-drivers-btn").css("backgroundColor", "white");
    $("#rental-request-btn").css("backgroundColor", "white");
});
$("#manage-cars-btn").click(function () {
    $("#dashboard").css("display", "none");
    $("#cars-section").css("display", "flex");
    $("#drivers-section").css("display", "none");
    $("#cars-rental-request").css("display", "none");

    $("#dashboard-btn").css("backgroundColor", "white");
    $("#manage-cars-btn").css("backgroundColor", "#b3bdff");
    $("#manage-drivers-btn").css("backgroundColor", "white");
    $("#rental-request-btn").css("backgroundColor", "white");
});
$("#manage-drivers-btn").click(function () {
    $("#dashboard").css("display", "none");
    $("#cars-section").css("display", "none");
    $("#drivers-section").css("display", "flex");
    $("#cars-rental-request").css("display", "none");

    $("#dashboard-btn").css("backgroundColor", "white");
    $("#manage-cars-btn").css("backgroundColor", "white");
    $("#manage-drivers-btn").css("backgroundColor", "#b3bdff");
    $("#rental-request-btn").css("backgroundColor", "white");

    drivers = getAllDrivers();
});
$("#rental-request-btn").click(function () {
    $("#dashboard").css("display", "none");
    $("#cars-section").css("display", "none");
    $("#drivers-section").css("display", "none");
    $("#cars-rental-request").css("display", "flex");

    $("#dashboard-btn").css("backgroundColor", "white");
    $("#manage-cars-btn").css("backgroundColor", "white");
    $("#manage-drivers-btn").css("backgroundColor", "white");
    $("#rental-request-btn").css("backgroundColor", "#b3bdff");
});

$("#cars-section>form").css("display", "none");
let click_count = 0;
$("#new-car-btn-div>button").click(function () {
    if (click_count === 0) {
        $("#cars-section>form").css("display", "flex");
        click_count = 1;
    } else {
        $("#cars-section>form").css("display", "none");
        click_count = 0;
    }
});