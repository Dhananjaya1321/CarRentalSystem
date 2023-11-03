/*customer registration*/
$("#create-account-create-btn").click(function (e) {
    let username = $("#create-account-user-name").val();
    let password = $("#create-account-password").val();
    let conform_password = $("#conform-password").val();

    let email = $("#email");
    let contact = $("#contact");
    let address = $("#address");
    let nic = $("#nic");
    let license = $("#license");
    $("#license,#nic,#address,#contact,#email").css("border", "1px solid #ced4da");
    if (!searchUsername(username)) {
        if (PASSWORD.test(password)) {
            if (password === conform_password) {
                if (EMAIL.test(email.val())) {
                    if (CONTACT.test(contact.val())) {
                        if (ADDRESS.test(address.val())) {
                            if (NIC.test(nic.val())) {
                                if (LICENSE.test(license.val())) {
                                    let formData = new FormData($("#create-account-form")[0]);
                                    $.ajax({
                                        url: base_url + "customer",
                                        method: "post",
                                        data: formData,
                                        contentType: false,
                                        processData: false,
                                        success: function (rep) {
                                            manageSingInAndSignUpButton();
                                            $("#license,#nic,#address,#contact,#email").val("");
                                            $("#license,#nic,#address,#contact,#email").css("border", "1px solid #ced4da");
                                            window.location.href = '../index.html'
                                        },
                                        error: function (rep) {
                                            alert(rep.responseJSON.message);
                                            $("#license,#nic,#address,#contact,#email").val("");
                                            $("#license,#nic,#address,#contact,#email").css("border", "1px solid #ced4da");
                                        }
                                    })
                                } else {
                                    license.css("border", "1px solid red");
                                }
                            } else {
                                nic.css("border", "1px solid red");
                            }
                        } else {
                            address.css("border", "1px solid red");
                        }
                    } else {
                        contact.css("border", "1px solid red");
                    }
                } else {
                    email.css("border", "1px solid red");
                }
            } else {
                /*password is not match*/
                $("#create-account-password").val("");
                $("#conform-password").val("");
                $("#create-account-password").val("");
                $("#conform-password").val("");

            }
        } else {
            $("#create-account-password-validation").text("Must contain at least 8 characters including one uppercase letter, one lowercase letter, one number and one special character");
            $("#create-account-password-validation").css("color", "red");
            $("#create-account-password").css("border", "1px solid red");
        }
    } else {
        /*username is already excise*/
        $("#create-account-username-validation").text("username is already excise");
        $("#create-account-username-validation").css("color", "red");
        $("#create-account-user-name").css("border", "1px solid red");
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

            $("#customer-profile-driving-license-front-photo").css("background", `url(${license_front_photo})`)
            $("#customer-profile-driving-license-front-photo").css("backgroundPosition", `center`)
            $("#customer-profile-driving-license-front-photo").css("backgroundSize", `cover`)

            $("#customer-profile-driving-license-back-photo").css("background", `url(${license_back_photo})`)
            $("#customer-profile-driving-license-back-photo").css("backgroundPosition", `center`)
            $("#customer-profile-driving-license-back-photo").css("backgroundSize", `cover`)

            $("#customer-profile-nic-front-photo").css("background", `url(${nic_front_photo})`)
            $("#customer-profile-nic-front-photo").css("backgroundPosition", `center`)
            $("#customer-profile-nic-front-photo").css("backgroundSize", `cover`)

            $("#customer-profile-nic-back-photo").css("background", `url(${nic_back_photo})`)
            $("#customer-profile-nic-back-photo").css("backgroundPosition", `center`)
            $("#customer-profile-nic-back-photo").css("backgroundSize", `cover`)

        },
        error: function (rep) {

        }
    })
}

function getRequest() {
    $("#request-status-table-body").empty();
    $.ajax({
        url: base_url + "customer/requests?nic=" + getCustomerNIC(),
        method: "get",
        async: false,
        success: function (rep) {
            for (let i in rep.data) {
                let request = rep.data[i];
                let btn;
                if (request.status === "pending") {

                    btn = `<button type="button" class="btn btn-danger border-0"
                            style="border-radius: 15px; background-color: #0068ff; height: 30px; width: 85px; font-size: 12px;">
                                <i class="fa-regular fa-clock"></i> ${request.status}
                         </button>`
                } else if (request.status === "reject") {
                    btn = `<button type="button" class="btn btn-danger border-0"
                            style="border-radius: 15px; background-color: #ff0000; height: 30px; width: 85px; font-size: 12px;">
                               <i class="fa-solid fa-circle-xmark"></i> ${request.status}
                         </button>`
                } else {
                    btn = `<button type="button" class="btn btn-danger border-0"
                            style="border-radius: 15px; background-color: #39ff00; height: 30px; width: 85px; font-size: 12px;">
                               <i class="fa-solid fa-circle-check"></i> ${request.status}
                         </button>`
                }
                let row = `<tr>
                            <td>${request.rental_id}</td>
                            <td>${request.registration_number}</td>
                            <td>${request.pick_up_date}</td>
                            <td>${request.return_date}</td>
                            <td>${request.location}</td>
                            <td>
                                <textarea readonly>${request.message}</textarea>
                            </td>
                            <td>
                                ${btn}
                            </td>
                        </tr>`
                $("#request-status-table-body").append(row);
            }
        },
        error: function (rep) {

        }
    })
}

$("#customer-details-update-btn").click(function () {
    updateCustomer();
})

function updateCustomer() {
    let data = {
        "address": $("#customer-profile-address").val(),
        "email": $("#customer-profile-email").val(),
        "contact": $("#customer-profile-contact").val(),
        "nic": $("#customer-profile-nic").val(),
        "driving_license_number": $("#customer-profile-driving-license-number").val(),
        "user": {
            "username": $("#customer-profile-username").val(),
            "password": $("#customer-profile-password").val(),
            "role": "customer"
        }
    }
    $("#customer-profile-email,#customer-profile-contact,#customer-profile-address,#customer-profile-nic,#customer-profile-driving-license-number").css("border", "1px solid #ced4da");

    if (EMAIL.test($("#customer-profile-email").val())) {
        if (CONTACT.test($("#customer-profile-contact").val())) {
            if (ADDRESS.test($("#customer-profile-address").val())) {
                if (NIC.test($("#customer-profile-nic").val())) {
                    if (LICENSE.test($("#customer-profile-driving-license-number").val())) {
                        $.ajax({
                            url: base_url + "customer",
                            method: "put",
                            contentType: "application/json",
                            data: JSON.stringify(data),
                            success: function (rep) {
                                getCustomerDetails();
                                $("#customer-profile-email,#customer-profile-contact,#customer-profile-address,#customer-profile-nic,#customer-profile-driving-license-number").val("");
                                $("#customer-profile-email,#customer-profile-contact,#customer-profile-address,#customer-profile-nic,#customer-profile-driving-license-number").css("border", "1px solid #ced4da");
                            },
                            error: function (rep) {
                                alert(rep.responseJSON.message);
                                $("#customer-profile-email,#customer-profile-contact,#customer-profile-address,#customer-profile-nic,#customer-profile-driving-license-number").val("");
                                $("#customer-profile-email,#customer-profile-contact,#customer-profile-address,#customer-profile-nic,#customer-profile-driving-license-number").css("border", "1px solid #ced4da");
                            }
                        });
                    } else {
                        $("#customer-profile-driving-license-number").css("border", "1px solid red");
                    }
                } else {
                    $("#customer-profile-nic").css("border", "1px solid red");
                }
            } else {
                $("#customer-profile-address").css("border", "1px solid red");
            }
        } else {
            $("#customer-profile-contact").css("border", "1px solid red");
        }
    } else {
        $("#customer-profile-email").css("border", "1px solid red");
    }
}

function getAllCustomers() {
    $.ajax({
        url: base_url + "customer",
        method: "get",
        success: function (rep) {
            let array = rep.data;
            $("#customer-details-table-body").empty();
            for (const i in array) {
                let customer = array[i];
                let path = "../../../CarRentalSystem/Back_End/src/main/resources/files/upload-dir/";

                let row = `<tr>
                        <td>${customer.contact}</td>
                        <td>${customer.nic}</td>
                        <td>
                            <img src="${path}${customer.nic_front_photo}" style="border-radius: 10px" width="80" height="80">
                            <img src="${path}${customer.nic_back_photo}" style="border-radius: 10px" width="80" height="80">
                        </td>
                        <td>${customer.driving_license_number}</td>
                        <td>
                            <img src="${path}${customer.license_front_photo}" style="border-radius: 10px" width="80" height="80">
                            <img src="${path}${customer.license_back_photo}" style="border-radius: 10px" width="80" height="80">
                        </td>
                        <td>
                            <button type="button" class="btn btn-danger border-0" style="background-color: #0aff00">
                            <i class="fa-solid fa-eye"></i>
                            </button>
                        </td>
                    </tr>`;
                $("#customer-details-table-body").append(row);
            }
        },
        error: function (rep) {

        }
    });
}

$("#search-customer").onkeydown(function () {
    $.ajax({
        url: base_url + "customer?nic="+$("#search-customer").val(),
        method: "get",
        success: function (rep) {
            let array = rep.data
            $("#customer-details-table-body").empty();
            for (const i in array) {
                let customer = array[i];
                let path = "../../../CarRentalSystem/Back_End/src/main/resources/files/upload-dir/";

                let row = `<tr>
                        <td>${customer.contact}</td>
                        <td>${customer.nic}</td>
                        <td>
                            <img src="${path}${customer.nic_front_photo}" style="border-radius: 10px" width="80" height="80">
                            <img src="${path}${customer.nic_back_photo}" style="border-radius: 10px" width="80" height="80">
                        </td>
                        <td>${customer.driving_license_number}</td>
                        <td>
                            <img src="${path}${customer.license_front_photo}" style="border-radius: 10px" width="80" height="80">
                            <img src="${path}${customer.license_back_photo}" style="border-radius: 10px" width="80" height="80">
                        </td>
                        <td>
                            <button type="button" class="btn btn-danger border-0" style="background-color: #0aff00">
                            <i class="fa-solid fa-eye"></i>
                            </button>
                        </td>
                    </tr>`;
                $("#customer-details-table-body").append(row);
            }
        },
        error: function (rep) {

        }
    });
})
