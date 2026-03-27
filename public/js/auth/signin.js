// First flow two pages//


// $(document).ready(function() {
//     // Store email validation status
//     window.emailValidated = false;
    
//     // SINGLE BUTTON HANDLER - Check current step using visibility
//     $('#siginform .emailcontinue').on('click', function(e) {
//         e.preventDefault();
        
//         // **DETECT CURRENT STEP**
//         var isEmailStep = $('.emaildiv').is(':visible');
        
//         if (isEmailStep) {
//             // **STEP 1: Email validation + AJAX**
//             var emailInput = $('#siginform input[type="text"]');
//             var emailValue = emailInput.val().trim();
//             var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
//             $('.email-error').remove();
            
//             if (emailValue === '') {
//                 emailInput.after('<label class="email-error  text-[#f26674] font-normal text-xs error absolute bottom-0 top-full">Please enter Email Id</label>');
//                 return false;
//             } else if (!emailRegex.test(emailValue)) {
//                 emailInput.after('<label class="email-error text-[#f26674] font-normal text-xs error absolute bottom-0 top-full">Please enter a valid email address</label>');
//                 return false;
//             }
            
//             // Email AJAX check (ONLY Step 1)
//             var isDuplicate = EmailCheck(emailValue);
            
//             if (!isDuplicate) {
//                 emailInput.after('<label class="email-error  text-[#f26674] font-normal text-xs error absolute bottom-0 top-full">You are not registered with us. Please sign up first.</label>');
//                 return false;
//             }
            
//             // SUCCESS: Store email & show password step
//             window.emailValidated = true;
//             $('.emaildiv').addClass('hidden');
//             $('.passdiv').removeClass('hidden');
//             $(this).text('Submit');
//             $('#siginform input[type="password"]').focus();
            
//         } else {
//             // **STEP 2: Password validation ONLY (NO AJAX)**
//             var passwordInput = $('#siginform input[type="password"]');
//             var passwordValue = passwordInput.val();
            
//             // $('.password-error').remove();
            
//             // Check email was validated
//             if (!window.emailValidated) {
//                 alert('Please validate email first');
//                 $('.passdiv').addClass('hidden');
//                 $('.emaildiv').removeClass('hidden');
//                 $(this).text('Continue');
//                 return false;
//             }
            
//             // ONLY password check
//             if (passwordValue === '') {
//                $('.password-error').removeClass('hidden').text('Please Enter Password')
//                 passwordInput.focus();
//                 return false;
//             }
//                // Email AJAX check (ONLY Step 1)
//             var passwordcheck = PasswordCheck($('.passwordval').val());
            
      
//             if (!passwordcheck) {
               
//                  $('.password-error').removeClass('hidden').text('Password is Incorrect')
//                 return false;
//             }
//             // Submit form
//             $('#siginform')[0].submit();
//         }
//     });
    
    // Toggle password visibility
  $('.passdiv a').on('click', function(e) {
    e.preventDefault();

    var passwordInput = $(this).siblings('input[type="password"], input[type="text"]');
    
 
    var currentType = passwordInput.attr('type');
    var isPassword = currentType === 'password';
    
    passwordInput.attr('type', isPassword ? 'text' : 'password');
    $(this).find('img').attr('src', isPassword ? '/public/img/eye open.svg' : '/public/img/hide-password.svg');
});

    
//     // Enter key handlers
//     $('#siginform input[type="text"]').on('keypress', function(e) {
//         if (e.which === 13) {
//              e.preventDefault();
//             $('#siginform .emailcontinue').click();
//         }
//     });
    
//     $('#siginform input[type="password"]').on('keypress', function(e) {
//         if (e.which === 13) {
//              e.preventDefault();
//             $('#siginform .emailcontinue').click();
//         }
//     });
// });

// function EmailCheck(email) {
//     var result = false;
    
//     $.ajax({
//         url: "/checkemail",
//         type: "POST",
//         async: false,
//         data: { 
//             "email": email, 
//             "csrf": $("input[name='csrf']").val() 
//         },
//         dataType: "json",
//         cache: false,
//         success: function (data) {
//             result = data;  
       
//             $('.userid').val(result.userinfo.Id)
            
//         },
//         error: function() {
//             result = false; 
//         }
//     });
    
//     return result; 
// }
// function PasswordCheck(password) {
//     var result = false;
    
//     $.ajax({
//         url: "/checkpassword",
//         type: "POST",
//         async: false,
//         data: { 
//             "pass": password, 
//             "csrf": $("input[name='csrf']").val(),
//             "userid":$('.userid').val() 
//         },
//         dataType: "json",
//         cache: false,
//         success: function (data) {
//             result = data.pass;  

//         },
//         error: function() {
//             result = false; 
//         }
//     });
    
//     return result; 
// }


// singlepage login-latest updates//


//Remember me functionality 
$("#Check2").click(function () {

    if ($(this).is(":checked")) {
        $(this).val("1")

    } else {
        $(this).val("0")

    }
})

$(document).ready(function() {
    $('#usrid').keypress(function(event) {
        if (event.which === 32 && $(this).val().length === 0) {
            event.preventDefault();
        }
    });

    $('#passid').keypress(function(event) {
        if (event.which === 32 && $(this).val().length === 0) {
            event.preventDefault();
        }
    });
});

$(document).on('click', '.emailcontinue', function () {

   
    $('#pas-error').hide();
    $('#em-error').hide();
    $('#email-error').hide();
    $("form[name='siginform']").validate({
        rules: {
            emailid: {
                required: true,      
            },
            password: {
                required: true,
            }
        },
        messages: {
            emailid: {
                required: "* Please enter your emailid",
            },
            password: {
                required: "* Please enter your Password",

            }
        }
    })
    var formcheck = $("#siginform").valid();
    if (formcheck == true) {
                console.log("Dfdfdfdf")
        if ($("#Check2").val() == 0) {
            console.log($("#Check2").val());
            sessionStorage.setItem("rememberme", "0");
        } else {

            localStorage.setItem("rememberme", "1");
        }

        $('#siginform')[0].submit();
        $('.spinner-border').show()
    }
 

    return false
})

document.addEventListener("DOMContentLoaded", function () {

    var Cookie = getCookie("log-toast");
    var content = getCookie("pass-toast");
    var emailid = getCookie("emailid");

    console.log("fsrzg", Cookie);

    if (Cookie == "You+are+not+registered+with+us") {
        $('#emailid-error').show();
       
    }else if (Cookie == "This+account+is+inactive+please+contact+the+admin"){
        $('#emailid-error').show();
       
    } else if (content != "") {

        console.log("Dfdfdfdf")
        $("#usrid").val(emailid)
        $('#pas-error').removeClass('hidden')
        
    }

    delete_cookie("log-toast");
    delete_cookie("emailid");
    delete_cookie("pass-toast");
});
$(document).on('click', '#eye', function () {

    var This = $("#passid")

    if ($(This).attr('type') === 'password') {

        $(This).attr('type', 'text');

        $(this).find('img').attr('src', '/public/img/eye-opened.svg');
        

    } else {

        $(This).attr('type', 'password');

        $(this).find('img').attr('src', '/public/img/eye-closed.svg');
    }
})

$(document).on('keyup', ".field", function () {
    $('#em-error').hide();
    $('#email-error').hide();
    $('#pas-error').hide();
    $('#passgrp').removeClass('input-group-error');
    $('#usergrp').removeClass('input-group-error');
})


// const rmCheck = document.getElementById("Check2"),
//     emailInput = document.getElementById("usrid");

// if (localStorage.checkbox && localStorage.checkbox !== "") {
//   rmCheck.setAttribute("checked", "checked");
//   emailInput.value = localStorage.emailid;
// } else {
//   rmCheck.removeAttribute("checked");
//   emailInput.value = "";
// }

// function lsRememberMe() {
//   if (rmCheck.checked && emailInput.value !== "") {
//     localStorage.emailid = emailInput.value;
//     localStorage.checkbox = rmCheck.value;
//   } else {
//     console.log("uncehckkkk")
//     localStorage.emailid = "";
//     localStorage.checkbox = "";
//   }
// }

// delete the cookies and session storage



function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');

    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function delete_cookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
/**Form design */
let inputGroups = document.querySelectorAll('.input-group');
inputGroups.forEach(inputGroup => {
    
    let inputField = inputGroup.querySelector('input');

    inputField.addEventListener('focus', function (event) {
        if(event.target.id !== 'searchcatlist'){
            inputGroup.classList.add('input-group-focused');

        }
    });
    inputField.addEventListener('blur', function () {
        inputGroup.classList.remove('input-group-focused');
    });

});

$(document).ready(function() {
    $('#usrid').keypress(function(event) {
        if (event.which === 32 && $(this).val().length === 0) {
            event.preventDefault();
        }
    });

    $('#passid').keypress(function(event) {
        if (event.which === 32 && $(this).val().length === 0) {
            event.preventDefault();
        }
    });
});