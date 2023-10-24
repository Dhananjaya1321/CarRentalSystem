let base_url="http://localhost:8080/Back_End_war/"
function saveCustomer() {

}

$("#create-btn").click(function (e) {
    let email = $("#email").val();
    let contact = $("#contact").val();
    let username = $("#user-name").val();
    let password = $("#password").val();
    let conform_password = $("#conform-password").val();
    let address = $("#address").val();
    let nic = $("#nic").val();
    let nic_front_photo = $("#nic-front-photo-choose").val();
    let nic_back_photo = $("#nic-back-photo-choose").val();
    let license = $("#license").val();
    let license_front_photo = $("#license-front-photo-choose").val();
    let license_back_photo = $("#license-back-photo-choose").val();

    let formData = new FormData($("#create-account-form")[0]);
    console.log(formData);

    $.ajax({
        url:base_url+"customer",
        method:"post",
        data: formData,
        contentType: false,
        processData: false,
        success:function () {

        },
        error:function () {

        }
    })

});