let cars = [];
loadCarsForTable();

/*add cars*/
$("#car-add-btn").click(function () {
    let formData = new FormData($("#cars-add-form")[0]);
    $.ajax({
        url: base_url + "car",
        method: "post",
        data: formData,
        contentType: false,
        processData: false,
        success: function (rep) {
            alert("Car", rep.message);
            loadCarsForTable();
        },
        error: function (rep) {

        }
    })
})

/*get all cars*/
function getAllCars() {
    $.ajax({
        url: base_url + "car",
        method: "get",
        dataType: "JSON",
        success: function (rep) {
            cars = rep.data;
            console.log(rep)
        },
        error: function (rep) {

        }
    })
}

/*load cars for available, undermining and need to maintain tables*/
function loadCarsForTable() {
    getAllCars();
    $("#available-cars-table-body").empty();
    $("#cars-under-maintenance-table-body").empty();
    for (let i in cars) {
        let car = cars[i];
        if (car.status === "available") {
            let row = `<tr>
                    <td>${car.registration_number}</td>
                    <td>${car.brand}</td>
                    <td>${car.type}</td>
                    <td style="width: 0;">
                        <select class="form-select" aria-label="Default select example" style="width: 200px">
                            <option value="available">available</option>
                            <option value="under-maintenance">under maintenance</option>
                        </select>
                    </td>
                    <td>
                        <button type="button" class="btn btn-danger border-0" style="background-color: #ff0014"><i
                                class="fa-solid fa-trash-can"></i></button>
                        <button type="button" class="btn border-0 btn-danger" style="background-color: #1aff00;"><i
                                class="fa-solid fa-pencil"></i></button>
                    </td>
                </tr>`;
            $("#available-cars-table-body").append(row);
        } else {
            $("#cars-under-maintenance").css("display","flex");
            let row = `<tr>
                            <td>${car.registration_number}</td>
                            <td>${car.brand}</td>
                            <td>${car.type}</td>
                            <td> under maintenance</td>
                            <td>
                                <button type="button" class="btn border-0 btn-danger" style="background-color: #1aff00;">
                                    Maintenance completed
                                </button>
                            </td>
                        </tr>`;
            $("#cars-under-maintenance-table-body").append(row);
        }
    }
}


