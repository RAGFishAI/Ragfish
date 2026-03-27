var languagedata
var selectedcheckboxarr = []
var setstatus


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


/** */
$(document).ready(async function () {

    var languagepath = $('.language-group>button').attr('data-path')

    await $.getJSON(languagepath, function (data) {

        languagedata = data
    })
})

// focus for search data
$(document).keydown(function (event) {
    if (event.ctrlKey && event.key === '/') {
        $("#searchmember").focus().select();
    }
});

// Create new member rightside model open
$("#addmember , #clickadd").click(function () {
    // $("#title").text(languagedata.Memberss.addmember)
    // $("#showgroup").text(languagedata.Memberss.choosegroup)
    $('#showgroup').removeClass('text-bold').addClass('text-bold-gray')

    // $("#membergroupvalue").val(1)
    $("#mem_id").val("")
    $("#mem_name").val("")
    $("#mem_lname").val("")
    $("#mem_email").val("")
    $("#mem_mobile").val("")
    $("#mem_usrname").val("")
    $("#mem_activestat").val("")
    $("#membergroupid").val("")
    $("#memberimg").val("")
    $("#mem_pass").val("");
    $('#membergroupvalue').val('');


    $("#mem_name-error").hide()
    $("#mem_lname-error").hide()
    $("#mem_email-error").hide()
    $("#mem_mobile-error").hide()
    $("#mem_usrname-error").hide()
    $("#membergroupvalue-error").hide()
    $("#memberimg-error").hide()
    $("#mem_pass-error").hide()
    $("#con_pass-error").hide()
    $(".input-group").removeClass("input-group-error")
    $('input[type=hidden][name=crop_data]').val("")
    $(".name-string").hide()
    $("#Save").show()
    $("#update").hide()

})


// when close model then work this --(using calcel btn)
$("#modalId2").on("hide.bs.modal", function () {
    $("#myfile-error").addClass("hidden");
    $(".lengthErr").addClass("hidden");
    $("#profpic-mem").attr('src', '/public/img/default profile .svg');


})

// only allow numbers (mobile number validation)

$('#mem_mobile').keyup(function () {
    this.value = this.value.replace(/[^0-9\.]/g, '');
});


// delete btn
$(document).on('click', '#del', function () {
    var MemberId = $(this).attr("data-id")
    console
    $('#dynamicImage').attr('src', '/public/img/delete-icon.svg')
    $(".deltitle").text(languagedata.Memberss.deltitle)
    $('.delname').text($(this).parents('tr').find('#membername').text())
     $('.deldesc').text('Are you sure you want to delete this member')
     $('#dltCancelBtn').text("Cancel")
    $("#content").text(languagedata.Memberss.delmember)
    var url = window.location.search
    const urlpar = new URLSearchParams(url)
    pageno = urlpar.get('page')

    if (pageno == null) {
        console.log("varuthu");
        $('#delid').attr('href', '/user/deletemember?id=' + MemberId);

    } else {
        $('#delid').attr('href', '/user/deletemember?id=' + MemberId + "&page=" + pageno);

    }
})



// update membes
$(document).on('click', '#update', function () {
    var $btn = $(this);
    const originalText = $btn.html();
 
    // START LOADER - same style as your Save button
    $btn.addClass('saving disabled:pointer-events-none opacity-50 flex items-center justify-center')
        .prop('disabled', true);
 
    $btn.html(`
        <svg class="animate-spin -ml-1 h-4 w-4 mr-2 text-white inline"
             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
            </path>
        </svg>
        Updating...
    `);
    console.log("update console")
    $("#showgroup").text(languagedata.Memberss.defaultgroup)
    jQuery.validator.addMethod("duplicateemail", function (value) {

        var result;
        var mem_id = $("#mem_id").val()

        $.ajax({
            url: "/user/checkemailinmember",
            type: "POST",
            async: false,
            data: { "email": value, "id": mem_id, csrf: $("input[name='csrf']").val() },
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
        var mem_id = $("#mem_id").val()

        $.ajax({
            url: "/user/checknumberinmember",
            type: "POST",
            async: false,
            data: { "number": value, "id": mem_id, csrf: $("input[name='csrf']").val() },
            datatype: "json",
            caches: false,
            success: function (data) {
                result = data.trim();

            }
        })
        return result.trim() != "true"
    })

    jQuery.validator.addMethod("duplicatename", function (value) {

        var result;
        var mem_id = $("#mem_id").val()

        $.ajax({
            url: "/user/checknameinmember",
            type: "POST",
            async: false,
            data: { "name": value, "id": mem_id, csrf: $("input[name='csrf']").val() },
            datatype: "json",
            caches: false,
            success: function (data) {
                result = data.trim();

            }
        })
        return result.trim() != "true"
    })

    // $.validator.addMethod("mob_validator", function (value) {
    //     if (/^[6-9]{1}[0-9]{9}$/.test(value))
    //         return true;
    //     else return false;
    // }, "*" + languagedata.Memberss.memmobnumrgx);

   

    $.validator.addMethod("email_validator", function (value) {
        return /(^[a-zA-Z_0-9\.-]+)@([a-z]+)\.([a-z]+)(\.[a-z]+)?$/.test(value);
    }, '* ' + languagedata.Memberss.mememailrgx);

    jQuery.validator.addMethod("pass_validator", function (value, element) {
        if (value != "") {
            if (/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[\W_]).{8,}$/.test(value))
                return true;
            else return false;
        }
        else return true;
    }, "* " + languagedata.Memberss.mempswdrgx
    );

    jQuery.validator.addMethod("space", function (value, element) {
        return $.trim(value).length > 0;
    }, "* Enter valid content");

    $.validator.addMethod("noSpaceStart", function (value, element) {
        return this.optional(element) || value.trim() === value;
    }, "The first letter cannot be a space.");

    $.validator.addMethod("customLength", function (value, element, params) {
        var minLength = params[0];
        var maxLength = params[1];
        return this.optional(element) || (value.length >= minLength && value.length <= maxLength);
    }, $.validator.format("Please enter between {0} and {1} characters."));

    jQuery.validator.addMethod("pass_validator", function (value, element) {
        if (value != "") {
            if (/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[\W_]).{8,}$/.test(value))
                return true;
            else return false;
        }
        else return true;
    }, "* " + languagedata.Memberss.mempswdrgx
    );


console.log("top validate");


    $("#memberform").validate({
        ignore: [],
        errorPlacement: function (error, element) {

            if (element.attr("name") == "mem_pass") {
                error.insertAfter(element.closest("div"));
            } else {
                error.insertAfter(element);
            }
        },

        rules: {
            // prof_pic: {
            //     extension: "jpg|png|jpeg"
            // },
            mem_name: {
                required: true,
                space: true
            },
            mem_email: {
                required: true,
                email_validator: true,
                duplicateemail: true
            },
            mem_usrname: {
                required: true,
                space: true,
                duplicatename: true
            },
            mem_pass: {
                // required: true,
                pass_validator: true,
            }, membergroupvalue: {
                required: true
            },
           
            

        },
        messages: {
            // prof_pic: {
            //     extension: "* " + languagedata.profextension
            // },
            mem_name: {
                required: "* " + languagedata.Memberss.memfname,
                space: "* " + languagedata.spacergx
            },

            mem_email: {
                required: "* " + languagedata.Memberss.memmail,
                duplicateemail: "* " + languagedata.Memberss.emailexist
            },

            mem_usrname: {
                required: "* " + languagedata.Memberss.memname,
                space: "* " + languagedata.spacergx,
                duplicatename: "*" + languagedata.Memberss.membernamevaild
            },
            mem_pass: {
                required: "* " + languagedata.Memberss.mempswd
            }, membergroupvalue: {
                required: "* " + languagedata.memgroup
            },
            
           
        }
    })


    console.log("test 1");
    

    $("#profilename-error").hide();


    // $('input[name=mem_pass]').rules('remove', 'required')


    var formcheck = $("#memberform").valid();
    console.log("working this ");
    if (formcheck == true) {
        $('#memberform')[0].submit();
    } else {
        console.log(" not working this ");
        $('.input-field-group').each(function () {

            $(this).children('.input-group').each(function () {
                var inputField = $(this).find('input');

                if (!inputField.valid()) {
                    $(this).addClass('input-group-error');

                } else {
                    $(this).removeClass('input-group-error');
                }

            })
            if ($('#aboutcompany').hasClass('error')) {

                $('#aboutgrb').addClass('input-group-error')
            }
            if ($('#aboutcompany').hasClass('valid')) {

                $('#aboutgrb').removeClass('input-group-error')
            }
            if ($('#metadesc').hasClass('error')) {

                $('#descgrbmeta').addClass('input-group-error')
            }
            if ($('#metadesc').hasClass('valid')) {

                $('#descgrbmeta').removeClass('input-group-error')
            }

        });


        $(document).on('keyup', ".field", function () {

            if ($(this).hasClass('valid')) {

                $(this).parents('.input-group').removeClass('input-group-error')
            }

            if ($(this).hasClass('error')) {

                $(this).parents('.input-group').addClass('input-group-error')
            }


            Validationcheck()



        })

        Validationcheck()
    }

    return false
})

$(document).on("click", "el-option", function () {

    var selectedText = $(this).text().trim();   // option name
    var selectedId = $(this).data("id");        // data-id value

    // Update hidden input
    $("#membergroupvalue").val(selectedId);

    // Update visible selected text
    $("el-selectedcontent span").text(selectedText);

});



// savebtn
$("#Save").click(function () {
    var $btn = $("#Save");
    const originalText = $btn.html();

    $btn.addClass('saving disabled:pointer-events-none opacity-50 flex items-center justify-center')
        .prop('disabled', true);

    $btn.html(`
    <svg class="animate-spin -ml-1 h-4 w-4 mr-2 text-white inline"
         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
        </path>
    </svg>
    Saving...
`);

    jQuery.validator.addMethod("duplicateemail", function (value) {

        var result;
        var mem_id = $("#mem_id").val()

        $.ajax({
            url: "/user/checkemailinmember",
            type: "POST",
            async: false,
            data: { "email": value, "id": mem_id, csrf: $("input[name='csrf']").val() },
            datatype: "json",
            caches: false,
            success: function (data) {
                result = data.trim();
                console.log(data, "data");

            }
        })
        return result.trim() != "true"
    })

    jQuery.validator.addMethod("duplicatenumber", function (value) {

        var result;
        var mem_id = $("#mem_id").val()

        $.ajax({
            url: "/user/checknumberinmember",
            type: "POST",
            async: false,
            data: { "number": value, "id": mem_id, csrf: $("input[name='csrf']").val() },
            datatype: "json",
            caches: false,
            success: function (data) {
                result = data.trim();

            }
        })
        return result.trim() != "true"
    })

    jQuery.validator.addMethod("duplicatename", function (value) {

        var result;
        var mem_id = $("#mem_id").val()

        $.ajax({
            url: "/user/checknameinmember",
            type: "POST",
            async: false,
            data: { "name": value, "id": mem_id, csrf: $("input[name='csrf']").val() },
            datatype: "json",
            caches: false,
            success: function (data) {
                result = data.trim();

            }
        })
        return result.trim() != "true"
    })

    // $.validator.addMethod("mob_validator", function (value) {
    //     if (/^[6-9]{1}[0-9]{9}$/.test(value))
    //         return true;
    //     else return false;
    // }, "*" + languagedata.Memberss.memmobnumrgx);
    
    jQuery.validator.addMethod("mob_validator", function(value, element) {
        if (value.length >= 7)
        return true;
        else return false;
    }, "*"+ languagedata.Memberss.memmobnumrgx);

    $.validator.addMethod("email_validator", function (value) {
        return /(^[a-zA-Z_0-9\.-]+)@([a-z]+)\.([a-z]+)(\.[a-z]+)?$/.test(value);
    }, '* ' + languagedata.Memberss.mememailrgx);

    jQuery.validator.addMethod("pass_validator", function (value, element) {
        if (value != "") {
            if (/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[\W_]).{8,}$/.test(value))
                return true;
            else return false;
        }
        else return true;
    }, "* " + languagedata.Memberss.mempswdrgx
    );
    jQuery.validator.addMethod("space", function (value, element) {
        return $.trim(value).length > 0;
    }, "* Enter valid content");

  

    jQuery.validator.addMethod("confirm_pass_validator", function (value, element) {
        let password = $("#mem_pass").val()
        if (value != password) {
           
                return false;

        }
        return true;
    }, "* " + "Please Enter Correct Password" )

    // Form Validation

    $("#memberform").validate({
        ignore: [],
        errorPlacement: function (error, element) {

            if (element.attr("name") == "mem_pass" ||
                element.attr("name") == "con_pass") {
                error.insertAfter(element.closest("div"));
            } else {
                error.insertAfter(element);
            }
        },
        // errorPlacement: function (error, element) {

        //     if (element.attr("name") == "con_pass") {
        //         error.insertAfter(element.closest("div"));
        //     } else {
        //         error.insertAfter(element);
        //     }
        // },
        rules: {
            prof_pic: {
                extension: "jpg|png|jpeg"
            },
            mem_name: {
                required: true,
                space: true
            },
            mem_email: {
                required: true,
                email_validator: true,
                duplicateemail: true
            },
            mem_usrname: {
                required: true,
                space: true,
                duplicatename: true
            },
            mem_pass: {
                required: true,
                pass_validator: true,
            },
            mem_mobile: {
                required: true,
                mob_validator: true,
                duplicatenumber: true
            },
            membergroupvalue:{
                required: true
            },
            con_pass:{
                required :true,
                confirm_pass_validator:true
            }

        },
        messages: {
            prof_pic: {
                extension: "* " + languagedata.profextension
            },
            mem_name: {
                required: "* " + languagedata.Memberss.memfname,
                space: "* " + languagedata.spacergx
            },

            mem_email: {
                required: "* " + languagedata.Memberss.memmail,
                duplicateemail: "* " + languagedata.Memberss.emailexist
            },

            mem_usrname: {
                required: "* " + languagedata.Memberss.memname,
                space: "* " + languagedata.spacergx,
                duplicatename: "*" + languagedata.Memberss.membernamevaild
            },
            mem_pass: {
                required: "* " + languagedata.Memberss.mempswd
            },
            mem_mobile: {
                required: "* " + languagedata.Userss.usrmobnum,
                duplicatenumber: "* " + languagedata.Userss.mobnumexist,
            },
            membergroupvalue:{
                required: "* " + languagedata.memgroup
            },
            con_pass : {
                required : "*" + "Please Enter confirm Password",
                confirm_pass_validator :"*" + "Please Enter Correct password"

            }

        }
    })



    var formcheck = $("#memberform").valid();

    if (formcheck == true) {
        $('#memberform')[0].submit();
        $('#Save').prop('disabled', true);
    }
    else {
        $btn.prop('disabled', false)
            .removeClass('saving disabled:pointer-events-none opacity-50 flex items-center justify-center')
            .html(originalText);

        $(document).on('keyup', ".field", function () {
            Validationcheck()
        })
        $('.input-group').each(function () {
            var inputField = $(this).find('input');
            var inputName = inputField.attr('name');


            if (inputName !== 'membergroupvalue' && !inputField.valid()) {
                $(this).addClass('input-group-error');

            } else {
                $(this).removeClass('input-group-error');
            }
        });

    }

    return false
})

$(".dropdown-values").on("click", function () {
    var text = $(this).text()
    var id = $(this).attr("data-id")
    $(this).parents().siblings("a").text(text)
    $(this).parents().siblings("input[name='membergroupvalue']").val(id)
    if ($('#membergroupvalue').val() !== '') {
        $('#membergroupvalue-error').hide()
        $('.user-drop-down').removeClass('input-group-error')

    }
})


// Is_active

$("input[name=mem_activestat]").click(function () {
    if ($(this).prop('checked') == true) {
        $(this).attr("value", "1")
    } else {
        $(this).removeAttr("value")
    }
})

// Claim status
$("input[name=com_activestat]").click(function () {
    if ($(this).prop('checked') == true) {
        $(this).attr("value", "1")
    } else {
        $(this).removeAttr("value")
    }
})


// Email status
$("input[name=mem_emailactive]").click(function () {
    if ($(this).prop('checked') == true) {
        $(this).attr("value", "1")
    } else {
        $(this).removeAttr("value")
    }
})


// search functions strat //


/*search redirect home page */

$(document).on('keyup', '#searchmember', function (event) {
    const searchInput = $(this).val();

    if (event.key === 'Backspace' && window.location.href.indexOf("keyword") > -1) {

        if ($(this).val() == "") {

            window.location.href = "/user/";
        }
    }

    $('.searchClosebtn').toggleClass('hidden', searchInput === "");

})

$(document).on("click", ".Closebtn", function () {
    $(".search").val('')
    $(".Closebtn").addClass("hidden")
    $(".SearchClosebtn").removeClass("hidden")
    $(".srchBtn-togg").removeClass("pointer-events-none")
  })

  $(document).on("click", ".searchClosebtn", function () {
    $(".Searchmem").val('')
    window.location.href = "/user/"
  })

  $(document).ready(function () {

    $('.Searchmem').on('input', function () {

        if ($(this).val().length >= 1) {
            $(".Closebtn").removeClass("hidden")
            $(".srchBtn-togg").addClass("pointer-events-none")

        }else{
          $(".Closebtn").addClass("hidden")
          $(".srchBtn-togg").removeClass("pointer-events-none")

        }
    });
  })

  $(document).ready(function () {

    $('.search').on('input', function () {
        if ($(this).val().length >= 1) {
            var value=$(".search").val();
            $(".Closebtn").removeClass("hidden")
            $(".srchBtn-togg").addClass("pointer-events-none")
            $(".SearchClosebtn").addClass("hidden")
        } else {
            $(".SearchClosebtn").removeClass("hidden")
            $(".Closebtn").addClass("hidden")
            $(".srchBtn-togg").removeClass("pointer-events-none")
        }
    });
  })
  
  $(document).on("click", ".SearchClosebtn", function () {
    $(".SearchClosebtn").addClass("hidden")
    $(".transitionSearch").removeClass("w-[300px] justify-start p-2.5 border border-[#ECECEC] rounded-sm gap-3 overflow-hidden")
    $(".transitionSearch").addClass("w-[32px]")
  
    
  })
  
  $(document).on("click", ".searchopen", function () {
  
    $(".SearchClosebtn").removeClass("hidden")
    
  })


// search functions end //


// cancel btn
$("#cancel").click(function () {
    window.location.href = "/user/";
})

$(document).on('click', '#newdd-input', function () {
    $(this).siblings('.dd-c').css('display', 'block')
    $("#searchrole").val("");
})

// $('.page-wrapper').on('click', function (event) {
//     if ($('.dd-c').css('visibility') == 'visible' && !$(event.target).is('#newdd-input') && !$(event.target).is('.dd-c')) {
// $('#newdd-input').prop('checked',false)
// $('.dd-c').css('display','none')
//     }
// })


// $('#newdd-input').blur(function () {
//     if ($('#valmem').val() !== '') {
//         $(this).parents('.input-group').removeClass('validate')
//     }
//     $(this).parents('.input-group').removeClass('focus')

// })

function Validationcheck() {
    // let inputGro = document.querySelectorAll('.input-group');
    // inputGro.forEach(inputGroup => {
    //     let inputField = inputGroup.querySelector('input:not([name="membergroupvalue"])');


    //     if (inputField.classList.contains('error')) {
    //         inputGroup.classList.add('input-group-error');
    //     } else {
    //         inputGroup.classList.remove('input-group-error');
    //     }
    //     if ($('#membergroupvalue-error').css('display') !== 'none') {
    //         $('#memgrp').addClass('input-group-error')
    //     }
    //     else {
    //         $('#memgrp').removeClass('input-group-error')
    //     }
    // });
}


$(".chk-group").on("click", function () {
    var Selecttext = $(this).text()
    var Selectvalue = $(this).data('id')
    console.log("select group", Selecttext);
    $("#membergroupvalue").val(Selectvalue);
    $("#showgroup").text(Selecttext);
    $('#showgroup').addClass('text-bold').removeClass('text-bold-gray')
    $("#membergroupvalue-error").hide();

});


$(".chk-group1").on("click", function () {
    var selectValue1 = $(this).data('id');
    var Selecttext1 = $(this).text()
    $("#membergroupvalue1").val(selectValue1);
    $("#showgroup1").text(Selecttext1);
});


$(document).on("click", "#editmembergroup", function () {
    var url = window.location.search;
    const urlpar = new URLSearchParams(url);
    pageno = urlpar.get('page');
    if (pageno == null) {
        pageno = "1";
    }
    $("#memgrbpageno").val(pageno)
    var editUrl = $(this).attr("href");
    window.location.href = editUrl + "&page=" + pageno;
});


$(document).on("click","#editmem",function(){
        $("#formHeading").text("Edit User");

    var row = $(this).closest("tr");

    var id = $(this).data("id");
    var username = row.find(".usernameval").text().trim();
    var groupname = row.find(".groupnameval").data("groupname");
    var email = row.find(".emailval").text().trim();

    console.log("group nameee",groupname);
    

    var is_active = row.find("input[type='checkbox']").is(":checked");


    $("#mem_id").val(id);
    $("#mem_usrname").val(username);
    $("#mem_email").val(email);


    if(is_active) {
        $("#status31").prop("checked", true);
        $("#mem_activestat").val(1);
    } else {
        $("#status31").prop("checked", false);
        $("#mem_activestat").val(0);
    }


    $("el-option").each(function () {
        if ($(this).data("groupname") === groupname) {
            var groupId = $(this).data("id");

            $("#membergroupvalue").val(groupId);
            $("el-option").each(function () {
                if ($(this).data("groupname") === groupname) {
                    var groupId = $(this).data("id");
                    var isActive = $(this).data("active");

                    $("#membergroupvalue").val(groupId);

                    let content = "";

                    if (isActive == 1) {
                        content = `
            <span class="block truncate text-base leading-[19px] font-normal ml-0">
                ${groupname}
            </span>`;
                    } else {
                        content = `
            <div class="flex justify-between w-[480px]"> 
                <div>
                    <span class="block truncate text-base leading-[19px] font-normal ml-0">
                        ${groupname}
                    </span>
                </div>
                <div id="user_inactive">
                    <span class="flex items-center gap-1 text-[13px] text-[#202732]">
                        <img src="/public/img/soft_warning.svg" w-[15px] h-[15px] !block !visible" alt="Warning">
                        User Group Inactive
                    </span>
                </div>
            </div>`;
                    }

                    $("el-selectedcontent").html(content);
                }
            });
            
        }
    });

    $("#memberform").attr("action", "/user/updatemember");

    $("#update").show()
    $("#Save").hide()


})


$(document).on("click", "el-option", function () {
    const name = $(this).data("groupname");
    const isActive = $(this).data("active");

    let content = "";

    if (isActive == 1) {
        content = `<span class="block truncate text-base leading-[19px] font-normal ml-0">
            ${name}
        </span>`;
    } else {
        content = `<div class="flex justify-between w-[480px]"> 
        <div>
        <span class="block truncate text-base leading-[19px] font-normal ml-0">
            ${name}
        </span></div>
        <div>
        <span class="flex items-center gap-1 text-xs text-[#202732]">
           <img src="/public/img/soft_warning.svg" class="w-4 h-4 !block !visible" alt="Warning">
            User Group Inactive
        </span> </div>
        </div>`;
    }

    $("el-selectedcontent").html(content);
});




$("#searchrole").keyup(function () {
    var keyword = $(this).val().trim().toLowerCase()
    $(".choose-rel-articles .newck-group").each(function (index, element) {
        var title = $(element).find('h4').text().toLowerCase()
        if (title.includes(keyword)) {
            $(element).show()
        } else {
            $(element).hide()

        }
    })
})

function refreshdiv() {
    $('.choose-rel-articles').load(location.href + ' .choose-rel-articles');
}





$(document).on('click', '.closemember', function () {


    window.location.href = "/user/"
})

// pasword show and close

$(document).on('click', '#eye', function () {

    var This = $("#mem_pass")

    if ($(This).attr('type') === 'password') {

        $(This).attr('type', 'text');

        $(this).addClass('open')

        $("#img").attr("src", "/public/img/eye-opened.svg")

    } else {

        $(This).attr('type', 'password');

        $(this).removeClass('close')

        $("#img").attr("src", "/public/img/eye open.svg")

    }
})


// dropdown filter input box search
$("#searchmembergrp").keyup(function () {

    var keyword = $(this).val().trim().toLowerCase()
    console.log(keyword);
    $(".membergrp-list-row").each(function (index, element) {
        var title = $(element).text().toLowerCase()

        if (title.includes(keyword)) {
            $(element).show()
            $("#nodatafounddesign").addClass("hidden")

        } else {
            $(element).hide()
            if ($('.membergrp-list-row:visible').length == 0) {
                $("#nodatafounddesign").removeClass("hidden")
            }

        }
    })

})


$(document).on('click', '#myfile', function () {
    $("#prof-crop").val("1")
})

$(document).on('click', '#cmpymyfile', function () {

    $("#prof-crop").val("2")
})

$(document).on('click', "#profileImgLabel", function () {
    $("#prof-crop").val("3")
})

$(document).on('change', '#profileImgLabel', function () {
    $("#name-string span").remove();

    $("#name-string").append('<img name="profpicture" id="profpicture"/>');
});

$(document).on('change', '#profileImgLabel', function () {
    $("#mem-img").attr('id', 'profpicture').attr('name', 'profpicture')

});

// async function profilenamevalidator(){

//     $.ajax({
//         url: "/user/checkprofilenameinmember",
//         type: "POST",
//         async: false,
//         data: { "name": $("input[name='profilename']").val(), "id":  $("#mem_id").val(), csrf: $("input[name='csrf']").val() },
//         datatype: "json",
//         caches: false,
//         success: function (data) {

//             return data

//         }
//     })

//  }


function MemberStatus(id) {
    $('#cbox' + id).on('change', function () {
        console.log("printf");
        this.value = this.checked ? 1 : 0;
    }).change();
    var isactive = $('#cbox' + id).val();

    console.log("check", isactive, id)

    $.ajax({
        url: '/user/memberisactive',
        type: 'POST',
        async: false,
        data: { "id": id, "isactive": isactive, csrf: $("input[name='csrf']").val() },
        dataType: 'json',
        cache: false,
        success: function (result) {
            if (result) {

                notify_content = `<ul class="fixed top-[56px] right-[16px] z-[1000] grid gap-[8px]"><li><div class="toast-msg flex max-sm:max-w-[300px]  relative items-start gap-[8px] rounded-[2px] p-[12px_20px] border-l-[4px] border-[#278E2B] bg-[#E2F7E3]"> <a href="javascript:void(0)" class="absolute right-[8px] top-[8px]" id="cancel-notify"> <img src="/public/img/close-toast.svg" alt="close"> </a>` + `<div> <img src = "/public/img/toast-success.svg" alt = "toast success"></div> <div> <h3 class="text-[#278E2B] text-normal leading-[17px] font-normal mb-[5px] ">Success</h3> <p class="text-[#262626] text-[12px] font-normal leading-[15px] " >${languagedata.Toast.MemberStatusUpdatedSuccessfully}</p ></div ></div ></li></ul> `;
                $(notify_content).insertBefore(".header-rht");
                setTimeout(function () {
                    $('.toast-msg').fadeOut('slow', function () {
                        $(this).remove();
                    });
                }, 5000); // 5000 milliseconds = 5 seconds

            } else {

                notify_content = '<div class="toast-msg dang-red"><a id="cancel-notify" ><img src="/public/img/x-black.svg" alt="" class="rgt-img" /></a><img src="/public/img/danger-group-12.svg" alt="" class="left-img" /><span>' + languagedata.internalserverr + '</span></div>';
                $(notify_content).insertBefore(".header-rht");
                setTimeout(function () {
                    $('.toast-msg').fadeOut('slow', function () {
                        $(this).remove();
                    });
                }, 5000); // 5000 milliseconds = 5 seconds

            }
        }
    });
}


// select checkbox to purform actions

$(document).on('click', '.selectcheckbox', function () {

    memberid = $(this).attr('data-id')

    var status = $(this).parents('td').siblings('td').find('.tgl-light').val();


    var hasDelId = $(this).parents('td').siblings("td").find('#del').length > 0;
    var statusid = $(this).parents('td').siblings('td').find('.tgl-light').length >0


    if (hasDelId) {

        $('#seleccheckboxdelete').show()
    } else {
        $('#seleccheckboxdelete').hide()
    }

    if (statusid) {

        $('#unbulishslt').show()

    } else {
        $('#unbulishslt').hide()

        $('#seleccheckboxdelete').removeClass('border-r border-[#717171] mr-[8px] pr-[8px]')
    }

    if ($(this).prop('checked')) {

        selectedcheckboxarr.push({ "memberid": memberid, "status": status })


    } else {

        const index = selectedcheckboxarr.findIndex(item => item.memberid === memberid);

        if (index !== -1) {
            selectedcheckboxarr.splice(index, 1);
        }

        $('#Check').prop('checked', false)

    }


    if (selectedcheckboxarr.length != 0) {
        $('.selected-numbers').removeClass("hidden")

        if (selectedcheckboxarr.length == 1) {
            $('#deselectid').text(languagedata.deselect)
        } else if (selectedcheckboxarr.length > 1) {
            $('#deselectid').text(languagedata.deselectall)
        }

        var allSame = selectedcheckboxarr.every(function (item) {
            return item.status === selectedcheckboxarr[0].status;
        });

        var setstatus
        var img;


        if (selectedcheckboxarr[0].status === '1') {

            setstatus = languagedata.Memberss.deactive;

            img = "/public/img/In-Active.svg";

        } else if (selectedcheckboxarr[0].status === '0') {

            setstatus = languagedata.Memberss.active;

            img = "/public/img/Active.svg";

        }

        var htmlContent = '';

        if (allSame) {

            htmlContent = '<img style="width: 14px; height: 14px;" src="' + img + '" >' + '<span class="max-sm:hidden @[550px]:inline-block hidden">' + setstatus + '</span>';


        } else {

            htmlContent = '';

        }

        $('#unbulishslt').html(htmlContent);


    var items

    if (selectedcheckboxarr.length==1){

        items ="Item Selected"
    }else{

        items = languagedata.itemselected
    }
    $('.checkboxlength').text(selectedcheckboxarr.length + " " + items)


        if (!allSame || !statusid) {

            $('#seleccheckboxdelete').removeClass('border-r border-[#717171] mr-[8px] pr-[8px]')

            $('.unbulishslt').html("")
        } else {

            $('#seleccheckboxdelete').addClass('border-r border-[#717171] mr-[8px] pr-[8px]')
        }


    } else {

        $('.selected-numbers').addClass("hidden")
    }

    var allChecked = true;

    $('.selectcheckbox').each(function () {

        if (!$(this).prop('checked')) {

            allChecked = false;

            return false;
        }
    });

    $('#Check').prop('checked', allChecked);

})



//  //ALL CHECKBOX CHECKED FUNCTION//

$(document).on('click', '#Check', function () {

    selectedcheckboxarr = []
    var isChecked = $(this).prop('checked');

    if (isChecked) {

        $('.selectcheckbox').prop('checked', isChecked);

        $('.selectcheckbox').each(function () {

            memberid = $(this).attr('data-id')

            var status = $(this).parents('td').siblings('td').find('.tgl-light').val();

            selectedcheckboxarr.push({ "memberid": memberid, "status": status })
        })
        if (selectedcheckboxarr.length == 0) {
            $('.selected-numbers').addClass('hidden');
        } else {
            const deselectText = selectedcheckboxarr.length == 1 ? languagedata.deselect : languagedata.deselectall;
            $('#deselectid').text(deselectText);
            $('.selected-numbers').removeClass('hidden');
        }


        var allSame = selectedcheckboxarr.every(function (item) {

            return item.status === selectedcheckboxarr[0].status;
        });


        var img

        if (selectedcheckboxarr.length > 0 && selectedcheckboxarr[0].status !== undefined) {
            if (selectedcheckboxarr[0].status === '1') {
                setstatus = languagedata.Memberss.deactive;
                img = "/public/img/In-Active.svg";
            } else if (selectedcheckboxarr[0].status === '0') {
                setstatus = languagedata.Memberss.active;
                img = "/public/img/Active.svg";
            }
        } else {
            console.error("selectedcheckboxarr is empty or status is undefined.");
        }

        var htmlContent = '';

        if (allSame) {

            htmlContent = '<img style="width: 14px; height: 14px;" src="' + img + '" >' + '<span class="max-sm:hidden @[550px]:inline-block hidden">' + setstatus + '</span>';

            $('#seleccheckboxdelete').addClass('border-r border-[#717171] mr-[8px] pr-[8px]')

        } else {

            htmlContent = '';

            $('#seleccheckboxdelete').removeClass('border-r border-[#717171] mr-[8px] pr-[8px]')

        }

        $('#unbulishslt').html(htmlContent);

        $('.checkboxlength').text(selectedcheckboxarr.length + " " + languagedata.Memberss.itemsselected)

    } else {
        $('.selected-numbers').addClass("hidden")

        selectedcheckboxarr = []

        $('.selectcheckbox').prop('checked', isChecked);
    }


})

// ------------------------------------------------------------------

// delete model cuntent updations

$(document).on('click', '#seleccheckboxdelete', function () {

    if (selectedcheckboxarr.length > 1) {

        $('.deltitle').text(languagedata.Memberss.deletemembers)

        $('#content').text(languagedata.Memberss.deletecontents)

    } else {

        $('.deltitle').text(languagedata.Memberss.deletemember)

        $('#content').text(languagedata.Memberss.deletecontent)
    }
    $('#dynamicImage').attr('src', '/public/img/delete-icon.svg')

    $("#delid").text($(this).text());
    $('#delid').addClass('checkboxdelete')
})


// status model content updations

$(document).on('click', '#unbulishslt', function () {

    if (selectedcheckboxarr.length > 1) {

        $('.deltitle').text($(this).text() + " " + languagedata.Memberss.memberstitle)

        $('#content').text(languagedata.Memberss.memberstatuscontent + " " + $(this).text() + " " + languagedata.Memberss.selectedmembers)
    } else {

        $('.deltitle').text($(this).text() + " " + languagedata.Memberss.membertitle)

        $('#content').text(languagedata.Memberss.memberstatuscontent + " " + $(this).text() + " " + languagedata.Memberss.selectedmember)
    }
    $('#dynamicImage').attr('src', '/public/img/info-icon.svg')

    $("#delid").text($(this).text());

    $('#delid').addClass('selectedunpublish')

})


// remove datas when delete model close

$("#deleteModal").on("hide.bs.modal", function () {
    $('#delid').removeClass('checkboxdelete');
    $('#delid').removeClass('selectedunpublish');
    $('#delid').attr('href', '');
    $('.delname').text("");
})


//MULTI SELECT DELETE FUNCTION//
$(document).on('click', '.checkboxdelete', function () {

    var url = window.location.href;

    console.log("url", url)

    var pageurl = window.location.search

    const urlpar = new URLSearchParams(pageurl)

    pageno = urlpar.get('page')

    $('.selected-numbers').hide()
    $.ajax({
        url: '/user/deleteselectedmember',
        type: 'post',
        dataType: 'json',
        async: false,
        data: {
            "memberids": JSON.stringify(selectedcheckboxarr),
            csrf: $("input[name='csrf']").val(),
            "page": pageno

        },
        success: function (data) {

            console.log(data, "result")

            if (data.value == true) {

                setCookie("get-toast", "Member Deleted Successfully")

                window.location.href = data.url
            } else {

                // setCookie("Alert-msg", "Internal Server Error")

                window.location.href = data.url

            }

        }
    })

})


//Deselectall function//

$(document).on('click', '#deselectid', function () {

    $('.selectcheckbox').prop('checked', false)

    $('#Check').prop('checked', false)

    selectedcheckboxarr = []

    $('.selected-numbers').addClass("hidden")

})


//multi select active and deactive function//

$(document).on('click', '.selectedunpublish', function () {

    var url = window.location.href;

    console.log("url", url)

    var pageurl = window.location.search

    const urlpar = new URLSearchParams(pageurl)

    pageno = urlpar.get('page')

    $('.selected-numbers').hide()
    $.ajax({
        url: '/user/multiselectmemberstatus',
        type: 'post',
        dataType: 'json',
        async: false,
        data: {
            "memberids": JSON.stringify(selectedcheckboxarr),
            csrf: $("input[name='csrf']").val(),
            "page": pageno


        },
        success: function (data) {

            console.log(data, "result")

            if (data.value == true) {

                setCookie("get-toast", "memstatusnotify")

                window.location.href = data.url
            } else {

                setCookie("Alert-msg", "Internal Server Error")

            }

        }
    })

})

$("#show_password").on("click", function () {

    var input = $("#mem_pass");
    var icon = $(this).find("img")

    if (input.attr("type") === "password") {
        input.attr("type", "text"); 
        icon.attr("src", "/public/img/eye open.svg");
    } else {
        input.attr("type", "password"); 
        icon.attr("src", "/public/img/password.svg"); 
    }

});


$("#confirm_pass").on("click", function () {

    var input = $("#con_pass");
    var icon = $(this).find("img")

    if (input.attr("type") === "password") {
        input.attr("type", "text");
        icon.attr("src", "/public/img/eye open.svg");
    } else {
        input.attr("type", "password");
        icon.attr("src", "/public/img/password.svg");
    }

});


$('#profile-slugData').on('input', function (event) {

    var inputvalue = $(this).val()

    var smallcase = inputvalue.toLowerCase()

    var modifiedText = smallcase.replace(/ /g, '-');

    $(this).val(modifiedText)
})



$(document).on('click', '.claimupdate', function () {

    var memberid = $(this).attr('data-id')

    console.log("claim mem id", memberid);

    $("#memberid").val(memberid)

    GetMemberDetails(memberid)

})


function GetMemberDetails(memberid) {
    console.log("work");

    $.ajax({
        url: '/user/getmemberdetails',
        type: 'post',
        dataType: 'json',
        async: false,
        data: {
            "memberid": memberid,
            csrf: $("input[name='csrf']").val()
        },
        success: function (data) {

            if (data.flg == false) {

                setCookie("Alert-msg", "Internal Server Error")
                window.location.href = data.url
            } else {

                $("#claim-companyname").text(data.memberprofile.CompanyName);
                $("#claim-companylocation").text(data.memberprofile.CompanyLocation);
                $("#claim-profilename").text(data.memberprofile.ProfileName);
                $("#claim-profileslug").text(data.memberprofile.ProfileSlug);
                $("#claim-email").text(data.member.Email);
                $("#claim-number").text(data.member.MobileNo);
                $("#claim-dateofclaim").text(data.memberprofile.Website)
                $("#claim-companylogo").attr('src', data.memberprofile.CompanyLogo)
                if (data.memberprofile.ClaimStatus == 1) {
                    $("#claimb1").prop('checked', true)
                    $("#claim-heading").text("Already Claimed")
                    // $("#updateclaim").attr('disabled',true).css('opacity','0.5')
                } else {
                    $("#claimb1").prop('checked', false)
                    $("#claim-heading").text("Activate Claim")
                    // $("#updateclaim").attr('disabled',false).css('opacity','1')
                    // $('#updateclaim').attr('data-bs-dismiss','')
                }
            }
        }
    })
}




//profile slug function
$('#companyname').keyup(function () {

    var companyName = $(this).val();

    var cleanedCompanyName = companyName.replace(/[^a-zA-Z0-9\s]/g, '');

    $(this).val(cleanedCompanyName);

    var profileSlug = cleanedCompanyName.trim().replace(/\s+/g, '-').toLowerCase();

    $('#profile-slugData').val(profileSlug);

});


// first name and last name limit of 25 char
$(document).on('keyup', '.checklength', function () {

    var inputVal = $(this).val()

    var inputLength = inputVal.length

    if (inputLength == 25) {
        $(this).siblings('.lengthErr').removeClass('hidden')
    } else {
        $(this).siblings('.lengthErr').addClass('hidden')
    }
})

function MemberStatus(id) {
    $('#cb' + id).on('change', function () {
        this.value = this.checked ? 1 : 0;
    }).change();
    var isactive = $('#cb' + id).val();

    $.ajax({
        url: '/user/memberisactive',
        type: 'POST',
        async: false,
        data: { "id": id, "isactive": isactive, csrf: $("input[name='csrf']").val() },
        dataType: 'json',
        cache: false,
        success: function (result) {
            if (result) {

                notify_content = `<ul class="fixed top-[56px] right-[16px] z-[1000] grid gap-[8px]"><li><div class="toast-msg flex max-sm:max-w-[300px]  relative items-start gap-[8px] rounded-[2px] p-[12px_20px] border-l-[4px] border-[#278E2B] bg-[#E2F7E3]"> <a href="javascript:void(0)" class="absolute right-[8px] top-[8px]" id="cancel-notify"> <img src="/public/img/close-toast.svg" alt="close"> </a>` + `<div> <img src = "/public/img/toast-success.svg" alt = "toast success"></div> <div> <h3 class="text-[#278E2B] text-normal leading-[17px] font-normal mb-[5px] ">Success</h3> <p class="text-[#262626] text-[12px] font-normal leading-[15px] " > </p ></div ></div ></li></ul> `;
                $(notify_content).insertBefore(".header-rht");
                setTimeout(function () {
                    $('.toast-msg').fadeOut('slow', function () {
                        $(this).remove();
                    });
                }, 5000); // 5000 milliseconds = 5 seconds

            } else {

                notify_content = '<div class="toast-msg dang-red"><a id="cancel-notify" ><img src="/public/img/x-black.svg" alt="" class="rgt-img" /></a><img src="/public/img/danger-group-12.svg" alt="" class="left-img" /><span>' + + '</span></div>';
                $(notify_content).insertBefore(".header-rht");
                setTimeout(function () {
                    $('.toast-msg').fadeOut('slow', function () {
                        $(this).remove();
                    });
                }, 5000); // 5000 milliseconds = 5 seconds

            }
        }
    });
}

$("#dialog").on("close", function () {

    
    $("#memberform")[0].reset();

   
    // $("#membergroup_id").val("");

  
    $("#formHeading").text("Create User");

    $("#membergroup_form").attr("action", "/user/newmember");

   
    $("#status_value").val("0");

    $("#Save").show()
    $("#update").hide()


    $("#membergroupvalue").val(""); // hidden input
    $("el-selectedcontent span").text("Select user group");

    $("#user_inactive").remove();

});

// $(document).on("click", "#item-8", function (e) {
//     e.preventDefault();
//     e.stopPropagation(); // important!
//     $("#filterusergroup").toggleClass("opacity-100 visible");
// });

// $(document).on("click", "#filterusergroup", function (e) {
//     e.preventDefault();
//     e.stopPropagation();
// });


$(document).ready(function () {

    // Toggle main menu
    $(document).on("click", "#menu-button-13", function (e) {
        e.preventDefault();
        e.stopPropagation();
        $("#mainFilterMenu").toggleClass("opacity-100 visible").toggleClass("opacity-0 invisible");
    });

    // Toggle User Group submenu
    $(document).on("click", "#item-8", function (e) {
        e.preventDefault();
        e.stopPropagation();
        $("#filterusergroup").toggleClass("opacity-100 visible").toggleClass("opacity-0 invisible");

        $("#filterstatus").removeClass("opacity-100 visible").addClass("opacity-0 invisible");
    });

    // Toggle Status submenu
    $(document).on("click", "#statusfilterbtn", function (e) {
        e.preventDefault();
        e.stopPropagation();
        $("#filterstatus").toggleClass("opacity-100 visible").toggleClass("opacity-0 invisible");
        
        $("#filterusergroup").removeClass("opacity-100 visible").addClass("opacity-0 invisible");
    });

    // Prevent clicks inside submenus from closing menu
    $(document).on("click", "#filterusergroup, #filterstatus", function (e) {
        e.stopPropagation();
    });

    // Close menus when clicking outside
    $(document).on("click", function () {
        $("#mainFilterMenu, #filterusergroup, #filterstatus")
            .removeClass("opacity-100 visible")
            .addClass("opacity-0 invisible");
    });

    // Optional: handle checkbox click
    $(document).on("change", ".filechoosediv", function () {
        console.log("Selected group ID:", $(this).data("id"));
    });

    // Optional: handle group button click
    $(document).on("click", ".filter_role", function () {
        console.log("Clicked group:", $(this).text().trim());
    });

    // Optional: handle status button click
    $(document).on("click", ".filter_status", function () {
        $("#statusfilter").val($(this).data("status"));
        // $(".statusfilterform").submit();
    });

});


// model status update 

$("#status31").on("change", function () {

    if ($(this).is(":checked")) {
        $("#mem_activestat").val(1);
    } else {
        $("#mem_activestat").val(0);
    }

});



    $(".filter_role").on("click",function(){
        $(this).text()
        var cleanedText = $(this).text().replace(/[\r\n]+/g, ' ').trim(); 

        $("#rolemember").val(cleanedText)
        console.log("sss",$(this).text())
    })


$(".filter_status").on("click", function () {
    $(this).text()
    var cleanedText = $(this).text().replace(/[\r\n]+/g, ' ').trim();

    $("#statusfilter").val(cleanedText)
    console.log("sss", $(this).text())
})



$("#clearfilter").on("click",function(){
    window.location.href ="/user/"
})

