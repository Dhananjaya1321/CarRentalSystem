/*customer registration*/
$("#create-account-create-btn").click(function (e) {
    let username = $("#create-account-user-name").val();
    let password = $("#create-account-password").val();
    let conform_password = $("#conform-password").val();

    if (!searchUsername(username)){
        if (password === conform_password) {
            let formData = new FormData($("#create-account-form")[0]);
            $.ajax({
                url: base_url + "customer",
                method: "post",
                data: formData,
                contentType: false,
                processData: false,
                success: function () {
                    manageSingInAndSignUpButton();
                    window.location.href='../index.html'
                },
                error: function () {

                }
            })
        }else {
            /*password is not match*/
        }
    }else {
        /*username is already excise*/
    }
});

