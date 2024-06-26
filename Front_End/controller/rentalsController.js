$(document).ready(function () {
    loadCarsForRentalPage();
});

function loadCarsForRentalPage() {
    getAllCars();

    $("#general-rental-display-section").empty();
    $("#luxury-rental-display-section").empty();
    $("#premium-rental-display-section").empty();
    for (let i in cars) {
        let car = cars[i];
        let front_img = "../../../CarRentalSystem/Back_End/src/main/resources/files/cars/" + car.front_image;
        let side_img = "../../../CarRentalSystem/Back_End/src/main/resources/files/cars/" + car.back_image;
        let back_img = "../../../CarRentalSystem/Back_End/src/main/resources/files/cars/" + car.side_image;
        let interior_img = "../../../CarRentalSystem/Back_End/src/main/resources/files/cars/" + car.interior_image;
        let item = `<div class="display-car flex f-col">
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
                        <div id="dody${car.registration_number}" class="details-div flex f-col">
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
                                <h3 style="align-self: center;">Price per Extra Km (Rs) <span>${car.price_for_extra_km}</span></h3>
                                <div class="flex f-row">
                                    <div style="margin-left:0;" class="flex flex-row"><i class="fa-solid fa-user"></i> <span>${car.number_of_passengers}</span></div>
                                    <!--seat count-->
                                    <div style="margin-left:0;" class="flex flex-row"><i class="fa-solid fa-gear"></i> <span>${car.transmission_type}</span></div>
                                    <!--(Manual, Auto)-->
                                    <div style="margin-left:0;" class="flex flex-row"><i class="fa-solid fa-gas-pump"></i> <span>${car.fuel_type}</span></div>
                                    <!--(Diesel, Petrol)-->
                                </div>
                            </div><!--other details-->
                        </div><!--car details-->
                  </div> `
        if (car.type === "general") {
            $("#general-rental-display-section").append(item);
        } else if (car.type === "luxury") {
            $("#luxury-rental-display-section").append(item);
        } else {
            $("#premium-rental-display-section").append(item);
        }
    }
    getCarDetailsForRentalsPage();
}

function getCarDetailsForRentalsPage() {
    $("#general-rental-display-section .display-car").click(function () {
        let registration_number = $(this).find(".details-div").attr("id").substring(4);
        $("#item-details-section").append(setItem(registration_number));
    })
    $("#luxury-rental-display-section .display-car").click(function () {
        let registration_number = $(this).find(".details-div").attr("id").substring(4);
        $("#item-details-section").append(setItem(registration_number));
    })
    $("#premium-rental-display-section .display-car").click(function () {
        let registration_number = $(this).find(".details-div").attr("id").substring(4);
        $("#item-details-section").append(setItem(registration_number));
    })
}

function setItem(registration_number) {
    let car = searchCarByRegistrationNumber(registration_number)[0];
    let front_img = "../../../CarRentalSystem/Back_End/src/main/resources/files/cars/" + car.front_image;
    let side_img = "../../../CarRentalSystem/Back_End/src/main/resources/files/cars/" + car.back_image;
    let back_img = "../../../CarRentalSystem/Back_End/src/main/resources/files/cars/" + car.side_image;
    let interior_img = "../../../CarRentalSystem/Back_End/src/main/resources/files/cars/" + car.interior_image;
    let item = `<div id="img-slider">
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
                    <div id="dody${car.registration_number}" class="details-div flex f-col">
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
                                <h3 style="align-self: center;">Price per Extra Km (Rs) <span>${car.price_for_extra_km}</span></h3>
                                <div class="flex f-row">
                                    <div style="margin-left:0;" class="flex flex-row"><i class="fa-solid fa-user"></i> <span>${car.number_of_passengers}</span></div>
                                    <!--seat count-->
                                    <div style="margin-left:0;" class="flex flex-row"><i class="fa-solid fa-gear"></i> <span>${car.transmission_type}</span></div>
                                    <!--(Manual, Auto)-->
                                    <div style="margin-left:0;" class="flex flex-row"><i class="fa-solid fa-gas-pump"></i> <span>${car.fuel_type}</span></div>
                                    <!--(Diesel, Petrol)-->
                                </div>
                            </div><!--other details-->
                        </div><!--car details-->
                    <p>This car is a <span id="car-type-loss-damage">${car.type}</span>car and before you can rent it first you need
                        to make a damage waiver payment of Rs. <span id="loss-damage">${car.loss_damage_waiver}</span> to our bank account details
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
    $("#rental-main").css("display", "none");
    $("#item-main").css("display", "flex");
    return item;
}

