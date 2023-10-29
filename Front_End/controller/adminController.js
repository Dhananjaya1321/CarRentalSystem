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
            alert("Car", rep.message);
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
            let driver=getDriverByDriverId(r.driver_id);
            $("#drivers-id-request").append(`<option selected value=${r.driver_id}>${r.driver_id}</option>`);
            for (let j in drivers) {
                if (drivers[j].driver_id!==r.driver_id){
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

$("#reject-request").click(function () {
    let request_id = $("#request-id").val();
    let msg = $("#message-request").val();
    let data={
        "request_id":request_id,
        "message":msg
    }
    $.ajax({
        url:base_url+"request",
        method:"put",
        contentType: "application/json",
        data:JSON.stringify(data),
        success:function (rep) {
            alert(rep.message);
        },
        error:function (rep){

        }
    })
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

