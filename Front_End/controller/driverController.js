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
    let driver=null;
    $.ajax({
        url: base_url + "driver?driver_id=" + driver_id,
        method: "get",
        success: function (rep) {
            driver=rep.data;
        },
    })
    return driver;
}


