


function getLastRequestID() {
    $.ajax({
        url: base_url + "request/last_ID",
        method: "get",
        async: false,
        success: function (rep) {
            let requestID = generateNextRequestID(rep.data);
        }
    })
}

function getLastRentalID() {
    $.ajax({
        url: base_url + "rental/last_ID",
        method: "get",
        async: false,
        success: function (rep) {
            let rentalID = generateNextRentalID(rep.data);
            console.log(rentalID);
        }
    })
}


function generateNextRequestID(lastRequestID) {
    if (lastRequestID === null) {
        return "REQ-001";
    } else {
        return "REQ-00" + (Number(lastRequestID.slice(6)) + 1);
    }
}

function generateNextRentalID(lastRentalID) {
    if (lastRentalID === null) {
        return "REN-001";
    } else {
        return "REN-00" + (Number(lastRentalID.slice(6)) + 1);
    }
}