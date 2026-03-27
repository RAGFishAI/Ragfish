
// $(document).ready(function () {

//     $('#update_email_button').on('click', function (event) { 
        
//         $("#Passerr").remove()
        
//         $("#emailerr").remove()
        

//         event.preventDefault(); 

//         let  isvalid = true


//         email = $("#email").val()

//         emailrex = /(^[a-zA-Z_0-9\.-]+)@([a-z]+)\.([a-z]+)(\.[a-z]+)?$/

//         emailcheck = emailrex.test(email)
//         console.log("adfuj", emailcheck);

//         let password = $("#password").val()

//         if (password && password.trim() !== ""){

//         $.ajax({
//             type: "POST",
//             url: "/settings/checkpassword",
//             data: { pass: $("#password").val(), csrf: $("input[name='csrf']").val() },
//             success: function (response) {
//                 console.log("response",response.pass);
                
//                 if (!response.pass) {

//                     isvalid = false
                 
//                     $("#password_div").append("<p id='Passerr'>* Password incorrect</p>")
//                 }

              
//             }
//         });
//     }  else {
//             isvalid = false
//             $("#password_div").append("<p id='Passerr'>* Please Enter Password </p>")

//     }


//         // emailcheck

//         if (email && email.trim() !== "") {

//             if (!emailcheck) {
//                 isvalid = false
//                 $("#email_div").append("<p id='emailerr'>* Please Enter Valid Email</p>")

//             }
//         } else {
//             $("#email_div").append("<p id='emailerr'>* Please Enter New Email</p>")
//             isvalid = false

//         }

//         // chack from valid

//         if (isvalid) {
//             console.log("from valid");

//             // $('#change_email_from')[0].submit();


//         }

        


//     })
// })

$(document).ready(function () {

    $('#update_email_button').on('click', function (event) {

        event.preventDefault();

        $("#Passerr").remove();
        $("#emailerr").remove();

        let isValid = true;

        let email = $("#email").val();
        let password = $("#password").val();

        // Email validation
        if (!email || email.trim() === "") {
            $("#email_div").append("<label id='emailerr' class='error'>* Please Enter New Email</label>");
            isValid = false;
        } else {

            emailrex = /(^[a-zA-Z_0-9\.-]+)@([a-z]+)\.([a-z]+)(\.[a-z]+)?$/
            emailcheck = emailrex.test(email)
            if (!emailcheck) {
                $("#email_div").append("<label id='emailerr' class='error'>* Please Enter Valid Email</label>");
                isValid = false

            }
        }


        if (!password || password.trim() === "") {
            $("#password_div").append("<label id='Passerr' class='error'>* Please Enter Password</label>");
            isValid = false;
        }


        if (!isValid) return;


        $.ajax({
            type: "POST",
            url: "/settings/checkpassword",
            data: {
                pass: password,
                csrf: $("input[name='csrf']").val()
            },
            success: function (response) {
                console.log("response", response.pass)

                if (!response.pass) {
                    $("#password_div").append("<label id='Passerr' class='error'>* Password incorrect</label>");
                } else {
                    console.log("else working");

                    $('#change_email_form')[0].submit();



                }
            }
        });

    });

});

$(document).ready(function () {
    $("#cancel_button").on("click", function () {
        window.location.href = "/settings/myprofile"
    })
})