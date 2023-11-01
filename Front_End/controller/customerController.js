/*customer registration*/
$("#create-account-create-btn").click(function (e) {
    let username = $("#create-account-user-name").val();
    let password = $("#create-account-password").val();
    let conform_password = $("#conform-password").val();

    if (!searchUsername(username)) {
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
                    window.location.href = '../index.html'
                },
                error: function () {

                }
            })
        } else {
            /*password is not match*/
        }
    } else {
        /*username is already excise*/
    }
});

function getCustomerNIC() {
    let nic = null;
    $.ajax({
        url: base_url + "customer?username=" + usernameForContinue,
        method: "get",
        async: false,
        success: function (rep) {
            nic = rep.data;
        }
    })
    return nic;
}

function getCustomerDetails() {
    $.ajax({
        url: base_url + "customer/customer?username=" + usernameForContinue,
        method: "get",
        async: false,
        success: function (rep) {
            let customer = rep.data;
            console.log(rep.data);
            $("#customer-profile-address").val(customer.address);
            $("#customer-profile-contact").val(customer.contact);
            $("#customer-profile-email").val(customer.email);
            $("#customer-profile-username").val(customer.username);
            $("#customer-profile-password").val(customer.password);
            $("#customer-profile-nic").val(customer.nic);
            $("#customer-profile-driving-license-number").val(customer.driving_license_number);


            let license_front_photo = "../../../CarRentalSystem/Back_End/src/main/resources/files/upload-dir/" + customer.license_front_photo;
            let license_back_photo = "../../../CarRentalSystem/Back_End/src/main/resources/files/upload-dir/" + customer.license_back_photo;
            let nic_front_photo = "../../../CarRentalSystem/Back_End/src/main/resources/files/upload-dir/" + customer.nic_front_photo;
            let nic_back_photo = "../../../CarRentalSystem/Back_End/src/main/resources/files/upload-dir/" + customer.nic_back_photo;

            $("#customer-profile-driving-license-front-photo").css("background",`url(${license_front_photo})`)
            $("#customer-profile-driving-license-front-photo").css("backgroundPosition",`center`)
            $("#customer-profile-driving-license-front-photo").css("backgroundSize",`cover`)

            $("#customer-profile-driving-license-back-photo").css("background",`url(${license_back_photo})`)
            $("#customer-profile-driving-license-back-photo").css("backgroundPosition",`center`)
            $("#customer-profile-driving-license-back-photo").css("backgroundSize",`cover`)

            $("#customer-profile-nic-front-photo").css("background",`url(${nic_front_photo})`)
            $("#customer-profile-nic-front-photo").css("backgroundPosition",`center`)
            $("#customer-profile-nic-front-photo").css("backgroundSize",`cover`)

            $("#customer-profile-nic-back-photo").css("background",`url(${nic_back_photo})`)
            $("#customer-profile-nic-back-photo").css("backgroundPosition",`center`)
            $("#customer-profile-nic-back-photo").css("backgroundSize",`cover`)

        },
        error: function (rep) {

        }
    })
}

function getRequest() {
    $.ajax({
        url: base_url + "customer/requests?nic=" + getCustomerNIC(),
        method: "get",
        async: false,
        success: function (rep) {
            console.log(rep.data)
        },
        error: function (rep) {

        }
    })
}