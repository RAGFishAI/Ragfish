// var languagedata
// /** */
// $(document).ready(async function () {

//     var languagepath = $('.language-group>button').attr('data-path')

//     await $.getJSON(languagepath, function (data) {

//         languagedata = data
//     })

// })





// form validation form user profile

$(document).ready(function () {
   
    $('#imgupload').on('change', function () {
        var file = this.files[0]; 
        if (file) {
            var reader = new FileReader();
            reader.onload = function (e) {
                
                $('#profileImg').attr('src', e.target.result);
                $('#cropData').val(e.target.result)
            };
            reader.readAsDataURL(file); 

           
        }
    });
});

$(document).on('click', '#profileupdatebutton', function () {

    const $btn = $(this);
    const originalText = $btn.html();

    // Show loader immediately
    $btn.prop('disabled', true).html(`
        <svg class="animate-spin -ml-1 h-4 w-4 mr-2 text-white inline"
             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Updating...
    `);

    // Give browser a moment to repaint
    setTimeout(function () {
        // All your validation and form submission logic here
        var formcheck = $("#userform").valid();

        if (formcheck == true) {
            $('#userform')[0].submit(); // loader stays during submit
        } else {
            // Validation failed → remove loader
            $btn.prop('disabled', false).html(originalText);
        }
    }, 8000); //


   

    jQuery.validator.addMethod("duplicateemail", function (value) {
        console.log("gyusajhd", $("input[name='csrf']").val())

        console.log("check email")
        var result;
        user_id = $("#id").val()
        console.log("id", user_id)
        $.ajax({
            url: "/settings/checkemail",
            type: "POST",
            async: false,
            data: { "email": value, "id": user_id, csrf: $("input[name='csrf']").val() },
            datatype: "json",
            caches: false,
            success: function (data) {
                console.log("data", data);
                result = data.trim();
                console.log("data",data);
                
            }
        })
        console.log("hasduikjds")
        return result.trim() != "true"
       
    })

    jQuery.validator.addMethod("duplicateusername", function (value) {

        var result;
        user_id = $("#id").val()
        $.ajax({
            url: "/settings/checkusername",
            type: "POST",
            async: false,
            data: { "username": value, "id": user_id, csrf: $("input[name='csrf']").val() },
            datatype: "json",
            caches: false,
            success: function (data) {
                result = data.trim();
            }
        })
        return result.trim() != "true"
    })

    jQuery.validator.addMethod("duplicatenumber", function (value) {

        var result;
        user_id = $("#id").val()
        $.ajax({
            url: "/settings/checknumber",
            type: "POST",
            async: false,
            data: { "number": value, "id": user_id, csrf: $("input[name='csrf']").val() },
            datatype: "json",
            caches: false,
            success: function (data) {
                result = data.trim();
            }
        })
        return result.trim() != "true"
    })
    // $.validator.addMethod("mob_validator", function (value) {
    //     return /^[6-9]{1}[0-9]{9}$/.test(value);
    // }, '* ' + languagedata.Userss.usrmobnumrgx);

   
    jQuery.validator.addMethod("space", function (value, element) {
        return !/\s/.test(value); 
    }, "* Enter valid First Name" );

    jQuery.validator.addMethod("mob_validator", function (value, element) {
        if (value.length >= 7)
            return true;
        else return false;
    }, "* Mobile number must be at least 7 digits.");


    $.validator.addMethod("email_validator", function (value) {
        return /(^[a-zA-Z_0-9\.-]+)@([a-z]+)\.([a-z]+)(\.[a-z]+)?$/.test(value);
    }, '* ' + "Please Enter valid Email");

    $("form[name='userform']").validate({
        

        ignore: [],
        
        rules: {
            prof_pic: {
                

                extension: "jpg|png|jpeg"
            },
            user_fname: {
                required: true,
                space :true
               
            },

            user_email: {
                required: true,
                email_validator: true,
                duplicateemail: true,
                
            },
            // user_role: {
            //     required: true,
            // },
            user_name: {
                required: true,
                duplicateusername: false,
                
            },
            user_pass: {
                // required: true,
                pass_validator: true,
            },
            user_mob: {
                required: true,
                mob_validator: true,
                duplicatenumber: true,
                space: true
            },


        },
        messages: {
            prof_pic: {
                extension: "* " + "Please upload valid image"
            },
            user_fname: {
                required: "* " + "Please Enter First Name",
                
            },
            user_email: {
                required: "* " + "Please Enter Email",
                duplicateemail: "* " + "Email Already Exist"
            },
            // user_role: {
            //     required: "* " + languagedata.Userss.usrrole
            // },
            user_name: {
                required: "* " + "Please Enter User Name",
                duplicateusername: "*" + "User Name Already Exist",
               
            },
            // user_pass: {
            //     required: "* " + languagedata.Userss.usrpswd
            // },
            user_mob: {
                required: "* " + "Please Enter Moblie Number",
                duplicatenumber: "* " + "Mobile Number Already Exist",
                space: "* " + "Please Enter Moblie Number"
            },



        }
    })
    var formcheck = $("#userform").valid();

    

    if (formcheck == true) {
        $('#userform')[0].submit();
    } else {
        $(document).on('keyup', ".field", function () {
            Validationcheck()
        })
        $('.input-group').each(function () {
            var inputField = $(this).find('input');
            var inputName = inputField.attr('name');


            if (inputName !== 'user_role' && !inputField.valid()) {
                $(this).addClass('input-group-error');

            } else {
                $(this).removeClass('input-group-error');
            }
        });
        // if ($('#rolen-error').css('display') !=='none'){
        //     console.log("check")
        //         $('.user-drop-down').addClass('input-group-error')
        //     }

    }
    return false;
})