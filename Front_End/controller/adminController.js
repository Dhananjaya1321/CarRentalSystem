$(document).ready(function () {
    getRegisteredCustomerCount();
    getTotalBookingCountForTheDay();
    getAvailableCarCount();
    getNeedMaintenanceCarCount();
    getUnderMaintenanceCarCount();
    getPendingRequestCount();
    getAcceptedRequestRequestCountForTheDay();
    getAvailableDriversCount();
    getOccupiedDriversCount();
});
let date = new Date();
let year = date.getFullYear();
let month = date.getMonth() + 1;
let day = date.getDate();
let currentDate = year + "-" + month + "-" + day;

function getRegisteredCustomerCount() {
    $.ajax({
        url: base_url + "customer/count",
        method: "get",
        async: false,
        success: function (rep) {
            $("#registered-users").text(rep.data);
        }
    })
}

function getTotalBookingCountForTheDay() {
    $.ajax({
        url: base_url + "rental/count?date=" + currentDate,
        method: "get",
        async: false,
        success: function (rep) {
            $("#total-bookings-for-day").text(rep.data);
        }
    })
}

function getAvailableCarCount() {
    $.ajax({
        url: base_url + "car/count?status=" + "available",
        method: "get",
        async: false,
        success: function (rep) {
            $("#available-cars").text(rep.data);
        }
    })
}

function getNeedMaintenanceCarCount() {
    $.ajax({
        url: base_url + "car/need/maintain/count",
        method: "get",
        async: false,
        success: function (rep) {
            $("#need-maintenance").text(rep.data);
        }
    })
}

function getUnderMaintenanceCarCount() {
    $.ajax({
        url: base_url + "car/under/maintain/count?status=" + "under-maintenance",
        method: "get",
        async: false,
        success: function (rep) {
            $("#under-maintenance").text(rep.data);
        }
    })
}

function getPendingRequestCount() {
    $.ajax({
        url: base_url + "request/pending/count",
        method: "get",
        async: false,
        success: function (rep) {
            $("#reserved-cars").text(rep.data);
        }
    })
}

function getAcceptedRequestRequestCountForTheDay() {
    $.ajax({
        url: base_url + "request/accept/count?date=" + currentDate,
        method: "get",
        async: false,
        success: function (rep) {
            $("#active-bookings-for-day").text(rep.data);
        }
    })
}

function getAvailableDriversCount() {
    $.ajax({
        url: base_url + "driver/available/count",
        method: "get",
        async: false,
        success: function (rep) {
            $("#available-drivers").text(rep.data);
        }
    })
}

function getOccupiedDriversCount() {
    $.ajax({
        url: base_url + "driver/occupied/count?date=" + currentDate,
        method: "get",
        async: false,
        success: function (rep) {
            $("#occupied-drivers").text(rep.data);
        }
    })
}


/*add cars*/
$("#car-add-btn").click(function () {
    let formData = new FormData($("#cars-add-form")[0]);
    $.ajax({
        url: base_url + "car",
        method: "post",
        data: formData,
        contentType: false,
        processData: false,
        success: function (rep) {
            alert(rep.message);
            getAllCars()
            loadCarsForTable();
        },
        error: function (rep) {
            getAllCars()
            loadCarsForTable();
        }
    })
})

/*load cars for available, undermining and need to maintain tables*/
function loadCarsForTable() {
    $("#available-cars-table-body").empty();
    $("#cars-under-maintenance-table-body").empty();
    $("#cars-need-maintenance-table-body").empty();
    for (let i in cars) {
        let car = cars[i];
        if (car.status === "available") {
            if (car.mileage_after_maintenance >= 5000) {
                $("#need-to-maintain-cars").css("display", "flex");
                let row = `<tr>
                            <td>${car.registration_number}</td>
                            <td>${car.brand}</td>
                            <td>${car.type}</td>
                            <td>Need to maintain</td>
                            <td>
                                <button type="button" class="btn border-0 btn-danger"
                                        style="background-color: #ffb100; width: 180px;">Confirm
                                    maintenance
                                </button>
                            </td>
                        </tr>`;
                $("#cars-need-maintenance-table-body").append(row);
            } else {
                let row = `<tr>
                    <td>${car.registration_number}</td>
                    <td>${car.brand}</td>
                    <td>${car.type}</td>
                    <td style="width: 0;">
                        <select class="form-select" aria-label="Default select example" style="width: 200px">
                            <option value="available">available</option>
                            <option value="under-maintenance">under maintenance</option>
                        </select>
                    </td>
                    <td>
                        <button type="button" class="btn btn-danger border-0" style="background-color: #ff0014"><i
                                class="fa-solid fa-trash-can"></i></button>
                        <button type="button" class="btn border-0 btn-danger" style="background-color: #1aff00;"><i
                                class="fa-solid fa-pencil"></i></button>
                    </td>
                </tr>`;
                $("#available-cars-table-body").append(row);
            }
        } else {
            $("#cars-under-maintenance").css("display", "flex");
            let row = `<tr>
                            <td>${car.registration_number}</td>
                            <td>${car.brand}</td>
                            <td>${car.type}</td>
                            <td> under maintenance</td>
                            <td>
                                <button type="button" class="btn border-0 btn-danger" style="background-color: #1aff00;">
                                    Maintenance completed
                                </button>
                            </td>
                        </tr>`;
            $("#cars-under-maintenance-table-body").append(row);
        }
    }
    deleteCar();
    manageCarMaintainStatus();
}

/*delete cars*/
function deleteCar() {
    $("#available-cars-table-body>tr>td>button:nth-child(1)").click(function () {
        if (confirm("Do you want to delete...!")) {
            let registration_number = $(this).parents("#available-cars-table-body>tr").children().eq(0).text();
            $.ajax({
                url: base_url + "car?registration_number=" + registration_number,
                method: "delete",
                success: function (rep) {
                    alert(rep.message);
                    getAllCars();
                    loadCarsForTable();
                },
                error: function (rep) {

                }
            })
        }
    });
}

let click = 0;

function manageCarMaintainStatus() {
    $("#available-cars-table-body>tr>td>select").click(function () {
        click++;
        if (click === 2) {
            let registration_number = $(this).parents("#available-cars-table-body>tr").children().eq(0).text();
            let status = $(this).val();
            manageCarMaintainStatusRequestHandler(registration_number, status);
            click = 0;
        }
    });
    $("#cars-under-maintenance-table-body>tr>td>button").click(function () {
        let registration_number = $(this).parents("#cars-under-maintenance-table-body>tr").children().eq(0).text();
        let status = "available";
        manageCarMaintainStatusRequestHandler(registration_number, status);
    });
    $("#cars-need-maintenance-table-body>tr>td>button").click(function () {
        let registration_number = $(this).parents("#cars-need-maintenance-table-body>tr").children().eq(0).text();
        let status = "under-maintenance";
        manageCarMaintainStatusRequestHandler(registration_number, status);
    });
}

function manageCarMaintainStatusRequestHandler(registration_number, status) {
    $.ajax({
        url: base_url + "car?registration_number=" + registration_number + "&status=" + status,
        method: "put",
        success: function (rep) {
            console.log(rep.message)
            getAllCars();
            loadCarsForTable();
            if ($("#cars-under-maintenance-table-body tr").length === 0) {
                $("#cars-under-maintenance").css("display", "none");
            }
            if ($("#cars-need-maintenance-table-body tr").length === 0) {
                $("#need-to-maintain-cars").css("display", "none");
            }
        },
        error: function (rep) {

        }
    })
}

let requests = [];

/*all pending requests load to table*/
function getAllRequests() {
    $.ajax({
        url: base_url + "request/pending",
        method: "get",
        async: false,
        success: function (rep) {
            $("#cars-rental-request-table-body").empty();
            requests = rep.data;
            console.log(requests)
            for (let i in requests) {
                let request = requests[i]
                if (request.status === "pending") {
                    let row = `<tr>
                            <td>${request.request_id}</td>
                            <td>${request.nic}</td>
                            <td>${request.registration_number}</td>
                            <td>${request.pick_up_date}</td>
                            <td>${request.pick_up_time}</td>
                            <td>${request.return_date}</td>
                            <td>${request.return_time}</td>
                            <td>
                                <button type="button" class="btn btn-danger border-0" style="background-color: #0090ff;"
                                        data-bs-toggle="modal"
                                        data-bs-target="#request-details">
                                    <i class="fa-solid fa-eye"></i></button>
                            </td>
                        </tr>`;
                    $("#cars-rental-request-table-body").append(row);
                }
            }
        }
    })
    loadPendingRequestDataForPopUpForm();
}

function loadPendingRequestDataForPopUpForm() {
    $("#cars-rental-request-table-body>tr>td>button").click(function () {
        let request_id = $(this).parents("#cars-rental-request-table-body>tr").children().eq(0).text();

        let r = searchRequest(request_id);

        $("#request-id").val(r.request_id);
        $("#nic-request").val(r.nic);
        $("#registration-number-request").val(r.registration_number);
        $("#pick-up-date-request").val(r.pick_up_date);
        $("#pick-up-time-request").val(r.pick_up_time);
        $("#return-date-request").val(r.return_date);
        $("#return-time-request").val(r.return_time);
        $("#location-request").val(r.location);
        $("#drivers-or-not-request").val(r.driver_or_not);
        getAllDrivers();
        if (r.driver_or_not === "yes") {
            $("#drivers-id-request").empty();
            let driver = getDriverByDriverId(r.driver_id);
            $("#drivers-id-request").append(`<option selected value=${r.driver_id}>${r.driver_id}</option>`);
            for (let j in drivers) {
                if (drivers[j].driver_id !== r.driver_id) {
                    let option = `<option value=${drivers[j].driver_id}>${drivers[j].driver_id}</option>`;
                    $("#drivers-id-request").append(option);
                }
            }
            $("#driver-name-request").val(driver.name);
            $("#driver-nic-request").val(driver.nic);
            $("#driver-contact-request").val(driver.contact);
            $("#driver-address-request").val(driver.address);

            $("#drivers-id-request").css("display", "block");
            $("[for=drivers-id-request]").css("display", "block");
            $("#driver-name-request").css("display", "block");
            $("[for=driver-name-request]").css("display", "block");
            $("#driver-nic-request").css("display", "block");
            $("[for=driver-nic-request]").css("display", "block");
            $("#driver-contact-request").css("display", "block");
            $("[for=driver-contact-request]").css("display", "block");
            $("#driver-address-request").css("display", "block");
            $("[for=driver-address-request]").css("display", "block");
        } else {
            $("#drivers-id-request").css("display", "none");
            $("[for=drivers-id-request]").css("display", "none");
            $("#driver-name-request").css("display", "none");
            $("[for=driver-name-request]").css("display", "none");
            $("#driver-nic-request").css("display", "none");
            $("[for=driver-nic-request]").css("display", "none");
            $("#driver-contact-request").css("display", "none");
            $("[for=driver-contact-request]").css("display", "none");
            $("#driver-address-request").css("display", "none");
            $("[for=driver-address-request]").css("display", "none");
        }
        let slip = "../../../CarRentalSystem/Back_End/src/main/resources/files/bankSlip/" + r.loss_damage_back_slip;

        $("#slip").css("background", `url(${slip})`);
        $("#slip").css("backgroundPosition", `center`);
        $("#slip").css("backgroundSize", `cover`);
    })
}

/*change to assigned driver*/
$("#drivers-id-request").click(function () {
    let driver = getDriverByDriverId($("#drivers-id-request").val());
    $("#driver-name-request").val(driver.name);
    $("#driver-nic-request").val(driver.nic);
    $("#driver-contact-request").val(driver.contact);
    $("#driver-address-request").val(driver.address);
})

/*This event was created to reject the rental request*/
$("#reject-request").click(function () {
    let request_id = $("#request-id").val();
    let msg = $("#message-request").val();
    let request = searchRequest(request_id);
    let registration_number = $("#registration-number-request").val();
    let data = {
        "request_id": request_id,
        "message": msg,
        "status": "reject",
        "rental_id": request.rental_id,
        "car": {"registration_number": registration_number}
    }
    $.ajax({
        url: base_url + "request",
        method: "put",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (rep) {
            alert(rep.message);
            getAllRequests();
        },
        error: function (rep) {

        }
    })
})

/*This event was created to accept the rental request*/
$("#accept-request").click(function () {
    let requestid = $("#request-id").val();
    let msg = $("#message-request").val();
    let request = searchRequest(requestid);
    let registrationnumber = $("#registration-number-request").val();
    let driver_id = $("#drivers-id-request").val();
    let driver_or_not = $("#drivers-or-not-request").val();
    let cusnic = $("#nic-request").val();
    let pickupdate = $("#pick-up-date-request").val();
    let pickuptime = $("#pick-up-time-request").val();
    let returndate = $("#return-date-request").val();
    let returntime = $("#return-time-request").val();
    let loc = $("#location-request").val();

    // let payment_id = generateNextPaymentID(getLastPaymentID());

    let requestData = {
        "request_id": requestid,
        "message": msg,
        "status": "accept",
        "rental_id": request.rental_id,
        "car": {"registration_number": registrationnumber},
    }

    if (driver_or_not === "yes") {
        let data = {
            "rental_id": request.rental_id,
            "driver_or_not": driver_or_not,
            "location": loc,
            "pick_up_date": new Date(pickupdate),
            "pick_up_time": pickuptime,
            "return_date": new Date(returndate),
            "return_time": returntime,
            "customer": {"nic": cusnic},
            "rentalCarDetails": [{"rental_id": request.rental_id, "registration_number": registrationnumber}],
            "request": [requestData],
            "schedule": [{
                "rental_id": request.rental_id,
                "driver_id": driver_id,
                "registration_number": registrationnumber
            }]
        }

        $.ajax({
            url: base_url + "request/accept?loss_damage_back_slip=" + request.loss_damage_back_slip,
            method: "put",
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function (rep) {
                console.log(rep.data)
                alert(rep.message);
                getAllRequests();
            },
            error: function (rep) {

            }
        })
    } else {
        $.ajax({
            url: base_url + "request/accept",
            method: "put",
            contentType: "application/json",
            data: JSON.stringify(requestData),
            success: function (rep) {
                console.log(rep.data)
                alert(rep.message);
                getAllRequests();
            },
            error: function (rep) {

            }
        })
    }
})


/*search request from requests array*/
function searchRequest(request_id) {
    for (let i in requests) {
        let rental = requests[i];
        if (rental.request_id === request_id) {
            return requests[i];
        }
    }
}

function getAllPendingPaymentRequest() {
    $.ajax({
        url:base_url+"request",
        method:"get",
        async:false,
        success:function (rep) {
            $("#payment-request-id").empty();
            for (let i in rep.data) {
                let id=rep.data[i].rental_id;
                let option=`<option value="${id}">${id}</option>`;
                $("#payment-request-id").append(option);
            }
        }
    })
}

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
    $("#payment-section").css("display", "none");


    $("#dashboard-btn").css("backgroundColor", "#b3bdff");
    $("#manage-cars-btn").css("backgroundColor", "white");
    $("#manage-drivers-btn").css("backgroundColor", "white");
    $("#rental-request-btn").css("backgroundColor", "white");
    $("#payments-btn").css("backgroundColor", "white");
    getRegisteredCustomerCount();
    getTotalBookingCountForTheDay();
    getAvailableCarCount();
    getNeedMaintenanceCarCount();
    getUnderMaintenanceCarCount();
    getPendingRequestCount();
    getAcceptedRequestRequestCountForTheDay();
    getAvailableDriversCount();
    getOccupiedDriversCount();
});

$("#manage-cars-btn").click(function () {
    getAllCars();
    loadCarsForTable();

    $("#dashboard").css("display", "none");
    $("#cars-section").css("display", "flex");
    $("#drivers-section").css("display", "none");
    $("#cars-rental-request").css("display", "none");
    $("#payment-section").css("display", "none");


    $("#dashboard-btn").css("backgroundColor", "white");
    $("#manage-cars-btn").css("backgroundColor", "#b3bdff");
    $("#manage-drivers-btn").css("backgroundColor", "white");
    $("#rental-request-btn").css("backgroundColor", "white");
    $("#payments-btn").css("backgroundColor", "white");

});

$("#manage-drivers-btn").click(function () {
    $("#dashboard").css("display", "none");
    $("#cars-section").css("display", "none");
    $("#drivers-section").css("display", "flex");
    $("#cars-rental-request").css("display", "none");
    $("#payment-section").css("display", "none");


    $("#dashboard-btn").css("backgroundColor", "white");
    $("#manage-cars-btn").css("backgroundColor", "white");
    $("#manage-drivers-btn").css("backgroundColor", "#b3bdff");
    $("#rental-request-btn").css("backgroundColor", "white");
    $("#payments-btn").css("backgroundColor", "white");


    getAllDrivers();
});

$("#rental-request-btn").click(function () {
    $("#dashboard").css("display", "none");
    $("#cars-section").css("display", "none");
    $("#drivers-section").css("display", "none");
    $("#cars-rental-request").css("display", "flex");
    $("#payment-section").css("display", "none");

    $("#dashboard-btn").css("backgroundColor", "white");
    $("#manage-cars-btn").css("backgroundColor", "white");
    $("#manage-drivers-btn").css("backgroundColor", "white");
    $("#rental-request-btn").css("backgroundColor", "#b3bdff");
    $("#payments-btn").css("backgroundColor", "white");

    getAllRequests();
});

$("#payments-btn").click(function () {
    $("#dashboard").css("display", "none");
    $("#cars-section").css("display", "none");
    $("#drivers-section").css("display", "none");
    $("#cars-rental-request").css("display", "none");
    $("#payment-section").css("display", "flex");

    $("#dashboard-btn").css("backgroundColor", "white");
    $("#manage-cars-btn").css("backgroundColor", "white");
    $("#manage-drivers-btn").css("backgroundColor", "white");
    $("#rental-request-btn").css("backgroundColor", "white");
    $("#payments-btn").css("backgroundColor", "#b3bdff");
    getAllPendingPaymentRequest();
});

$("#logout-btn").click(function () {
    usernameForContinue = "logout";
    passwordForContinue = "logout";
    window.location.href = "../index.html";
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

