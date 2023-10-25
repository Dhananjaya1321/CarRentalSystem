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
            loadCarsForTable();
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
    $("#cars-need-maintenance-table-body").empty();
    for (let i in cars) {
        let car = cars[i];
        if (car.status === "available") {
            if ((car.mileage_after_maintenance-car.mileage_before_maintenance)>=5000){
                $("#need-to-maintain-cars").css("display","flex");
                let row=`<tr>
                            <td>${car.registration_number}</td>
                            <td>${car.brand}</td>
                            <td>${car.type}</td>
                            <td>Need to maintain</td>
                            <td>
                                <button type="button" class="btn border-0 btn-danger"
                                        style="background-color: #ffb100; width: 180px;">Confirm
                                    maintenance
                                </button>
                            </td>
                        </tr>`;
                $("#cars-need-maintenance-table-body").append(row);
            }else {
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
            }
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
    deleteCar();
}

function deleteCar() {
    $("#available-cars-table-body>tbody>tr>td>button:nth-child(1)").click(function () {
        let registration_number = $(this).parents("#available-cars-table-body>tr").children().eq(0).text();
       $.ajax({
           url:base_url+"car?registration_number="+registration_number,
           method:"delete",
           success:function (rep) {
               alert("Car",rep.message)
           },
           error:function (rep) {

           }
       })
    });
}
