$(document).ready(function () {

    $("#Save").click(function () {

        $("#createfolder").validate({

            ignore: [],

            rules: {
                foldername: {
                    required: true
                }
            },
            messages: {
                foldername: {
                    required: "* Please Enter the Folder Name"
                },
            }
        })

        var formcheck = $("#createfolder").valid();
        if (formcheck == true) {
            $('#createfolder')[0].submit();

        }


    })
})