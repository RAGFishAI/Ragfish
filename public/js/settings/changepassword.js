var languagedata
/** */
$(document).ready(async function () {

    var languagepath = $('.language-group>button').attr('data-path')

    await $.getJSON(languagepath, function (data) {

        languagedata = data
    })

})

$(document).on('click', '.passsave', function (event) {

    event.preventDefault()

    $.validator.addMethod("password1", function (value) {
        return /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).{8,}$/.test(value);
    }, '* ' + languagedata.Userss.usrpswdrgx);
   $.validator.addMethod("checkcurrentpassword", function (value) {   
      var result;  
     $.ajax({
        url: "/checkpassword",
        type: "POST",
        async: false,
        data: { 
            "pass": value, 
            "csrf": $("input[name='csrf']").val(),
            "userid":$('.userid').val() 
        },
        dataType: "json",
        cache: false,
        success: function (data) {

          
        
               if (data.pass==value){

                result = "true";
               }else{

                result = "false";
               }
          
        }
      })
      return result!= "true"
    })
    $("form[name='passform']").validate({
          ignore: [],

        rules: {
            currentpass: {
                required: true,
                // checkcurrentpassword: true
            },
            pass: {
                required: true,
                password1: true,
                // duplicatepassword:true
            },
            cpass: {
                required: true,
                equalTo: "#pass"
            }
        },
        messages: {
            currentpass: {
                required: "*Please enter your current password",
                // checkcurrentpassword: "* Current password is incorrect"
            },
            pass: {
                required: "*Please enter a new password",
                // duplicatepassword: "* New password must be different from the old password"
            },
            cpass: {
                required: "* " + languagedata.confirmpswd,
                equalTo: "* " + languagedata.confirmpswdrgx
            }
        }
    })
    var formcheck = $("#passform").valid();
    console.log("formchk", formcheck == true);
    if (formcheck == true) {

        oldpass = checkCurrentPassword();

        if (!oldpass) {

            $('.current-pass-error').removeClass('hidden');

            return;

        }else{
            console.log("oldpass", oldpass);
                 $('.current-pass-error').addClass('hidden');
        }

            duplicatepass = checkDuplicatePassword($("#pass").val());
          
            if (duplicatepass) {

               $('.duplicate-pass-error').removeClass('hidden');

                return;

            }else{
               $('.duplicate-pass-error').addClass('hidden');
            }

        $('#passform')[0].submit();
       
    
    }
 
})

function checkCurrentPassword() {
    var currentPassword = $("input[name='currentpass']").val();
    var isValid = false;

    $.ajax({
        url: "/checkpassword",
        type: "POST",
        async: false,
        data: {
            "pass": currentPassword,
            "csrf": $("input[name='csrf']").val(),
            "userid": $('.userid').val()
        },
        dataType: "json",
        cache: false,
        success: function (data) {
            console.log("data", data.pass, currentPassword.trim());
           
            if (data.pass == false) {

               

                isValid = false;
            }else{
              
                isValid = true;
            }
        }
    });

    return isValid;
}

function checkDuplicatePassword(newPassword) {
    var isDuplicate = false;

    $.ajax({
        url: "/settings/checkpassword",
        type: "POST",
        async: false,
        data: {
            "pass": newPassword,
            "csrf": $("input[name='csrf']").val(),
            "userid": $('.userid').val()
        },
        dataType: "json",
        cache: false,
        success: function (data) {
              if (data.pass == false) {

              
                isDuplicate = false;
            }else{
                
                isDuplicate = true;
            }
        }
    });

    return isDuplicate;
}
// Password Change
$(document).on('click', '#eye1', function () {

    var This = $("#pass")

    if ($(This).attr('type') === 'password') {

        $('#eye-close1').hide()

        $('#eye-open1').show()

        $(This).attr('type', 'text');

    } else {

        $('#eye-open1').hide()

        $('#eye-close1').show()

        $(This).attr('type', 'password');


    }
})

// Password Change
$(document).on('click', '#eye2', function () {

    var This = $("#cpass")

    if ($(This).attr('type') === 'password') {

        $('#eye-close2').hide()

        $('#eye-open2').show()

        $(This).attr('type', 'text');


    } else {

        $('#eye-open2').hide()

        $('#eye-close2').show()

        $(This).attr('type', 'password');

    }
})



$(document).on('click', '.cancelbtn', function () {

    window.location.href = "/settings/changepassword";

})