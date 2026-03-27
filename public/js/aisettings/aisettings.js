var selectedcheckboxarr = []

var languagedata
var modelarr =[]

$(document).ready(async function () {

     var languagepath = $('.language-group>button').attr('data-path')

     await $.getJSON(languagepath, function (data) {

          languagedata = data
        
     })

})
$("#Save").on("click", function (event) {  
    
    
   jQuery.validator.addMethod("duplicateprovider", function (value) {

      var result;
      id = $("#moduleid").val()
      $.ajax({
        url: "/settings/aisettings/checkprovider",
        type: "POST",
        async: false,
        data: { "provider": value, "id": id, csrf: $("input[name='csrf']").val() },
        datatype: "json",
        caches: false,
        success: function (data) {

          result = data.trim();
        }
      })
      return result.trim() != "true"
    })
    $("#aisettingscreate").validate({

        ignore: [],

        rules: {
            aimodule:{
             duplicateprovider:true
            },
            apikey: {
                required: true
            },
            apimodel: {
                required: true

            }

        },
        messages: {
             aimodule:{
             duplicateprovider:"*This Provider already Exists"
            },
            apikey: {
                required: languagedata.AImodulesettings.apikeyplaceholder

            },
            apimodel: {
                required: languagedata.AImodulesettings.aimodelerr

            }

        }
    });

    var formcheck = $("#aisettingscreate").valid();

    console.log("formcheck:", formcheck);

    if (formcheck) {

        $("#aisettingscreate").submit();

    }

});

$(".Cancelbtn").on("click", function () {

    $("#modalTitleId").text("Create New AI Module")

    $("#aisettingscreate").attr("action", "/settings/aisettings/create");

    $("#Save").text("Save")

    $("#moduleid").val('')

    $("#aimodule").val("openai")

    $("#apikey").val('');

    $("textarea[name=desc]").text('');

    $("#apimodel").val('')

    $("#triggerspan").text('select');

    $('#aisettingscreate')[0].reset()

    $('#apikey-error').hide()

    $('#apimodel-error').hide()

    $('#aimodule-error').hide()

    $('#openai').trigger("click")

})

$(document).on('click', '.aimodule', function () {
    modelarr = []; // Fixed: Empty array instead of [""] to avoid extra comma

    var id = $(this).data("id");
    var value = $(this).data("value");
    
    console.log("id:", id, "value:", value);

    $("#aimodule").val(value);


    $('.dropdown-item input[type="checkbox"]').prop('checked', false);

    
    $('.openailist, .claudelist').addClass("hidden");
    
    if (id == 1) {
        $('.openailist').removeClass("hidden");
    } else if (id == 3) {
        $('.claudelist').removeClass("hidden");
    }

   
    $("#apimodel").val("");
});


$(document).on("click", ".dropdown-item", function (e) {
    e.stopPropagation();  // Key: stops click from bubbling to button/popover

    var $item = $(this);
    var value = $item.find('span').text().trim();
    var $checkbox = $item.find('input[type="checkbox"]');
    var isChecked = $checkbox.is(':checked');
    
    if (isChecked) {
       
        if (modelarr.indexOf(value) === -1) {
            modelarr.push(value);
        }
    } else {

        var index = modelarr.indexOf(value);
        if (index > -1) {
            modelarr.splice(index, 1);
        }
    }
    
    console.log("modelarr:", modelarr);
    
   
    var cleanArray = modelarr.filter(item => item && item.trim() !== ''); 
    $("#apimodel").val(cleanArray.join(", "));
    
    $("#apimodel-error").hide();
    // KEEP DROPDOWN OPEN - prevent popover close
    const popover = document.querySelector('#listbox-3');
    popover && popover.setAttribute('open', '');
});



$(document).ready(function () {

    var $textarea = $('#desc');

    var $errorMessage = $('#error-messagedesc');

    var maxLength = 250;
    
    $textarea.on('input', function () {

        if ($(this).val().length >= maxLength) {

            $errorMessage.text("Maximum 250 character allowed");

        } else {

            $errorMessage.text('');
            
        }
    });

});


$(document).on("click", "#editmodule", function () {

    $("#modalTitleId").text("Edit AI Module")

    $("#Save").text("Update")

    $("#aisettingscreate").attr("action", "/settings/aisettings/update");

    var id = $(this).data("id")

    $("#moduleid").val(id)

    edit = $(this).closest("tr");

    var module = $(this).data("aimodule")

    $("#aimodule").val(module.trim())

    var apiKey = $(this).data("key")

    $("#apikey").val(apiKey.trim())

    var desc = edit.find("td:eq(2)").text();

    $("textarea[name=desc]").text(desc.trim());

    var model = $(this).data("model")

    console.log("model:", model);

   console.log("module:", module.trim());
   
    if (module.trim() == "openai") {

        $('#openai').trigger("click")

        $('.openailist').removeClass("hidden")

        $('.claudelist').addClass("hidden")

    } else if (module.trim() == "geminiai") {

        $('#openai').addClass("hover:border-[#10A37F]")

        $('.dropdown-item1').text('Gemini 2.0 Flash-Lite');

        $('.dropdown-item2').text('Gemini 1.5 Flash');

    } else if (module.trim() == "deepseekai") {

        $('#openai').addClass("hover:border-[#10A37F]")

        $('.dropdown-item1').text('DeepSeek R1');

        $('.dropdown-item2').text('DeepSeek V3');

    }else   if (module.trim() == "claudeai") {
       
        $('#claudeai').trigger("click")

        $('.openailist').addClass("hidden")

        $('.claudelist').removeClass("hidden")

    } 

    $("#apimodel").val(model.trim())

  // NEW: Check checkboxes based on saved models and populate array
    modelarr = []; // Reset array
    
    // Split saved models into array
    var savedModels = model.split(',').map(function(item) {
        return item.trim();
    });

    // Check matching checkboxes and populate array
    $('.dropdown-item').each(function() {
        var checkboxText = $(this).find('span').text().trim();

        console.log("checkboxText:", checkboxText, "savedModels:", savedModels);
        var $checkbox = $(this).find('input[type="checkbox"]');
        
        if (savedModels.includes(checkboxText)) {
            $checkbox.prop('checked', true);
            modelarr.push(checkboxText); // Add to array for consistency
        } else {
            $checkbox.prop('checked', false);
        }
    });

    

 


})



function SubscriptionStatus(id) {


    $('#check' + id).on('change', function () {

        this.value = this.checked ? 1 : 0;

    }).change();

    var isactive = $('#check' + id).val()

    console.log("isactive:", isactive, id);

    $.ajax({
        url: '/settings/aisettings/status',
        type: 'POST',
        async: false,
        data: { "id": id, "isactive": isactive, csrf: $("input[name='csrf']").val() },
        dataType: 'json',
        cache: false,
        success: function (result) {

            if (result.value) {

                // setCookie("get-toast", "Status Changed Successfully")

                window.location.href = result.url

            } else {

                setCookie("Alert-msg", "Internal Server Error")

                window.location.href = result.url

            }
        }
    });


}

//single delete

$(document).on('click', '#delete-btn', function () {

    var Id = $(this).attr("data-id")

    $(".deldesc").text("Are you sure you want to delete this Module?")

    var url = window.location.search

    const urlpar = new URLSearchParams(url)

    pageno = urlpar.get('page')

    if (pageno == null) {

        $('#delid').attr('href', "/settings/aisettings/delete/" + Id);

    } else {

        $('#delid').attr('href', "/settings/aisettings/delete/" + Id + "?page=" + pageno);

    }
    $(".deltitle").text("Delete AI Settings Module?")

    $('.delname').text($(this).parents('tr').find('td:eq(1)').text())

})

//multi delete

$(document).on('click', '.selectcheckbox', function () {

    $(".multidelete").addClass("responsive-width")

    $('#unbulishslt').hide()

    $('#seleccheckboxdelete').removeClass('border-r');

    moduleid = $(this).attr('data-id')


    if ($(this).prop('checked')) {

        selectedcheckboxarr.push(moduleid)

    } else {

        const index = selectedcheckboxarr.indexOf(moduleid);

        if (index !== -1) {

            selectedcheckboxarr.splice(index, 1);
        }

        $('#Check').prop('checked', false)

    }


    if (selectedcheckboxarr.length != 0) {

        $('.selected-numbers').removeClass('hidden')

        var items

        if (selectedcheckboxarr.length == 1) {

            items = "Item Selected"
        } else {

            items = languagedata.itemselected
        }

        $('.checkboxlength').text(selectedcheckboxarr.length + " " + items)

        $('#seleccheckboxdelete').removeClass('border-end')

        $('.unbulishslt').html("")

        if (selectedcheckboxarr.length > 1) {

            $('#deselectid').text("Deselect All")

        } else {

            $('#deselectid').text("Deselect")
        }

    } else {

        $('.selected-numbers').addClass('hidden')
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

//ALL CHECKBOX CHECKED FUNCTION//

$(document).on('click', '#Check', function () {

    $(".multidelete").addClass("responsive-width")

    $('#unbulishslt').hide()

    $('#seleccheckboxdelete').removeClass('border-r');

    selectedcheckboxarr = []

    var isChecked = $(this).prop('checked');

    if (isChecked) {

        $('.selectcheckbox').prop('checked', isChecked);

        $('.selectcheckbox').each(function () {

            moduleid = $(this).attr('data-id')

            selectedcheckboxarr.push(moduleid)
        })

        $('.selected-numbers').removeClass('hidden')

        var items

        if (selectedcheckboxarr.length == 1) {

            items = "Item Selected"

        } else {

            items = languagedata.itemselected

        }

        $('.checkboxlength').text(selectedcheckboxarr.length + " " + items)

    } else {


        selectedcheckboxarr = []

        $('.selectcheckbox').prop('checked', isChecked);

        $('.selected-numbers').addClass('hidden')
    }

    if (selectedcheckboxarr.length == 0) {

        $('.selected-numbers').addClass('hidden')
    }


})



$(document).on('click', '#seleccheckboxdelete', function () {

    if (selectedcheckboxarr.length > 1) {

        $('.deltitle').text("Delete AI Model?")

        $('#content').text('Are you sure want to delete selected AI Models?')

    } else {

        $('.deltitle').text("Delete AI Model?")

        $('#content').text('Are you sure want to delete selected AI Models?')
    }

    $('#delid').addClass('checkboxdelete')
})

//MULTI SELECT DELETE FUNCTION//
$(document).on('click', '.checkboxdelete', function () {

    var url = window.location.href;

    var pageurl = window.location.search

    const urlpar = new URLSearchParams(pageurl)

    pageno = urlpar.get('page')


    $('.selected-numbers').hide()
    $.ajax({
        url: '/admin/settings/aisettings/multiselectdelete',
        type: 'post',
        dataType: 'json',
        async: false,
        data: {
            "moduleids": selectedcheckboxarr,
            csrf: $("input[name='csrf']").val(),
            "page": pageno


        },
        success: function (data) {

            if (data.value == true) {

                setCookie("get-toast", "AI Module Deleted Successfully")

                window.location.href = data.url

            } else {

                setCookie("Alert-msg", "Internal Server Error")

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

    $('.selected-numbers').addClass('hidden')

})

//Search functions

$(document).on("click", ".Closebtn", function () {

    $(".search").val('')

    $(".Closebtn").addClass("hidden")

    $(".SearchClosebtn").removeClass("hidden")

    $(".srchBtn-togg").removeClass("pointer-events-none")

})

$(document).on("click", ".searchClosebtn", function () {

    $(".search").val('')

    window.location.href = "/admin/settings/aisettings/"

})

$(document).ready(function () {

    $('.search').on('input', function () {

        if ($(this).val().length >= 1) {

            var value = $(".search").val();

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



