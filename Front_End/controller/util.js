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
