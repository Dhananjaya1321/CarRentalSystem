let base_url = "http://localhost:8080/Back_End_war/";
let usernameForContinue="logout";
let passwordForContinue="logout";

function searchUsername(username) {
    let resp = false;
    $.ajax({
        url: base_url + "user",
        method: "get",
        async: false,
        success: function (rep) {
            let users = rep.data;
            resp = users.find(function (user) {
                return user.username === username;
            });
        },
        error: function (rep) {
            resp = false;
        }
    });
    return resp;
}

function searchCarByRegistrationNumber(registration_number) {
    let car = [];
    $.ajax({
        url: base_url + "car?registration_number=" + registration_number,
        method: "get",
        async: false,
        success: function (rep) {
            car = rep.data;
        },
        error: function (rep) {

        }
    })
    return car;
}


function getLastPaymentID() {
    let lastPaymentId = null;
    $.ajax({
        url: base_url + "payment/last_id",
        method: "get",
        async: false,
        success: function (rep) {
            lastPaymentId = rep.data;
        }
    });
    return lastPaymentId;
}

function generateNextPaymentID(lastPaymentId) {
    if (lastPaymentId === null) {
        return "PAY-001";
    } else {
        return "PAY-00" + (Number(lastPaymentId.slice(6)) + 1);
    }
}