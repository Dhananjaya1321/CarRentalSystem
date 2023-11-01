$("#reservation-btn").click(function () {
    saveRental();
})

let cartItems=[];

$("#add-cart").click(function () {
    console.log("00");
    let registration_number = $("#registration-number").text();
    let x=0;
    for (let i in cartItems) {
        if (cartItems[i]===registration_number){
            x=1;
        }
    }
    if (x===0){
        cartItems.push(registration_number);
    }
})

function loadAllCartItemsToCartSection() {
    getAllCars();
    $("#cart-item-display-section").empty();
    for (let i in cartItems) {
        let cart_item=cartItems[i];
        for (let j in cars) {
            if (cars[j].registration_number===cart_item){
                let side_img = "../../../CarRentalSystem/Back_End/src/main/resources/files/cars/" + cars[j].back_image;
                let item=`<div class="flex f-row">
                                <div class="flex f-row col-2">
                                    <div style="background-position: center; background: url(${side_img}); background-size: cover;" class="cart-item-img"></div>
                                </div>
                                <div class="flex f-row col-8">
                                    <p style="margin: 0">
                                        Type : ${cars[j].type} | Brand : ${cars[j].brand} | Color : ${cars[j].color} |
                                        <i class="fa-solid fa-user"></i> <span>${cars[j].number_of_passengers}</span> |
                                        <i class="fa-solid fa-gear"></i> <span>${cars[j].transmission_type}</span> |
                                        <i class="fa-solid fa-gas-pump"></i> <span>${cars[j].fuel_type}</span> |
                                    </p>
                                </div>
                              
                                <div class="flex f-row col-2">
                                    <button value="${cars[j].registration_number}" class="cart-item-delete-btn">
                                        <i class="fa-solid fa-trash-can" style="color: #ff0000;"></i>
                                    </button>
                                </div>
                          </div>`
                $("#cart-item-display-section").append(item);
            }
        }
    }
    deleteCartItem();
}
function deleteCartItem() {
    $("#cart-item-display-section > div >div> button").click(function () {
        let registration_number = $(this).attr("value");
        console.log(registration_number);
        for (let i in cartItems) {
            if (registration_number===cartItems[i]){
                cartItems.splice(i, 1);
            }
        }
        loadAllCartItemsToCartSection();
    })
}
$("#clear-cart-btn").click(function () {
    cartItems=[];
    loadAllCartItemsToCartSection();
})
$("#cart-reservation-btn").click(function () {
    let rental_id = generateNextRentalID(getLastRentalID());
    let nic = getCustomerNIC();
    let pickUpDate = $("#cart-pick-up-date").val();
    let pickUpTime = $("#cart-pick-up-time").val();
    let returnDate = $("#cart-return-date").val();
    let returnTime = $("#cart-return-time").val();
    let driverOrNot = $("#cart-driver-or-not").val();
    let location = $("#cart-location").val();
    let request_id = generateNextRequestID(getLastRequestID());
    let payment_id = generateNextPaymentID(getLastPaymentID());
    let requestIDArray=[];
    let paymentIDArray=[];
    let paymentDataArray=[];
    let rentalCarDetailsArray=[];
    let requestArray=[];
    requestIDArray.push(request_id);
    paymentIDArray.push(payment_id);
    for (let i = 0; i < cartItems.length-1; i++) {
        requestIDArray.push("REQ-00"+(Number(requestIDArray[requestIDArray.length-1].slice(6)) + 1));
        paymentIDArray.push("PAY-00"+(Number(paymentIDArray[paymentIDArray.length-1].slice(6)) + 1));
    }
   /* // console.log(requestIDArray)

    for (let i in cartItems) {
        let id="#img-"+cartItems[i];
        let file = $(id)[0].files[0];
        console.log(file)
    }*/

    for (let i = 0; i < cartItems.length; i++) {
        paymentDataArray.push({"payment_id": paymentIDArray[i],"days":0,"driver_fee":0,"loss_damage":0, "mileage":0,"status": "pending"});
        rentalCarDetailsArray.push({"rental_id": rental_id, "registration_number": cartItems[i]});
        requestArray.push(
            {
                "request_id": requestIDArray[i], "message": "", "status": "pending", "rental_id": rental_id,
                "car":{"registration_number": cartItems[i]},
                "payment":{"payment_id": paymentIDArray[i]}
            }
        );
    }

    let data = {
        "rental_id": rental_id,
        "driver_or_not": driverOrNot,
        "location": location,
        "pick_up_date": pickUpDate,
        "pick_up_time": pickUpTime,
        "return_date": returnDate,
        "return_time": returnTime,
        "customer": {"nic": nic},
        "rentalCarDetails": rentalCarDetailsArray,
        "request": requestArray

    }
    $.ajax({
        url: base_url + "payment/cart",
        method: "post",
        contentType: "application/json",
        data: JSON.stringify(paymentDataArray),
        success:function (rep) {

        }
    });
})





function saveRental() {
    if (findUser(usernameForContinue)) {
        let rental_id = generateNextRentalID(getLastRentalID());
        let nic = getCustomerNIC();
        let pickUpDate = $("#pick-up-date").val();
        let pickUpTime = $("#pick-up-time").val();
        let returnDate = $("#return-date").val();
        let returnTime = $("#return-time").val();
        let driverOrNot = $("#driver-or-not").val();
        let location = $("#location").val();


        let request_id = generateNextRequestID(getLastRequestID());
        let registration_number = $("#registration-number").text();

        let payment_id = generateNextPaymentID(getLastPaymentID());
        let data = {"payment_id": payment_id,"days":0,"driver_fee":0,"loss_damage":0, "mileage":0,"status": "pending"}
        $.ajax({
            url: base_url + "payment",
            method: "post",
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function (rep) {
                let data = {
                    "rental_id": rental_id,
                    "driver_or_not": driverOrNot,
                    "location": location,
                    "pick_up_date": pickUpDate,
                    "pick_up_time": pickUpTime,
                    "return_date": returnDate,
                    "return_time": returnTime,
                    "customer": {"nic": nic},
                    "rentalCarDetails": [{"rental_id": rental_id, "registration_number": registration_number}],
                    "request": [
                        {
                            "request_id": request_id, "message": "", "status": "pending", "rental_id": rental_id,
                            "car":{"registration_number": registration_number},
                            "payment":{"payment_id": payment_id}
                        }
                    ]

                }

                data.schedule = [{"rental_id": rental_id,"registration_number": registration_number}];

                let formData = new FormData();
                formData.append("loss_damage_back_slip", $("#bank-slip")[0].files[0]);
                formData.append("dto", new Blob([JSON.stringify(data)], {type: "application/json"}));
                console.log(data)
                $.ajax({
                    url: base_url + "rental",
                    method: "post",
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function (rep) {
                        alert(rep.message);
                    },
                    error: function (rep) {
                        console.log(rep.data)
                    }
                })
            },
            error: function (rep) {

            }
        })

    }
}
function savePayment() {
    let data = {"payment_id": "PAY-001","days":0,"driver_fee":0,"loss_damage":0, "mileage":0,"status": "pending"}
    $.ajax({
        url: base_url + "payment",
        method: "post",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (rep) {

        }
    })
}


function getLastRequestID() {
    let last_id = null;
    $.ajax({
        url: base_url + "request/last_ID",
        method: "get",
        async: false,
        success: function (rep) {
            last_id = rep.data;
        }
    })
    return last_id;
}

function getLastRentalID() {
    let last_id = null;
    $.ajax({
        url: base_url + "rental/last_ID",
        method: "get",
        async: false,
        success: function (rep) {
            last_id = rep.data;
        }
    })
    return last_id;
}

function generateNextRequestID(lastRequestID) {
    if (lastRequestID === null) {
        return "REQ-001";
    } else {
        return "REQ-00" + (Number(lastRequestID.slice(6)) + 1);
    }
}

function generateNextRentalID(lastRentalID) {
    if (lastRentalID === null) {
        return "REN-001";
    } else {
        return "REN-00" + (Number(lastRentalID.slice(6)) + 1);
    }
}