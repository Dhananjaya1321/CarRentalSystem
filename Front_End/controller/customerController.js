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
    $("#request-status-table-body").empty();
    $.ajax({
        url: base_url + "customer/requests?nic=" + getCustomerNIC(),
        method: "get",
        async: false,
        success: function (rep) {
            for (let i in rep.data) {
                let request=rep.data[i];
                let btn;
                if (request.status==="pending"){

                    btn=`<button type="button" class="btn btn-danger border-0"
                            style="border-radius: 15px; background-color: #0068ff; height: 30px; width: 85px; font-size: 12px;">
                                <i class="fa-regular fa-clock"></i> ${request.status}
                         </button>`
                }else if (request.status==="reject"){
                    btn=`<button type="button" class="btn btn-danger border-0"
                            style="border-radius: 15px; background-color: #ff0000; height: 30px; width: 85px; font-size: 12px;">
                               <i class="fa-solid fa-circle-xmark"></i> ${request.status}
                         </button>`
                } else {
                    btn=`<button type="button" class="btn btn-danger border-0"
                            style="border-radius: 15px; background-color: #39ff00; height: 30px; width: 85px; font-size: 12px;">
                               <i class="fa-solid fa-circle-check"></i> ${request.status}
                         </button>`
                }
                let row=`<tr>
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
    let data={
        "address":$("#customer-profile-address").val(),
        "email":$("#customer-profile-email").val(),
        "contact":$("#customer-profile-contact").val(),
        "nic":$("#customer-profile-nic").val(),
        "driving_license_number":$("#customer-profile-driving-license-number").val(),
        "user":{"username":$("#customer-profile-username").val(),"password": $("#customer-profile-password").val(),"role":"customer"}
    }
    $.ajax({
        url: base_url + "customer",
        method: "put",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (rep) {
            getCustomerDetails();
        },
        error: function (rep) {

        }
    });
}