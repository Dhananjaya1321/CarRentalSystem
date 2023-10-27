function getLastRequestID() {
    $.ajax({
        url:base_url+"request/last_ID",
        method:"get",
        async:false,
        success:function (rep) {
            console.log(rep.data)
        }
    })
}