let cars = [];
$(document).ready(function () {
    getCarDetails();
    loadCarBrands();
    loadCarDailyRates();
    loadCarMonthlyRates();
    manageSingInAndSignUpButton();
});

function manageSingInAndSignUpButton() {
    if (usernameForContinue==="logout" || passwordForContinue==="logout"){
        $("#navbar-sign-up").css("display","block");
        $("#navbar-sign-in").css("display","block");
        $("#profile-btn").css("display","none");
    }else {
        $("#navbar-sign-up").css("display","none");
        $("#navbar-sign-in").css("display","none");
        $("#profile-btn").css("display","flex");

    }
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
        },
        error: function (rep) {

        }
    })
}

function loadCarsForHomePage() {
    getAllCars();
    console.log(cars)

    $("#rental-display-section").empty();
    for (let i in cars) {
        console.log("hi")
        let car = cars[i];
        let front_img = "../../../CarRentalSystem/Back_End/src/main/resources/files/cars/" + car.front_image;
        let side_img = "../../../CarRentalSystem/Back_End/src/main/resources/files/cars/" + car.back_image;
        let back_img = "../../../CarRentalSystem/Back_End/src/main/resources/files/cars/" + car.side_image;
        let interior_img = "../../../CarRentalSystem/Back_End/src/main/resources/files/cars/" + car.interior_image;
        let item = `<div class="flex f-col">
                      <a class="display-car flex f-col" style="text-decoration: none; color: black" href="#">
                        <div>
                            <div id="car-${car.registration_number}" class="carousel slide carousel-fade">
                                <div class="carousel-inner">
                                    <div class="carousel-item active" data-bs-interval="2000">
                                        <div class="d-block w-100" style="background-position: center; background: url(${front_img}); background-size: cover;"></div>
                                    </div>
                                    <div class="carousel-item" data-bs-interval="2000">
                                        <div class="d-block w-100" style="background-position: center; background: url(${back_img}); background-size: cover;"></div>
                                    </div>
                                    <div class="carousel-item" data-bs-interval="2000">
                                        <div class="d-block w-100" style="background-position: center; background: url(${side_img}); background-size: cover;"></div>
                                    </div>
                                    <div class="carousel-item" data-bs-interval="2000">
                                        <div class="d-block w-100" style="background-position: center; background: url(${interior_img}); background-size: cover;"></div>
                                    </div>
                                </div>
                                <button class="carousel-control-prev" type="button" data-bs-target="#car-${car.registration_number}"
                                        data-bs-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Previous</span>
                                </button>
                                <button class="carousel-control-next" type="button" data-bs-target="#car-${car.registration_number}"
                                        data-bs-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div><!--car images slider-->
                        <div class="car-type ${car.type}-bach flex">
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
                      </a> 
                  </div> `
        $("#rental-display-section").append(item);
    }
    // getCarDetails();
}

function getCarDetails() {
    $("#rental-display-section>div").click(function () {
        let registration_number = $(this).find(".display-car>div:nth-child(1)>div").attr("id").substring(4);

        let car = searchCarByRegistrationNumber(registration_number)[0];
        let front_img = "../../CarRentalSystem/Back_End/src/main/resources/files/cars/" + car.front_image;
        let side_img = "../../../CarRentalSystem/Back_End/src/main/resources/files/cars/" + car.back_image;
        let back_img = "../../../CarRentalSystem/Back_End/src/main/resources/files/cars/" + car.side_image;
        let interior_img = "../../../CarRentalSystem/Back_End/src/main/resources/files/cars/" + car.interior_image;
        let item = `
                <div id="img-slider">
                     <div id="car-${car.registration_number}" class="carousel slide carousel-fade">
                        <div class="carousel-inner">
                            <div class="carousel-item active" data-bs-interval="10000">
                                <div class="d-block w-100"  style="background-position: center; background: url(${front_img}); background-size: cover;"></div>
                            </div>
                            <div class="carousel-item" data-bs-interval="2000">
                                <div class="d-block w-100"  style="background-position: center; background: url(${side_img}); background-size: cover;"></div>
                            </div>
                            <div class="carousel-item">
                                <div class="d-block w-100"  style="background-position: center; background: url(${back_img}); background-size: cover;"></div>
                            </div>
                            <div class="carousel-item">
                                <div class="d-block w-100"  style="background-position: center; background: url(${interior_img}); background-size: cover;"></div>
                            </div>
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#car-${car.registration_number}"
                                data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#car-${car.registration_number}"
                                data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                </div><!--image slider-->
                <div id="details" class="flex f-col">
                    <div><h1 id="car-name">${car.brand}</h1></div><!--car name (brand)-->
                    <div id="rate" class="flex f-row">
                        <div id="daily-rate" class="flex f-col">
                            <h3>Daily Rate : Rs. <span id="price-for-day">${car.price_for_day}</span></h3>
                            <h3>Free KM for a day : <span id="km-for-day">${car.free_mileage_for_day}</span>KM</h3>
                        </div><!--daily rate-->
                        <div id="horizontal-line"></div>
                        <div id="monthly-rate" class="flex f-col">
                            <h3>Monthly Rate : Rs. <span id="price-for-month">${car.price_for_month}</span></h3>
                            <h3>Free KM for a month : <span id="km-for-month">${car.free_mileage_for_month}</span>KM</h3>
                        </div><!--monthly rate-->
                    </div>
                    <div class="other-details flex f-col">
                        <h3>Price per Extra KM : Rs. <span id="extra-km-price">${car.price_for_extra_km}</span></h3>
                        <div class="flex f-row ">
                            <div class="flex f-col">
                                <div class="flex flex-row"><h3>Number of passengers : <span id="seat-count">${car.number_of_passengers}</span></h3></div>
                                <!--seat count-->
                                <div class="flex flex-row"><h3>Registration number : <span id="registration-number">${car.registration_number}</span>
                                </h3></div>
                                <div class="flex flex-row"><h3>Transmission type : <span id="transmission-type">${car.transmission_type}</span></h3>
                                </div>
                                <!--(Manual, Auto)-->
                            </div>
                            <div class="flex f-col">
                                <div class="flex flex-row"><h3>Colo : <span id="color">${car.color}</span></h3></div>
                                <div class="flex flex-row"><h3>Fuel Type : <span id="fuel-type">${car.fuel_type}</span></h3></div>
                                <!--(Diesel, Petrol)-->
                            </div>
                        </div>
                    </div><!--other details-->
                    <p>This car is a <span id="car-type-loss-damage">${car.type}</span>car and before you can rent it first you need
                        to make a damage waiver payment of Rs. <span id="loss-damage">${car.loss}</span> to our bank account details
                        and upload the bank slip or bank confirmation in the reserved field in the rental view.
                        <br><br>
                        After you return the car, a brief inspection will be carried out on the car and if the car is
                        damaged or damaged, an appropriate amount will be deducted from the damage waiver payment and
                        the balance will be returned to you.
                        <br><br>
                        If the vehicle is not damaged, the damage waiver will be passed entirely to you.
                        <br><br>
                        Defects and malfunctions in the car's engine are not counted when making deductions from the Loss Damage
                        Waiver.
                    </p>
                </div><!--details-->`
        $("#item-details-section").append(item);
        $("#item-main").css("display", "flex");
        $("#home-main").css("display", "none");
        $("body>header").css("display", "none");
    })
}

function loadFindCars(car) {
    let front_img = "../../CarRentalSystem/Back_End/src/main/resources/files/cars/" + car.front_image;
    let side_img = "../../../CarRentalSystem/Back_End/src/main/resources/files/cars/" + car.back_image;
    let back_img = "../../../CarRentalSystem/Back_End/src/main/resources/files/cars/" + car.side_image;
    let interior_img = "../../../CarRentalSystem/Back_End/src/main/resources/files/cars/" + car.interior_image;
    let item = `<div class="flex f-col">
                      <a class="display-car flex f-col" style="text-decoration: none; color: black" href="#">
                        <div>
                            <div id="car-${car.registration_number}" class="carousel slide carousel-fade">
                                <div class="carousel-inner">
                                    <div class="carousel-item active" data-bs-interval="2000">
                                        <div class="d-block w-100" style="background-position: center; background: url(${front_img}); background-size: cover;"></div>
                                    </div>
                                    <div class="carousel-item" data-bs-interval="2000">
                                        <div class="d-block w-100" style="background-position: center; background: url(${back_img}); background-size: cover;"></div>
                                    </div>
                                    <div class="carousel-item" data-bs-interval="2000">
                                        <div class="d-block w-100" style="background-position: center; background: url(${side_img}); background-size: cover;"></div>
                                    </div>
                                    <div class="carousel-item" data-bs-interval="2000">
                                        <div class="d-block w-100" style="background-position: center; background: url(${interior_img}); background-size: cover;"></div>
                                    </div>
                                </div>
                                <button class="carousel-control-prev" type="button" data-bs-target="#car-${car.registration_number}"
                                        data-bs-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Previous</span>
                                </button>
                                <button class="carousel-control-next" type="button" data-bs-target="#car-${car.registration_number}"
                                        data-bs-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div><!--car images slider-->
                        <div class="car-type ${car.type}-bach flex">
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
                      </a> 
                  </div> `
    $("#rental-display-section").append(item);
    getCarDetails();
}

function searchCars() {
    getAllCars();
    $("#rental-display-section").empty();

    let passengers = $("#search-no-of-passengers").val();
    let transmission_type = $("#search-transmission-type").val();
    let brand = $("#search-brand").val();
    let type = $("#search-type").val();
    let fuel_type = $("#search-fuel-type").val();
    let daily_price = $("#search-daily-price").val();
    let monthly_price = $("#search-monthly-price").val();

    for (let i in cars) {
        let car = cars[i];
        if (passengers !== "all" && transmission_type === "all" && brand === "all" && type === "all" && fuel_type === "all" && daily_price === "all" && monthly_price === "all") {
            if (car.number_of_passengers === Number(passengers)) {
                loadFindCars(car);
            }
        } else if (passengers !== "all" && transmission_type !== "all" && brand === "all" && type === "all" && fuel_type === "all" && daily_price === "all" && monthly_price === "all") {
            if (car.number_of_passengers === Number(passengers) && car.transmission_type === transmission_type) {
                loadFindCars(car);
            }
        } else if (passengers !== "all" && transmission_type !== "all" && brand !== "all" && type === "all" && fuel_type === "all" && daily_price === "all" && monthly_price === "all") {
            if (car.number_of_passengers === Number(passengers) && car.transmission_type === transmission_type && car.brand === brand) {
                loadFindCars(car);
            }
        } else if (passengers !== "all" && transmission_type !== "all" && brand !== "all" && type !== "all" && fuel_type === "all" && daily_price === "all" && monthly_price === "all") {
            if (car.number_of_passengers === Number(passengers) && car.transmission_type === transmission_type && car.brand === brand && car.type === type) {
                loadFindCars(car);
            }
        } else if (passengers !== "all" && transmission_type !== "all" && brand !== "all" && type !== "all" && fuel_type !== "all" && daily_price === "all" && monthly_price === "all") {
            if (car.number_of_passengers === Number(passengers) && car.transmission_type === transmission_type && car.brand === brand && car.type === type && car.fuel_type === fuel_type) {
                loadFindCars(car);
            }
        } else if (passengers !== "all" && transmission_type !== "all" && brand !== "all" && type !== "all" && fuel_type !== "all" && daily_price !== "all" && monthly_price === "all") {
            if (car.number_of_passengers === Number(passengers) && car.transmission_type === transmission_type && car.brand === brand && car.type === type && car.fuel_type === fuel_type && car.price_for_day === Number(daily_price)) {
                loadFindCars(car);
            }
        } else if (passengers !== "all" && transmission_type !== "all" && brand !== "all" && type !== "all" && fuel_type !== "all" && daily_price !== "all" && monthly_price !== "all") {
            if (car.number_of_passengers === Number(passengers) && car.transmission_type === transmission_type && car.brand === brand && car.type === type && car.fuel_type === fuel_type && car.price_for_day === Number(daily_price) && car.price_for_month === Number(monthly_price)) {
                loadFindCars(car);
            }
            /*1*/
        } else if (passengers === "all" && transmission_type !== "all" && brand === "all" && type === "all" && fuel_type === "all" && daily_price === "all" && monthly_price === "all") {
            if (car.transmission_type === transmission_type) {
                loadFindCars(car);
            }
        } else if (passengers === "all" && transmission_type !== "all" && brand !== "all" && type === "all" && fuel_type === "all" && daily_price === "all" && monthly_price === "all") {
            if (car.transmission_type === transmission_type && car.brand === brand) {
                loadFindCars(car);
            }
        } else if (passengers === "all" && transmission_type !== "all" && brand !== "all" && type !== "all" && fuel_type === "all" && daily_price === "all" && monthly_price === "all") {
            if (car.transmission_type === transmission_type && car.brand === brand && car.type === type) {
                loadFindCars(car);
            }
        } else if (passengers === "all" && transmission_type !== "all" && brand !== "all" && type !== "all" && fuel_type !== "all" && daily_price === "all" && monthly_price === "all") {
            if (car.transmission_type === transmission_type && car.brand === brand && car.type === type && car.fuel_type === fuel_type) {
                loadFindCars(car);
            }
        } else if (passengers === "all" && transmission_type !== "all" && brand !== "all" && type !== "all" && fuel_type !== "all" && daily_price !== "all" && monthly_price === "all") {
            if (car.transmission_type === transmission_type && car.brand === brand && car.type === type && car.fuel_type === fuel_type && car.price_for_day === Number(daily_price)) {
                loadFindCars(car);
            }
        } else if (passengers === "all" && transmission_type !== "all" && brand !== "all" && type !== "all" && fuel_type !== "all" && daily_price !== "all" && monthly_price !== "all") {
            if (car.transmission_type === transmission_type && car.brand === brand && car.type === type && car.fuel_type === fuel_type && car.price_for_day === Number(daily_price) && car.price_for_month === Number(monthly_price)) {
                loadFindCars(car);
            }
            /*2*/
        } else if (passengers === "all" && transmission_type === "all" && brand !== "all" && type === "all" && fuel_type === "all" && daily_price === "all" && monthly_price === "all") {
            if (car.brand === brand) {
                loadFindCars(car);
            }
        } else if (passengers === "all" && transmission_type === "all" && brand !== "all" && type !== "all" && fuel_type === "all" && daily_price === "all" && monthly_price === "all") {
            if (car.brand === brand && car.type === type) {
                loadFindCars(car);
            }
        } else if (passengers === "all" && transmission_type === "all" && brand !== "all" && type !== "all" && fuel_type !== "all" && daily_price === "all" && monthly_price === "all") {
            if (car.brand === brand && car.type === type && car.fuel_type === fuel_type) {
                loadFindCars(car);
            }
        } else if (passengers === "all" && transmission_type === "all" && brand !== "all" && type !== "all" && fuel_type !== "all" && daily_price !== "all" && monthly_price === "all") {
            if (car.brand === brand && car.type === type && car.fuel_type === fuel_type && car.price_for_day === Number(daily_price)) {
                loadFindCars(car);
            }
        } else if (passengers === "all" && transmission_type === "all" && brand !== "all" && type !== "all" && fuel_type !== "all" && daily_price !== "all" && monthly_price !== "all") {
            if (car.brand === brand && car.type === type && car.fuel_type === fuel_type && car.price_for_day === Number(daily_price) && car.price_for_month === Number(monthly_price)) {
                loadFindCars(car);
            }
            /*3*/
        } else if (passengers === "all" && transmission_type === "all" && brand === "all" && type !== "all" && fuel_type === "all" && daily_price === "all" && monthly_price === "all") {
            if (car.type === type) {
                loadFindCars(car);
            }
        } else if (passengers === "all" && transmission_type === "all" && brand === "all" && type !== "all" && fuel_type !== "all" && daily_price === "all" && monthly_price === "all") {
            if (car.type === type && car.fuel_type === fuel_type) {
                loadFindCars(car);
            }
        } else if (passengers === "all" && transmission_type === "all" && brand === "all" && type !== "all" && fuel_type !== "all" && daily_price !== "all" && monthly_price === "all") {
            if (car.type === type && car.fuel_type === fuel_type && car.price_for_day === Number(daily_price)) {
                loadFindCars(car);
            }
        } else if (passengers === "all" && transmission_type === "all" && brand === "all" && type !== "all" && fuel_type !== "all" && daily_price !== "all" && monthly_price === "all") {
            if (car.type === type && car.fuel_type === fuel_type && car.price_for_day === Number(daily_price) && car.price_for_month === Number(monthly_price)) {
                loadFindCars(car);
            }
            /*4*/
        } else if (passengers === "all" && transmission_type === "all" && brand === "all" && type === "all" && fuel_type !== "all" && daily_price === "all" && monthly_price === "all") {
            if (car.fuel_type === fuel_type) {
                loadFindCars(car);
            }
        } else if (passengers === "all" && transmission_type === "all" && brand === "all" && type === "all" && fuel_type !== "all" && daily_price !== "all" && monthly_price === "all") {
            if (car.fuel_type === fuel_type && car.price_for_day === Number(daily_price)) {
                loadFindCars(car);
            }
        } else if (passengers === "all" && transmission_type === "all" && brand === "all" && type === "all" && fuel_type !== "all" && daily_price !== "all" && monthly_price !== "all") {
            if (car.fuel_type === fuel_type && car.price_for_day === Number(daily_price) && car.price_for_month === Number(monthly_price)) {
                loadFindCars(car);
            }
            /*5*/
        } else if (passengers === "all" && transmission_type === "all" && brand === "all" && type === "all" && fuel_type === "all" && daily_price !== "all" && monthly_price === "all") {
            if (car.price_for_day === Number(daily_price)) {
                loadFindCars(car);
            }
        } else if (passengers === "all" && transmission_type === "all" && brand === "all" && type === "all" && fuel_type === "all" && daily_price !== "all" && monthly_price !== "all") {
            if (car.price_for_day === Number(daily_price) && car.price_for_month === Number(monthly_price)) {
                loadFindCars(car);
            }
            /*6*/
        } else if (passengers === "all" && transmission_type === "all" && brand === "all" && type === "all" && fuel_type === "all" && daily_price === "all" && monthly_price !== "all") {
            if (car.price_for_month === Number(monthly_price)) {
                loadFindCars(car);
            }
        } else {
            loadCarsForHomePage()
        }
    }
}

$("#search-btn").click(function () {
    searchCars();
})

function loadCarBrands() {
    let brands = [];
    $.ajax({
        url: base_url + "car/brands",
        method: "get",
        async: false,
        success: function (rep) {
            brands = rep.data;
            for (let i in brands) {
                let brand = brands[i];
                let option = ` <option value="${brand}">${brand}</option>`
                $("#search-brand").append(option);
            }
        },
    })
}

function loadCarDailyRates() {
    let prices = [];
    $.ajax({
        url: base_url + "car/daily/rates",
        method: "get",
        async: false,
        success: function (rep) {
            prices = rep.data;
            for (let i in prices) {
                let price = prices[i];
                let option = `<option value="${price}">${price}</option>`
                $("#search-daily-price").append(option);
            }
        },
    })
}

function loadCarMonthlyRates() {
    let prices = [];
    $.ajax({
        url: base_url + "car/monthly/rates",
        method: "get",
        async: false,
        success: function (rep) {
            prices = rep.data;
            for (let i in prices) {
                let price = prices[i];
                let option = `<option value="${price}">${price}</option>`
                $("#search-monthly-price").append(option);
            }
        },
    })
}