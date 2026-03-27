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


var languagedata




$(document).ready(async function () {

     var languagepath = $('.language-group>button').attr('data-path')

     await $.getJSON(languagepath, function (data) {

          languagedata = data
        
     })

})


$(document).ready(function () {

    $("#Save").click(function () {

    jQuery.validator.addMethod("duplicatetitle", function (value) {

      var result;
      id = $("#channelid").val()
      $.ajax({
        url: "/channels/checkfoldertitle",
        type: "POST",
        async: false,
        data: { "folder_title": value,"folder_id": $("#folderid").val(), "channel_id": id, csrf: $("input[name='csrf']").val() },
        datatype: "json",
        caches: false,
        success: function (data) {

          result = data.trim();
        }
      })
      return result.trim() != "true"
    })


        $("#createfolder").validate({

            ignore: [],

            rules: {
                foldername: {
                    required: true,
                    duplicatetitle: true
                }
            },
            messages: {
                foldername: {
                    required: "* Please Enter the Folder Name",
                    duplicatetitle: "* Folder Name already exists"
                },
            }
        })

        var formcheck = $("#createfolder").valid();
        if (formcheck == true) {
            $('#createfolder')[0].submit();

        }


    })
})




    $(document).ready(function () {

        // Open file picker on button click
        $("#uploadBtn").on("click", function () {
            $("#fileInput").trigger("click");
        });

        // When file selected
        $("#fileInput").on("change", function () {
            const file = this.files[0];
            if (!file) return;

            const allowedTypes = [
                "application/pdf",
                "application/msword",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            ];

            if (!allowedTypes.includes(file.type)) {
              
           console.log("dfdfff")

                notify_content = `<div class="absolute z-[50] top-[32px] right-[32px] max-w-[358px] w-full flex flex-col gap-[16px]"><div class="bg-[#F5E7D9] toast-msg rounded-[8px] shadow-[0px_3px_10px_0px_#00000029] relative p-[16px] flex justify-start items-start gap-[10px] border-1 border-[#E3E3E3] border-l-[3px] border-l-[#CE6F10]">
            <span> <img src="/public/img/earning.svg" alt=""> </span>
            <div class="">
                <h3 class="text-[#202732] text-[14px] font-medium">Warning</h3>
                <p class="text-[#3C485E] text-[13px] font-normal my-[4px_1px] leading-[14px]">Only PDF, DOC, and DOCX files are allowed.</p>
            
            </div>
            <a href="javascript:void(0)" class="absolute right-[16px] top-[16px] w-[16px] h-[16px] flex items-center justify-center"> <img src="/public/img/close.svg" id="cancel-notify" alt="" class="w-[10px]"> </a>
        </div></div>`;
                if ($('main').length) {
                
                    $(notify_content).insertAfter('main');
                } else {
                    
                    $('body').append(notify_content);
                }
                setTimeout(function () {
                    $('.toast-msg').fadeOut('slow', function () {
                        $(this).remove();
                    });
                }, 5000); // 5000 milliseconds = 5 seconds

                $(this).val(""); // reset input
                return;
            }
         const filename = file.name.toLowerCase();
           const existingFile = $('tbody p').filter(function() {
        return $(this).text().trim().toLowerCase() === filename;
    });

    if (existingFile.length > 0) {
        showToast(`File "${file.name}" already exists in the list!`);
        $(this).val(""); // Reset file input
        return;
    }
            let Channeldata = $("#Channeldata").val()

            let foldernamedata = $("#foldernamedata").val()

            let formData = new FormData();
            formData.append("file", file);
            formData.append("filename", file.name);
            formData.append("Channeldata", Channeldata);
            formData.append("foldernamedata", foldernamedata);
            formData.append("csrf", $("input[name='csrf']").val());

            $.ajax({
                url: '/channels/fileupload',
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                cache: false,
                success: function (result) {
                  
                    window.location.href = "/channels/" + result.Channelid + "?folderid=" + result.foldername
                }
            });


            console.log("Selected file:", foldername);

        });

    });


  
  

$(document).on('click','.foldereditbtn',function(){

      $('.cfoldertext').text('Edit Folder')

      $('.savebtn').text('Update')

      $('#createfolder').attr('action','/channels/updatefolder')

      folderid =$(this).attr('data-id')

      foldername=$(this).attr('data-name')

      $('#foldername').val(foldername)

      $('#folderid').val(folderid)

})    

 function showToast(message) {
        const notify_content = `<div class="absolute z-[50] top-[32px] right-[32px] max-w-[358px] w-full flex flex-col gap-[16px]">
            <div class="bg-[#F5E7D9] toast-msg rounded-[8px] shadow-[0px_3px_10px_0px_#00000029] relative p-[16px] flex justify-start items-start gap-[10px] border border-[#E3E3E3] border-l-[3px] border-l-[#CE6F10]">
                <span><img src="/public/img/earning.svg" alt=""></span>
                <div>
                    <h3 class="text-[#202732] text-[14px] font-medium">Warning</h3>
                    <p class="text-[#3C485E] text-[13px] font-normal my-[4px_1px] leading-[14px]">${message}</p>
                </div>
                <a href="javascript:void(0)" class="absolute right-[16px] top-[16px] w-[16px] h-[16px] flex items-center justify-center cursor-pointer">
                    <img src="/public/img/close.svg" id="cancel-notify" alt="" class="w-[10px]">
                </a>
            </div>
        </div>`;

        if ($('main').length) {
            $(notify_content).insertAfter('main');
        } else {
            $('body').append(notify_content);
        }

        setTimeout(function () {
            $('.toast-msg').fadeOut('slow', function () {
                $(this).remove();
            });
        }, 5000);
    }

$(document).on('click','.cancelbtn',function(){


       $('#foldername').val("")

      $('#folderid').val("")

       $('#createfolder').attr('action','')

})

$(document).on('click','.folderadd',function(){

      $('.cfoldertext').text('Create Folder')

      $('.savebtn').text('Save')

      $('#createfolder').attr('action','/channels/createfolder')

      $('#foldername-error').hide()

})


$(document).on('click', '.delete-toast-btn', function () {
  $('.deltitle').text("Delete Folder")
  $('.deldesc').text("This Folder contains files and cannot be deleted")
  $('#delid').hide()
  $('.delname').text($(this).parents('.f-chn').find('.chname').text())
  $('#dltCancelBtn').text("Ok")
})

/**folder delete */
$(document).on('click', '.folderdelete', function () {

  var url = window.location.search
  const urlpar = new URLSearchParams(url)
  pageno = urlpar.get('page')

  $('.deltitle').text('Delete Folder?')
  $('.deldesc').text('Are you sure you want to delete this folder')
  $('.delname').text($(this).parents('.f-chn').find('.chname').text())
  $('#delid').show()
  $('#delid').attr('data-id', $(this).attr('data-id'))
  $('#dltCancelBtn').text("Cancel")
  channelid =$(this).attr('data-channel')
  if (pageno == null) {
    $('#delid').attr('href', "/channels/"+channelid+"/deletefolder?id=" + $(this).attr('data-id'))

  } else {
    $('#delid').attr('href', "/channels/"+channelid+"/deletefolder?id=" + $(this).attr('data-id') + "&page=" + pageno)

  }



})

/**Channellist delete */
$(document).on('click', '#filedelete-btn', function () {

  var url = window.location.search
  const urlpar = new URLSearchParams(url)
  pageno = urlpar.get('page')

  $('.deltitle').text('Delete File?')
  $('.deldesc').text('Are you sure you want to delete this file')
  $('.delname').text($(this).parents('.f-chn').find('.chname').text())
  $('#delid').show()
  $('#delid').attr('data-id', $(this).attr('data-id'))
  $('#dltCancelBtn').text("Cancel")
  channelid =$(this).attr('data-channel')
  if (pageno == null) {
    $('#delid').attr('href', "/channels/"+channelid+"/deletefile?id=" + $(this).attr('data-id'))

  } else {
    $('#delid').attr('href', "/channels/"+channelid+"/deletefile?id=" + $(this).attr('data-id') + "&page=" + pageno)

  }



})


$(document).on("click","#filedownload-btn",function(){

    let FileId = $(this).attr("data-id");

    console.log("Downloading file:", FileId);

    window.location.href = "/channels/downloadfile?Fileid=" + FileId;

  })

