/*login account*/
$("#login-btn").click(function () {
    let username = $("#user-name").val();
    let password = $("#password").val();
    if (searchUsername(username)) {
        $.ajax({
            url: base_url + "user?username=" + username,
            method: "get",
            success: function (rep) {
                let user = rep.data;
                if (user.password === password) {
                    if (user.role === "admin") {
                        usernameForContinue = username;
                        passwordForContinue = password;
                        manageSingInAndSignUpButton();
                        window.location.href = "../pages/admin.html";
                    } else if (user.role === "driver") {
                        usernameForContinue = username;
                        passwordForContinue = password;
                        manageSingInAndSignUpButton();
                        window.location.href = "../pages/driver.html";
                    } else {
                        usernameForContinue = username;
                        passwordForContinue = password;
                        manageSingInAndSignUpButton();
                        $("#header").css("display", "flex");
                        $("#footer").css("display", "flex");
                        $("#login-main").css("display", "none");
                        $("#create-account-main").css("display", "none");
                        $("#item-main").css("display", "none");
                        $("#home-main").css("display", "block");
                    }
                } else {
                    /*incorrect password*/
                }
            },
            error: function (rep) {

            }
        })
    } else {
        /*incorrect username*/
    }
})

/*find account to change password*/
$("#next-btn").click(function () {
    let username = $("#find-user-name").val();
    if (searchUsername(username)) {
        $.ajax({
            url: base_url + "user?username=" + username,
            method: "get",
            success: function (rep) {
                let user = rep.data;
                $("#find-account-section").css("display", "none");
                $("#verification-section").css("display", "flex");
            },
            error: function (rep) {

            }
        })
    } else {
        /*username is not available*/
    }
})


function findUser(username) {
    let user;
    $.ajax({
        url: base_url + "user?username=" + username,
        method: "get",
        async:false,
        success: function (rep) {
            if (rep.data.username===usernameForContinue && rep.data.password===passwordForContinue){
                user=true;
            }else {
                user=false;
            }
        },
    })
    return user;
}


$("#find-account-section").css("display", "none");
$("#verification-section").css("display", "none");

$("#forgot-password").click(function () {
    $("#login-section").css("display", "none");
    $("#find-account-section").css("display", "flex");
    $("#verification-section").css("display", "none");
});
$("#go-back-btn").click(function () {
    $("#login-section").css("display", "flex");
    $("#find-account-section").css("display", "none");
    $("#verification-section").css("display", "none");
});
$("#create-btn").click(function () {
    $("#header").css("display", "none");
    $("#footer").css("display", "none");
    $("#create-account-main").css("display", "flex");
    $("#login-main").css("display", "none");
    $("#item-main").css("display", "none");
    $("#home-main").css("display", "none");
});