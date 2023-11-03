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
                    $("#user-name").val("");
                    $("#password").val("");
                    $("#user-name").css("border", "1px solid #ced4da")
                    $("#password").css("border", "1px solid #ced4da")
                    $("#login-password-validation").text("");
                    $("#login-username-validation").text("");

                    if (user.role === "admin") {
                        usernameForContinue = username;
                        passwordForContinue = password;
                        manageSingInAndSignUpButton();
                        window.location.href = "../pages/admin.html";
                    } else if (user.role === "driver") {
                        usernameForContinue = username;
                        passwordForContinue = password;
                        manageSingInAndSignUpButton();
                        getDriverID();
                        getDriverSchedule();
                        // window.location.href = "../pages/driver.html";
                        $("#header").css("display", "none");
                        $("#footer").css("display", "none");
                        $("#login-main").css("display", "none");
                        $("#customer-main").css("display", "none");
                        $("#create-account-main").css("display", "none");
                        $("#item-main").css("display", "none");
                        $("#home-main").css("display", "none");
                        $("#driver-main").css("display", "block");
                        $("#profile").css("display", "none");
                    } else {
                        usernameForContinue = username;
                        passwordForContinue = password;
                        manageSingInAndSignUpButton();
                        $("#header").css("display", "flex");
                        $("#footer").css("display", "block");
                        $("#login-main").css("display", "none");
                        $("#customer-main").css("display", "none");
                        $("#create-account-main").css("display", "none");
                        $("#item-main").css("display", "none");
                        $("#home-main").css("display", "block");
                        $("#driver-main").css("display", "none");
                    }
                } else {
                    $("#user-name").css("border", "1px solid red")
                    $("#password").css("border", "1px solid red")
                    $("#login-password-validation").text("Incorrect password");
                    $("#login-password-validation").css("color", "red");
                }
            },
            error: function (rep) {

            }
        })
    } else {
        $("#user-name").css("border", "1px solid red")
        $("#password").css("border", "1px solid red")
        $("#login-username-validation").text("Incorrect username");
        $("#login-username-validation").css("color", "red");
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
                usernameForContinue = username;
                getOTP();
                $("#find-account-section").css("display", "none");
                $("#change-password").css("display", "none");
                $("#verification-section").css("display", "flex");
                $("#user-name").val("");
                $("#user-name").css("border", "red")
                $("#forgot-password-username-validation").text("Incorrect username");
                $("#forgot-password-username-validation").css("color", "red");
            },
            error: function (rep) {

            }
        })
    } else {
        $("#user-name").val("");
        $("#user-name").css("border", "red")
        $("#forgot-password-username-validation").text("Incorrect username");
        $("#forgot-password-username-validation").css("color", "red");
    }
})

let OTP;
$("#continue-btn").click(function () {
    let verify_1 = $("#verify-1").val();
    let verify_2 = $("#verify-2").val();
    let verify_3 = $("#verify-3").val();
    let verify_4 = $("#verify-4").val();
    let code = Number(verify_1 + verify_2 + verify_3 + verify_4);
    if (code === OTP) {
        console.log(code, OTP)
        $("#verify-1,#verify-2,#verify-3,#verify-4").val("");
        $("#change-password").css("display", "flex");
        $("#verification-section").css("display", "none");
    } else {
        $("#verify-1,#verify-2,#verify-3,#verify-4").val("");
        $("#verify-1,#verify-2,#verify-3,#verify-4").css("border", "1px solid red");
    }
})

$("#Change-password-btn").click(function () {
    let newPassword = $("#new-password").val();
    let conformNewPassword = $("#conform-new-password").val();
    let data={
        "username":usernameForContinue,
        "password":newPassword,
    }
    if (newPassword === conformNewPassword) {
        $.ajax({
            url: base_url + "user",
            method: "put",
            contentType:"application/json",
            data:JSON.stringify(data),
            success: function (rep) {
                passwordForContinue = newPassword;
                manageSingInAndSignUpButton();
                $("#header").css("display", "flex");
                $("#footer").css("display", "block");
                $("#login-main").css("display", "none");
                $("#login-section").css("display", "flex");
                $("#customer-main").css("display", "none");
                $("#create-account-main").css("display", "none");
                $("#item-main").css("display", "none");
                $("#home-main").css("display", "block");
                $("#driver-main").css("display", "none");
                $("#change-password").css("display", "none");

            },
            error: function (rep) {

            }
        })
    } else {
        $("#new-password,#conform-new-password").val("");
        $("#new-password,#conform-new-password").css("border", "1px solid red");
        $("#change-password-verification,#change-password-conform-verification").text("Password does not match");
    }
})

function findUser(username) {
    let user;
    $.ajax({
        url: base_url + "user?username=" + username,
        method: "get",
        async: false,
        success: function (rep) {
            if (rep.data.username === usernameForContinue && rep.data.password === passwordForContinue) {
                user = true;
            } else {
                user = false;
            }
            console.log("SSs")
        },
    })
    return user;
}

function getOTP() {
    $.ajax({
        url: base_url + "user/mail?username=" + usernameForContinue,
        method: "get",
        success: function (rep) {
            console.log("Success fully send")
            OTP = rep.data;
        },
        error: function (rep) {

        }
    })
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
    $("#customer-main").css("display", "none");
    $("#item-main").css("display", "none");
    $("#home-main").css("display", "none");
});