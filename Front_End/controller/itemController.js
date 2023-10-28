$("#reservation-btn").click(function () {
    saveRental();
})

function saveRental() {
    if (findUser(usernameForContinue)) {
        let rental_id = generateNextRentalID(getLastRentalID());
        let request_id =generateNextRequestID(getLastRequestID());
        let pickUpDate = $("#pick-up-date").val();
        let pickUpTime = $("#pick-up-time").val();
        let returnDate = $("#return-date").val();
        let returnTime = $("#return-time").val();
        let driverOrNot = $("#driver-or-not").val();
        let location = $("#location").val();
        let bankSlip = $("#bank-slip").val();

        let registration_number = $("#registration-number").text();
        let nic = getCustomerNIC();
        let data = {
            "rental_id": rental_id,
            "driver_or_not": driverOrNot,
            "location": location,
            "loss_damage_back_slip": bankSlip,
            "pick_up_date": pickUpDate,
            "pick_up_time": pickUpTime,
            "return_date": returnDate,
            "return_time": returnTime,
            "customer": {"nic": nic},
            "rentalCarDetails": [{"rental_id": rental_id, "registration_number": registration_number}],
            "request": [{"request_id": request_id,"message":"pending","status":"pending"}]

        }
        if (driverOrNot === "yes") {
            // data.schedule=[{"rental_id":rental_id,"driver_id":driver_id}];
        }
        console.log(data)
        $.ajax({
            url: base_url + "rental",
            method: "post",
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function (rep) {

            }
        })
    }
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