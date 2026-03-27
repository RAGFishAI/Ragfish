$(document).ready(function () {

    $("#Save").click(function () {

        $("#createchannel").validate({

            ignore: [],

            rules: {
                channelname: {
                    required: true
                }
            },
            messages: {
                channelname: {
                    required: "* Please Enter the Channel Name"
                },
            }
        })

        var formcheck = $("#createchannel").valid();
        if (formcheck == true) {
            $('#createchannel')[0].submit();

        }


    })
})