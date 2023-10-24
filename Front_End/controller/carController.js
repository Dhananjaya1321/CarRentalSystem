$("#car-add-btn").click(function () {
    let formData=new FormData($("#cars-add-form")[0]);
    $.ajax({
        url:base_url+"car",
        method:"post",
        data:formData,
        contentType:false,
        processData:false,
        success:function (rep) {
            alert("Car",rep.message);
        },
        error:function (rep) {

        }
    })
})