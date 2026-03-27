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
        url: "/channels/checktitle",
        type: "POST",
        async: false,
        data: { "channel_title": value, "channel_id": id, csrf: $("input[name='csrf']").val() },
        datatype: "json",
        caches: false,
        success: function (data) {

          result = data.trim();
        }
      })
      return result.trim() != "true"
    })

        $("#createchannel").validate({

            ignore: [],

            rules: {
                channelname: {
                    required: true,
                    duplicatetitle:true
                }
               
            },
            messages: {
                channelname: {
                    required: "Please Enter the Channel Name",
                    duplicatetitle: "Channel Name already exists"
                },
              
            }
        })

        var formcheck = $("#createchannel").valid();
        if (formcheck == true) {
            $('#createchannel')[0].submit();

        }


    })
})



$(document).on('click','#editbtn',function(){
     $('#Save').text('Update')
     channelid =$(this).attr('data-id')
     channelname=$(this).attr('data-title')
     desc=$(this).attr('data-desc')
     $('.channelname').val(channelname)
     $('.channeldesc').val(desc)
     $('.channelid').val(channelid)
     $('#createchannel').attr('action','/channels/updatechannel')
    $('.createtext').text('Edit Channel')

})

/**Channellist delete */
$(document).on('click', '.channeldelete', function () {

  var url = window.location.search
  const urlpar = new URLSearchParams(url)
  pageno = urlpar.get('page')

  $('.deltitle').text('Delete Channel?')
  $('.deldesc').text('Are you sure you want to delete this channel')
  $('.delname').text($(this).parents('.f-chn').find('.chname').text())
  $('#delid').show()
  $('#delid').attr('data-id', $(this).attr('data-id'))
  $('#dltCancelBtn').text("Cancel")
  if (pageno == null) {
    $('#delid').attr('href', "/channels/deletechannel?id=" + $(this).attr('data-id'))

  } else {
    $('#delid').attr('href', "/channels/deletechannel?id=" + $(this).attr('data-id') + "&page=" + pageno)

  }



})

$(document).on('click','.cancelbtn',function(){

     $('.savebtn').text('Save')
     $('.channelname').val("")
     $('.channeldesc').val("")
     $('.channelid').val("")
     $('#createchannel').attr('action','/channels/createchannel')
     $('#channelname-error').hide()
    

})


$(document).on('click','.createchanbtn',function(){

   
    $('.savebtn').text('Save')
    $('.createtext').text('Create Channel')
   


})

$(document).on('keyup', '#search', function () {

  if (event.key === 'Backspace' && window.location.href.indexOf("keyword") > -1) {

    if ($('#search').val() === "") {

      window.location.href = "/channels/"

    }
  }
})

$(document).on('click', '.delete-toast-btn', function () {
  $('.deltitle').text(languagedata.Channell.delchltitle)
  $('.deldesc').text(languagedata.Channell.thischannelcontainsentries)
  $('#delid').hide()
  $('.delname').text($(this).parents('.f-chn').find('.chname').text())
  $('#dltCancelBtn').text("Ok")
})