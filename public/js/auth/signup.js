$(document).ready(function () {


      $(document).on('keypress', '.emailid', function(e) {
        if (e.which === 13) {
            e.preventDefault();
            $('.signupbtn').trigger('click');  // Step 1 → Password
        }
    });

    $(document).on('keypress', '.pass_word', function(e) {
        if (e.which === 13) {
            e.preventDefault();
            $('.signupbtn').trigger('click');  // Password validation
        }
    });

    $(document).on('keypress', '.confirmpass', function(e) {
        if (e.which === 13) {
            e.preventDefault();
            $('.signupbtn').trigger('click');  // Final submit
        }
    });
   
    $('.passworddiv').addClass('hidden');

    // Track current step: 1 = email, 2 = password
    var currentStep = 1;

    $(document).on('click', '.signupbtn', function (e) {
        e.preventDefault();

       
        $('#email-error, #password-error, #confirmpass-error').addClass('hidden');

        if (currentStep === 1) {
          console.log(isEmailDuplicate,"checkthiss")
            var emailid = $('.emailid').val().trim();

            if (emailid === "") {
                $('#email-error').removeClass('hidden').text('Please Enter EmailId');
                $('.emailid').focus();
                return;
            }
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailid)) {
                $('#email-error').removeClass('hidden').text('Please enter a valid email address');
                $('.emailid').focus();
                return;
            }

           
  else if (isEmailDuplicate(emailid)) {
    console.log("duplicate email found");
    $('#email-error').removeClass('hidden').text('Email already exists');
    $('.emailid').focus();
    return;
}
   
            $('.emaildiv').addClass('hidden');
            $('.passworddiv').removeClass('hidden');
            $('.signupbtn').text('Submit');
            currentStep = 2;

        }
        else if (currentStep === 2) {
           
            var password = $('.pass_word').val().trim();
            var confirmpass = $('.confirmpass').val().trim();

            var passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[$@]).{8,}$/;

            if ((password === "") && (confirmpass === "")) {
                $('#password-error').removeClass('hidden').text('Please Enter Password');
                $('#confirmpass-error').removeClass('hidden').text('Please enter confirm password');

                return;
            }

            else if (password === "") {
                $('#password-error').removeClass('hidden').text('Please Enter Password');

                return;
            }
            else if (!passwordRegex.test(password)) {
                $('#password-error').removeClass('hidden').text('At least 1 Upper, 1 Lower, 1 Number, 1($/@), 8+ chars');

                return;
            }
            else if (confirmpass === "") {
                $('#confirmpass-error').removeClass('hidden').text('Please enter confirm password');

                return;
            }
            else if (confirmpass !== password) {
                $('#confirmpass-error').removeClass('hidden').text('Password Mismatch');

                return;
            }

        
            $('#signupForm')[0].submit();
 
         }
    });
});
// Password Change
$(document).on('click', '#eye1', function () {

    var This = $(".pass_word")

    if ($(This).attr('type') === 'password') {



        $('#eye1 img').attr('src', '/public/img/eye open.svg')

        $(This).attr('type', 'text');

    } else {

        $('#eye1 img').attr('src', '/public/img/hide-password.svg')

        $(This).attr('type', 'password');


    }
})

// Password Change
$(document).on('click', '#eye2', function () {

    var This = $(".confirmpass")

    if ($(This).attr('type') === 'password') {

        $('#eye2 img').attr('src', '/public/img/eye open.svg')

        $(This).attr('type', 'text');


    } else {

        $('#eye2 img').attr('src', '/public/img/hide-password.svg')


        $(This).attr('type', 'password');

    }
})

function isEmailDuplicate(email) {
    var result = false;
    
    $.ajax({
        url: "/checkemail",
        type: "POST",
        async: false,
        data: { 
            "email": email, 
            "csrf": $("input[name='csrf']").val() 
        },
        dataType: "json",
        cache: false,
        success: function (data) {
            result = data;  
            console.log(result, "result from server");
        },
        error: function() {
            result = false; 
        }
    });
    
  
    return result; 
}

// $(document).on('keyup','.emailid', function(){

//  $('#email-error').addClass('hidden')
 
// })

// $(document).on('keyup','.confirmpass',function(){

//  $('#confirmpass-error').addClass('hidden')
// })

// $(document).on('keyup','.pass_word',function(){

//  $('#password-error').addClass('hidden')

// })