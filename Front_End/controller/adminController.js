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

function getAllRequests() {
    $.ajax({
        url: base_url + "request/pending",
        method: "get",
        async: false,
        success: function (rep) {
            $("#cars-rental-request-table-body").empty();
            let requests = rep.data;
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
}


