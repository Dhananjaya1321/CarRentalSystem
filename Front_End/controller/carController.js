let cars = [];

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
        let car=cars[i];
        let front_img="../../CarRentalSystem/Back_End/src/main/resources/files/cars/"+car.front_image;
        let side_img="../../../CarRentalSystem/Back_End/src/main/resources/files/cars/"+car.back_image;
        let back_img="../../../CarRentalSystem/Back_End/src/main/resources/files/cars/"+car.side_image;
        let interior_img="../../../CarRentalSystem/Back_End/src/main/resources/files/cars/"+car.interior_image;
        console.log(front_img);
        let item=`<div class="display-car flex f-col">
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
                  </div> `
        $("#rental-display-section").append(item);
    }
}