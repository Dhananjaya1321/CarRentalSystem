let base_url = "http://localhost:8080/Back_End_war/";

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