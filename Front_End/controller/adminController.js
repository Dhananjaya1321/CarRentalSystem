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
if (day < 10) {
    day = "0" + day;
}
if (month < 10) {
    month = "0" + month;
}
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
    $("#brand,#Number-of-passengers,#registration-number,#color,#daily-rate,#monthly-rate,#daily-free-mileage,#monthly-free-mileage,#price-for-extra-km,#mileage-after-last-maintenance,#loss-damage-waiver").css("border", "1px solid #ced4da");
    let brand = $("#brand").val();
    let numberOfPassengers = $("#Number-of-passengers").val();
    let registrationNumber = $("#registration-number").val();
    let color = $("#color").val();
    let dailyRate = $("#daily-rate").val();
    let monthlyRate = $("#monthly-rate").val();
    let dailyFreeMileage = $("#daily-free-mileage").val();
    let monthlyFreeMileage = $("#monthly-free-mileage").val();
    let priceForExtraKM = $("#price-for-extra-km").val();
    let mileageAfterLastMaintenance = $("#mileage-after-last-maintenance").val();
    let lossDamageWaiver = $("#loss-damage-waiver").val();
    if (BRAND.test(brand)) {
        if (PASSENGER_COUNT.test(numberOfPassengers)) {
            if (REGISTRATION_NUMBER.test(registrationNumber)) {
                if (COLOR.test(color)) {
                    if (PRICES.test(dailyRate)) {
                        if (PRICES.test(monthlyRate)) {
                            if (MILEAGES.test(dailyFreeMileage)) {
                                if (MILEAGES.test(monthlyFreeMileage)) {
                                    if (PRICES.test(priceForExtraKM)) {
                                        if (MILEAGES.test(mileageAfterLastMaintenance)) {
                                            if (MILEAGES.test(lossDamageWaiver)) {
                                                saveCar();
                                                $("#brand,#Number-of-passengers,#registration-number,#color,#daily-rate,#monthly-rate,#daily-free-mileage,#monthly-free-mileage,#price-for-extra-km,#mileage-after-last-maintenance,#loss-damage-waiver").css("border", "1px solid #ced4da");
                                                $("#brand,#Number-of-passengers,#registration-number,#color,#daily-rate,#monthly-rate,#daily-free-mileage,#monthly-free-mileage,#price-for-extra-km,#mileage-after-last-maintenance,#loss-damage-waiver").val("");
                                            } else {
                                                $("#loss-damage-waiver").css("border", "2px solid red");
                                            }
                                        } else {
                                            $("#mileage-after-last-maintenance").css("border", "2px solid red");
                                        }
                                    } else {
                                        $("#price-for-extra-km").css("border", "2px solid red");
                                    }
                                } else {
                                    $("#monthly-free-mileage").css("border", "2px solid red");
                                }
                            } else {
                                $("#daily-free-mileage").css("border", "2px solid red");
                            }
                        } else {
                            $("#monthly-rate").css("border", "2px solid red");
                        }
                    } else {
                        $("#daily-rate").css("border", "2px solid red");
                    }
                } else {
                    $("#color").css("border", "2px solid red");
                }
            } else {
                $("#registration-number").css("border", "2px solid red");
            }
        } else {
            $("#Number-of-passengers").css("border", "2px solid red");
        }
    } else {
        $("#brand").css("border", "2px solid red");
    }
})

function saveCar() {
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
            alert(rep.responseJSON.message);
            getAllCars()
            loadCarsForTable();
        }
    })
}

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
    if (MESSAGE.test(msg)) {
        $.ajax({
            url: base_url + "request",
            method: "put",
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function (rep) {
                alert(rep.message);
                getAllRequests();
                $("#message-request").val("");
            },
            error: function (rep) {

            }
        })
    } else {
        $("#message-request").css("border", "2px solid red")
    }
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
    if (MESSAGE.test(msg)) {
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
                    $("#message-request").css("border", "1px solid #ced4da");
                    $("#message-request").val("");
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
                    $("#message-request").css("border", "1px solid #ced4da");
                    $("#message-request").val("");
                },
                error: function (rep) {

                }
            })
        }
    } else {
        $("#message-request").css("border", "2px solid red");
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

let pendingPayments = [];
let pendingPaymentsCar;
let pendingPaymentID;
let pendingPaymentCarRegistration_number;

function getAllPendingPaymentRequest() {
    $.ajax({
        url: base_url + "request",
        method: "get",
        async: false,
        success: function (rep) {
            pendingPayments = rep.data;
            $("#payment-request-id").empty();
            for (let i in rep.data) {
                let id = rep.data[i].rental_id;
                let option = `<option value="${id}">${id}</option>`;
                $("#payment-request-id").append(option);

                let row = `<tr>
                            <td>${rep.data[i].rental_id}</td>
                            <td>${rep.data[i].request_id}</td>
                            <td>${rep.data[i].nic}</td>
                            <td>${rep.data[i].registration_number}</td>
                        </tr>`
                $("#payment-table-body").append(row);
            }
        }
    })
}

$("#payment-request-id").click(function () {
    let rental_id = $("#payment-request-id").val();
    let payment = searchPendingPayment(rental_id);
    $("#payment-nic").val(payment.nic);
    $("#payment-registration-number").val(payment.registration_number);
    pendingPaymentsCar = searchCarByRegistrationNumber(payment.registration_number)[0];
    $("#fee-for-extra-mileage").val(pendingPaymentsCar.price_for_extra_km);
    $("#car-fee").val(pendingPaymentsCar.price_for_day);
    pendingPaymentCarRegistration_number = payment.registration_number;
});

function searchPendingPayment(rental_id) {
    for (let i in pendingPayments) {
        if (pendingPayments[i].rental_id === rental_id) {
            pendingPaymentID = pendingPayments[i].payment_id;
            return pendingPayments[i];
        }
    }
}

let previousValueNumberOfDays = 0;
let previousValueExtraMileage = 0;
let previousValueLossDamage = 0;
let previousValueDriverFee = 0;
$("#number-of-days").on("input", function () {
    $("#number-of-days,#payment-request-id").css("border", "1px solid #ced4da");
    let currentValueNumberOfDays = $("#number-of-days").val();
    if ($("#payment-nic").val() !== "") {
        if (INT.test(currentValueNumberOfDays)) {
            $("#total").val((pendingPaymentsCar.price_for_day * Number(currentValueNumberOfDays)) - (pendingPaymentsCar.price_for_day * Number(previousValueNumberOfDays)) + Number($("#total").val()));
            previousValueNumberOfDays = currentValueNumberOfDays;
        } else {
            $("#number-of-days").css("border", "1px solid red");
        }
    } else {
        $("#payment-request-id").css("border", "1px solid red");
    }
});

$("#extra-mileage").on("input", function () {
    $("#extra-mileage,#payment-request-id").css("border", "1px solid #ced4da");
    let currentValueExtraMileage = $("#extra-mileage").val();
    if ($("#payment-nic").val() !== "") {
        if (INT.test(currentValueExtraMileage)) {
            $("#total").val((pendingPaymentsCar.price_for_extra_km * Number(currentValueExtraMileage)) - (pendingPaymentsCar.price_for_extra_km * Number(previousValueExtraMileage)) + Number($("#total").val()));
            previousValueExtraMileage = currentValueExtraMileage;
        } else {
            $("#extra-mileage").css("border", "1px solid red");
        }
    } else {
        $("#payment-request-id").css("border", "1px solid red");
    }


});

$("#driver-fee").on("input", function () {
    $("#driver-fee,#payment-request-id").css("border", "1px solid #ced4da");
    let currentValueDriverFee = $("#driver-fee").val();
    if ($("#payment-nic").val() !== "") {
        if (PRICES.test(currentValueDriverFee)) {
            $("#total").val((Number(currentValueDriverFee) - Number(previousValueDriverFee)) + Number($("#total").val()));
            previousValueDriverFee = currentValueDriverFee;
        } else {
            $("#driver-fee").css("border", "1px solid red");
        }
    } else {
        $("#payment-request-id").css("border", "1px solid red");
    }

});

$("#loss-damage").on("input", function () {
    $("#loss-damage,#payment-request-id").css("border", "1px solid #ced4da");
    let currentValueLossDamage = $("#loss-damage").val();
    if ($("#payment-nic").val() !== "") {
        if (PRICES.test(currentValueLossDamage)) {
            $("#total").val((Number(currentValueLossDamage) - Number(previousValueLossDamage)) + Number($("#total").val()));
            previousValueLossDamage = currentValueLossDamage;
        } else {
            $("#loss-damage").css("border", "1px solid red");
        }
    } else {
        $("#payment-request-id").css("border", "1px solid red");
    }
});

/*payment update function*/
$("#pay-btn").click(function () {
    let thisRentalMiles = (Number($("#number-of-days").val()) * pendingPaymentsCar.free_mileage_for_day) + Number($("#extra-mileage").val());

    let data = {
        "payment_id": pendingPaymentID,
        "car_fee": $("#car-fee").val(),
        "days": $("#number-of-days").val(),
        "driver_fee": $("#driver-fee").val(),
        "loss_damage": $("#loss-damage").val(),
        "mileage": $("#extra-mileage").val(),
        "payment_date": $('#date-of-payment').val(),
        "payment_time": $('#time-of-payment').val(),
        "payment_type": $('#payment-method').val(),
        "status": "paid",
    }
    $.ajax({
        url: base_url + "payment?thisRentalMiles=" + thisRentalMiles + "&registration_number=" + pendingPaymentCarRegistration_number,
        method: "put",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (rep) {
            alert(rep.message);
        }
    })
})

/*Get all payments from last year*/

let last_year = (year - 1) + "-" + month + "-" + day;

function getAllPaymentFromLastYear() {
    $.ajax({
        url: base_url + "payment?lastYear=" + last_year,
        method: "get",
        success: function (rep) {
            $("#baily-income-table-body,#weekly-income-table-body,#monthly-income-table-body,#yearly-income-table-body").empty();
            console.log(rep.data)

            const currentDate = new Date();

            const sevenDaysAgo = new Date(currentDate);
            sevenDaysAgo.setDate(currentDate.getDate() - 7);

            const oneMonthAgo = new Date(currentDate);
            oneMonthAgo.setMonth(currentDate.getMonth() - 1);


            const currentDateStr = formatDate(currentDate);
            const sevenDaysAgoStr = formatDate(sevenDaysAgo);
            const oneMonthAgoStr = formatDate(oneMonthAgo);

            for (let i in rep.data) {
                let payment = rep.data[i];
                let row = `<tr>
                            <td>${payment.payment_id}</td>
                            <td>${payment.days}</td>
                            <td>${payment.driver_fee}</td>
                            <td>${payment.mileage}</td>
                            <td>${payment.car_fee}</td>
                            <td>${payment.total}</td>
                        </tr>`

                let paidDay = new Date(payment.payment_date);
                let today = new Date(currentDateStr);
                let lastWeek = new Date(sevenDaysAgoStr);
                let lastMonth = new Date(oneMonthAgoStr);

                if (paidDay === today) {
                    $("#baily-income-table-body,#weekly-income-table-body,#monthly-income-table-body,#yearly-income-table-body").append(row);
                } else if (paidDay >= lastWeek) {
                    $("#weekly-income-table-body,#monthly-income-table-body,#yearly-income-table-body").append(row);
                } else if (paidDay >= lastMonth) {
                    $("#monthly-income-table-body,#yearly-income-table-body").append(row);
                } else {
                    $("#yearly-income-table-body").append(row);
                }

                $("#payment-table-body").append(row);
            }
        },
        error: function (rep) {

        }
    })
}

const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

$("#home-btn").css("backgroundColor", "white");
$("#logout-btn").css("backgroundColor", "white");
$("#manage-cars-btn").css("backgroundColor", "white");
$("#manage-drivers-btn").css("backgroundColor", "white");
$("#rental-request-btn").css("backgroundColor", "white");
$("#payments-btn").css("backgroundColor", "white");
$("#income-btn").css("backgroundColor", "white");
$("#manage-customer-btn").css("backgroundColor", "white");

$("#income-btn").click(function () {
    $("#dashboard").css("display", "none");
    $("#cars-section").css("display", "none");
    $("#drivers-section").css("display", "none");
    $("#cars-rental-request").css("display", "none");
    $("#payment-section").css("display", "none");
    $("#customer-section").css("display", "none");
    $("#income-section").css("display", "flex");

    $("#manage-customer-btn").css("backgroundColor", "white");
    $("#dashboard-btn").css("backgroundColor", "#b3bdff");
    $("#manage-cars-btn").css("backgroundColor", "white");
    $("#manage-drivers-btn").css("backgroundColor", "white");
    $("#rental-request-btn").css("backgroundColor", "white");
    $("#payments-btn").css("backgroundColor", "white");

    getAllPaymentFromLastYear();

});
$("#dashboard-btn").click(function () {
    $("#dashboard").css("display", "flex");
    $("#cars-section").css("display", "none");
    $("#drivers-section").css("display", "none");
    $("#cars-rental-request").css("display", "none");
    $("#payment-section").css("display", "none");
    $("#customer-section").css("display", "none");
    $("#income-section").css("display", "none");


    $("#manage-customer-btn").css("backgroundColor", "white");
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

$("#manage-customer-btn").click(function () {
    getAllCustomers();
    $("#dashboard").css("display", "none");
    $("#cars-section").css("display", "none");
    $("#drivers-section").css("display", "none");
    $("#cars-rental-request").css("display", "none");
    $("#payment-section").css("display", "none");
    $("#customer-section").css("display", "flex");
    $("#income-section").css("display", "none");


    $("#manage-customer-btn").css("backgroundColor", "#b3bdff");
    $("#dashboard-btn").css("backgroundColor", "white");
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
    $("#customer-section").css("display", "none");
    $("#income-section").css("display", "none");


    $("#manage-customer-btn").css("backgroundColor", "white");
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
    $("#customer-section").css("display", "none");
    $("#income-section").css("display", "none");


    $("#manage-customer-btn").css("backgroundColor", "white");
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
    $("#customer-section").css("display", "none");
    $("#income-section").css("display", "none");


    $("#manage-customer-btn").css("backgroundColor", "white");
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
    $("#customer-section").css("display", "none");
    $("#income-section").css("display", "none");


    $("#manage-customer-btn").css("backgroundColor", "white");
    $("#dashboard-btn").css("backgroundColor", "white");
    $("#manage-cars-btn").css("backgroundColor", "white");
    $("#manage-drivers-btn").css("backgroundColor", "white");
    $("#rental-request-btn").css("backgroundColor", "white");
    $("#payments-btn").css("backgroundColor", "#b3bdff");
    getAllPendingPaymentRequest();
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let formattedDate = year + "-" + month.toString().padStart(2, "0") + "-" + day.toString().padStart(2, "0");
    let formattedTime = hour.toString().padStart(2, "0") + ":" + minute.toString().padStart(2, "0");
    $('#date-of-payment').val(formattedDate);
    $('#time-of-payment').val(formattedTime);
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

