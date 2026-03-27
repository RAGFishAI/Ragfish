
$(document).ready(function () {

    $('#claude_status').on('click', function (event) {
        const $this = $(this);
        console.log("sdh",);
        provider = $(this).attr("Provider")
        assistantid = $(this).attr("AssistantId")
        providerid = $(this).attr("ProviderId")
        csrf =$(this).attr("csrf")
        const active_status = $(this).is(':checked') ? 1 : 0;


    // if (!$this.is(':checked')) return;

        $.ajax({
            url: "/app/addmodel",
            type: "POST",
            data: {
                provider: $(this).attr("Provider"),
                assistantid: $(this).attr("AssistantId"),
                providerid: $(this).attr("ProviderId"),
                csrf: $(this).attr("csrf"),
                active_status: active_status
            },
            success: function (response) {
                console.log("Model added successfully", response);
                location.reload()
            },
            error: function (xhr, status, error) {
                console.error(error);
            }
        });
})
})


$(document).ready(function () {

    $('#openai_status').on('click', function (event) {
        const $this = $(this);
        
        provider = $(this).attr("Provider")
        assistantid = $(this).attr("AssistantId")
        providerid = $(this).attr("ProviderId")
        csrf = $(this).attr("csrf")
        const active_status = $(this).is(':checked') ? 1 : 0;

        console.log("syuhjdj",active_status)

    

        // if (!$this.is(':checked')) return;

        $.ajax({
            url: "/app/addmodel",
            type: "POST",
            data: {
                provider: $(this).attr("Provider"),
                assistantid: $(this).attr("AssistantId"),
                providerid: $(this).attr("ProviderId"),
                csrf: $(this).attr("csrf"),
                active_status: active_status
            },
            success: function (response) {
                console.log("Model added successfully", response);
                location.reload()
            },
            error: function (xhr, status, error) {
                console.error(error);
            }
        });
    })
})



function modelFunc(el){



    if ($(el).hasClass("openai_checkbox")) {
        $('.openai_checkbox').not(el).prop('checked', false);
    }

    if ($(el).hasClass("claudeai_checkbox")) {
        $('.claudeai_checkbox').not(el).prop('checked', false);
    }

    $(el).prop('checked', true);

    $(this).attr("AssistantModelId")
    el.closest("label").querySelector("span").innerText;

    Assmodelid = $(el).attr("AssistantModelId")

    modelvalue = el.closest("label").querySelector("span").innerText

    $.ajax({
        url: "/app/addmodeldetails",
        type: "POST",
        data: {
            Assmodelid: $(el).attr("AssistantModelId"),
            modelvalue: el.closest("label").querySelector("span").innerText,
            csrf: $(el).attr("csrf"),
           
        },
        success: function (response) {
            console.log("Model added successfully", response);
           
            // location.reload()
            notify_content = `<div class="absolute z-[50] top-[32px] right-[32px] max-w-[358px] w-full flex flex-col gap-[16px]"><div class="toast-msg bg-[#F4FFF8] rounded-[8px] shadow-[0px_3px_10px_0px_#00000029] relative p-[16px] flex justify-start items-start gap-[10px] border-1 border-[#E3E3E3] border-l-[3px] border-l-[#156332]">
            <span> <img src="/public/img/success.svg" alt=""> </span>
            <div class="">
                <h3 class="text-[#202732] text-[14px] font-medium">Success</h3>
                <p class="text-[#3C485E] text-[13px] font-normal my-[4px_1px] leading-[14px]">Model Updated Successfully</p>
               
            </div>
            <a href="javascript:void(0)" class="absolute right-[16px] top-[16px] w-[16px] h-[16px] flex items-center justify-center"> <img src="/public/img/close.svg" alt="" id="cancel-notify" class="w-[10px]"> </a>
        </div></div>
                `;


            if ($('main').length) {

                $(notify_content).insertAfter('main');
            } else {

                $('main_div').append(notify_content);
            }
            setTimeout(function () {
                $('.toast-msg').fadeOut('slow', function () {
                    $(this).remove();
                });
            }, 5000); 
        },
        error: function (xhr, status, error) {
            console.error(error);
        }
    });


}




// $("#openai_status").on("change", function () {
  
//     const isChecked = $(this).prop("checked");

//     $(".openairadio").prop("disabled", !isChecked);


//     if (!isChecked) {
//         $(".openairadio").prop("checked", false);
//     }

// });

let defaultOpenAI = $(".openairadio:checked");

$("#openai_status").on("change", function () {

    const isChecked = $(this).prop("checked");

    $(".openairadio").prop("disabled", !isChecked);

    if (!isChecked) {
        $(".openairadio").prop("checked", false);
        // $(".OpenaiModel_val").addClass("opacity-40");
    } else {
        defaultOpenAI.prop("checked", true);
        // $(".OpenaiModel_val").removeClass("opacity-40");
    }

});


let defaultclaude = $(".claudeairadio:checked");

$("#claude_status").on("change", function () {

    const isChecked = $(this).prop("checked");

    $(".claudeairadio").prop("disabled", !isChecked);

    if (!isChecked) {
        $(".claudeairadio").prop("checked", false);
        // $(".claudeModel_val").addClass("opacity-40");
    } else {
        defaultclaude.prop("checked", true);
        // $(".claudeModel_val").removeClass("opacity-40");
    }

});


// $("#claude_status").on("change", function () {

//     const isChecked = $(this).prop("checked");

//     $(".claudeairadio").prop("disabled", !isChecked);

//     $(".claudeairadio").prop("checked",false)
// });



