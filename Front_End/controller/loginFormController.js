/*login account*/
$("#login-btn").click(function () {
    let username = $("#user-name").val();
    let password = $("#password").val();
    if (searchUsername(username)){
        $.ajax({
            url:base_url+"user?username="+username,
            method:"get",
            success:function (rep) {
                let user = rep.data;
                if (user.password===password){
                    if (user.role==="admin"){
                        window.location.href="../pages/admin.html";
                    }else if (user.role==="driver"){
                        window.location.href="../pages/driver.html";
                    }else {
                        window.location.href="../index.html";
                    }
                }else {
                    /*incorrect password*/
                }
            },
            error:function (rep) {

            }
        })
    }else {
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
                $("#find-account-section").css("display","none");
                $("#verification-section").css("display","flex");
            },
            error: function (rep) {

            }
        })
    }else {
        /*username is not available*/
    }
})