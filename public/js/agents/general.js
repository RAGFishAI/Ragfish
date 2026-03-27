

const html = document.documentElement;

const observer = new MutationObserver(() => {
    if (html.style.paddingRight) {
        html.style.paddingRight = '0px';
    }
});

observer.observe(html, {
    attributes: true,
    attributeFilter: ['style']
});

$(document).ready(function () {
    $("#savebtn").on("click", function () {

        ass_Name = $("#assistantname").val()

        $.ajax({
            type: "POST",
            url: "/app/updateassistant",
            data: {
                assistantname: $("#assistantname").val(),
                csrf: $("input[name='csrf']").val(),
                assistantid: $("#assistantid").val()

            },
            success: function (response) {
                if (response.update) {
                    location.reload();
                }
            }


        })
        // $("assistantform")[0].submit()
    })

})


$(document).ready(function () {

    $("#delid").on("click", function () {

        $.ajax({
            type: "POST",
            url: "/app/deleteassistant",
            data: {
                assistantname: $("#assistantname").val(),
                csrf: $("input[name='csrf']").val(),
                assistantAPPid: $("#appid").val(),
                assistantid: $("#assistantid").val()

            },
            success: function (response) {
                console.log("delate response", response.Delete)
                if (response.Delete) {
                    window.location.href = "/agents"
                }
            }


        })



    })

})

$("#projectCopyBtn").click(function () {

    console.log("project idx")

    var input = $("#projectidInput").text();

    var newUrl = "prj_" + input
    navigator.clipboard.writeText(newUrl);

    $("#copied").removeClass("hidden")


});