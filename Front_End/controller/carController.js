let cars = [];

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
            if ((car.mileage_after_maintenance-car.mileage_before_maintenance)>=5000){
                $("#need-to-maintain-cars").css("display","flex");
                let row=`<tr>
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
            }else {
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
            $("#cars-under-maintenance").css("display","flex");
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
}

/*delete cars*/
function deleteCar() {
    $("#available-cars-table-body>tr>td>button:nth-child(1)").click(function () {
        if (confirm("Do you want to delete...!")){
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


/*get all cars*/
function getAllCars() {
    $.ajax({
        url: base_url + "car",
        method: "get",
        dataType: "JSON",
        async: false,
        success: function (rep) {
            cars = rep.data;
            console.log(rep)
            loadCarsForTable();
        },
        error: function (rep) {

        }
    })
}

/*function f() {
    $("#available-cars-table-body>tr>td>select").click(function () {
        /!*if (confirm("Do you want to delete...!")){
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
        }*!/
        console.log($(this).parents("#available-cars-table-body>tr>td>select").text())
    });
}*/

function loadCarsForHomePage() {
    getAllCars();
    console.log(cars)

    $("#rental-display-section").empty();
    for (let i in cars) {
        console.log("hi")

        let car=cars[0];
        let item=`<div class="display-car flex f-col">
                        <div>
                            <div id="car-1" class="carousel slide carousel-fade">
                                <div class="carousel-inner">
                                    <div class="carousel-item active" data-bs-interval="2000">
                                        <div class="d-block w-100"></div>
                                    </div>
                                    <div class="carousel-item" data-bs-interval="2000">
                                        <div class="d-block w-100"></div>
                                    </div>
                                    <div class="carousel-item">
                                        <div class="d-block w-100"></div>
                                    </div>
                                    <div class="carousel-item">
                                        <div class="d-block w-100"></div>
                                    </div>
                                </div>
                                <button class="carousel-control-prev" type="button" data-bs-target="#car-1"
                                        data-bs-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Previous</span>
                                </button>
                                <button class="carousel-control-next" type="button" data-bs-target="#car-1"
                                        data-bs-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div><!--car images slider-->
                        <div class="car-type general-bach flex">
                            <h2>${car.type}</h2>
                        </div><!--(ex mini, luxury)-->
                        <div class="flex f-col">
                            <div class="flex f-row">
                                <h2>${car.brand}</h2>
                                <div class="car-color"></div>
                            </div><!--brand-->
                            <div class="price-details flex f-row">
                                <div>
                                    <h3>Daily Rate (Rs.) <br><span>${car.price_for_day}</span></h3>
                                    <h3>Free KM for a day <br><span>${car.free_mileage_for_day}</span></h3>
                                </div><!--daily rate-->
                                <div class="horizontal-line"></div>
                                <div>
                                    <h3>Monthly Rate (Rs.) <br><span>${car.price_for_month}</span></h3>
                                    <h3>Free KM for a month <br><span>${car.free_mileage_for_month}</span></h3>
                                </div><!--monthly rate-->
                            </div><!--price details-->
                            <div class="other-details flex f-col">
                                <h3>Price per Extra Km (Rs) <span>${car.price_for_extra_km}</span></h3>
                                <div class="flex f-row f-wrap">
                                    <div class="flex flex-row"><i class="fa-solid fa-user"></i> <span>${car.number_of_passengers}</span></div>
                                    <!--seat count-->
                                    <div class="flex flex-row"><i class="fa-solid fa-gear"></i> <span>${car.transmission_type}</span></div>
                                    <!--(Manual, Auto)-->
                                    <div class="flex flex-row"><i class="fa-solid fa-gas-pump"></i> <span>${car.fuel_type}</span></div>
                                    <!--(Diesel, Petrol)-->
                                </div>
                            </div><!--other details-->
                        </div><!--car details-->
                  </div> `
        $("#rental-display-section").append(item);
    }
}
