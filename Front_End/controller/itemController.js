$("#reservation-btn").click(function () {
    saveRental();
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
                    "request": [{"request_id": request_id, "message": "", "status": "pending", "rental_id": rental_id,
                        "car":{"registration_number": registration_number},
                        "payment":{"payment_id": payment_id}}]

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