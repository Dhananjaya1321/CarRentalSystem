let base_url="http://localhost:8080/Back_End_war/"
function getAllDrivers() {
    $.ajax({
        url:base_url+"driver",
        method:"get",
        success:function (rep) {
            return JSON.parse(rep.data)[0];
        },
        error:function (rep) {

        }
    });
}