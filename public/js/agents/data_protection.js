

$(document).on('click', '.selectusergrb', function () {

    $('.usergrblist').removeClass('hidden');
    $('.selectuserdiv').addClass('hidden');
    // $('.allusergrbdiv').removeClass('hidden');

})

$(document).on('click', '.closeusergrp', function () {

    $('.usergrblist').addClass('hidden');
    $('.selectuserdiv').removeClass('hidden');

})


$(document).ready(function(){

    var permissionid =getCookie("permissionId")


    if (permissionid !=""){

        $('.channeldiv').each(function(){

             

            if ($(this).data('grbid')==permissionid){
                

                $(this).children('#parent-body-'+permissionid).removeClass('hidden')
            }
        })

           setTimeout(function() {
            document.cookie = "permissionId=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
           
        }, 3000);
    
    }
})

$(document).on('click', '.chooseusergrb', function () {

    var userGroupId = $(this).data('id');

    duplicate = false

    $('.grbpermission').each(function () {

        if ($(this).data('id') == userGroupId) {

            duplicate = true

            notify_content = `<div class="z-[50] absolute top-[32px] right-[32px] max-w-[358px] w-full flex flex-col gap-[16px]"><div class="bg-[#F5E7D9] toast-msg rounded-[8px] shadow-[0px_3px_10px_0px_#00000029] relative p-[16px] flex justify-start items-start gap-[10px] border-1 border-[#E3E3E3] border-l-[3px] border-l-[#CE6F10]">
            <span> <img src="/public/img/earning.svg" alt=""> </span>
            <div class="">
                <h3 class="text-[#202732] text-[14px] font-medium">Warning</h3>
                <p class="text-[#3C485E] text-[13px] font-normal my-[4px_1px] leading-[14px]">Already This Usergroup Created</p>
            
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
            }, 5000);

        }
    })
    if (duplicate) {

        return

    }
    var userGroupName = $(this).data('name');
    var userGroupDesc = $(this).data('desc');
    $.ajax({
        url: "/app/savepermissions",
        type: "POST",
        data: {
            "assistantid": $('.assistantid').val(),
            "csrf": $(".csrf").val(),
            "usergroupid": userGroupId,
            "permissionId": $(this).data('permissionid'),
        },
        success: function (response) {

            

         window.location.reload()

//             $('.newpermission').val(response.permissionId)
//             $('.usergrblist').addClass('hidden');
//             $('.selectuserdiv').addClass('hidden');
//             $('.allusergrbdiv').addClass('hidden');
//             $('.channeldiv').removeClass('hidden');
//             $('.allchanneldiv').removeClass('hidden').attr('data-permissionid', response.permissionId);
//             $('.newperremove').attr("data-id", response.permissionId)
            

//             $('.permissionsavebtn').data('grbid', userGroupId);
//             $('.groupname').text(userGroupName);
//             $('.groupdesc').text(userGroupDesc);

//           if (!$('.addmoregrbf').length) {
//     $('.addmoregrb').removeClass('hidden');
// }
        },
        error: function (xhr, status, error) {
            console.error(error);
        }
    });




})


$(document).on('click', '.permissionsavebtn', function () {

    var channelIds = [];
    var $channelDiv = $(this).closest('.channeldiv');


    $channelDiv.find('.channelcheckbox:checked').each(function () {
        channelIds.push($(this).attr('id'));
    });


    console.log(channelIds);

    $.ajax({
        url: "/app/savepermissions",
        type: "POST",
        data: {
            "assistantid": $('.assistantid').val(),
            "channelids": channelIds,
            "csrf": $(".csrf").val(),
            "usergroupid": $(this).data('grbid'),
            "permissionId": $(this).data('permissionid'),
        },
        success: function (response) {


            setCookie("get-toast", "Permission Saved Successfully")

            window.location.reload()
            console.log("Permissions saved successfully", response);
        },
        error: function (xhr, status, error) {
            console.error(error);
        }
    });


})


$(document).on('click', '.datapermission', function () {
    channelid = $(this).data('id')
    console.log(channelid, "channelid", $(this).data('assusergrbchid'))
    $('.assisusrgrbchidd').val($(this).data('assusergrbchid'))
   $('.channelnameinfo').text("Channel: "+$(this).data('name'))
    // get closest channel block
    var permissionId = $(this).closest('.channeldiv').find('.newpermission').val();

    $('.filessavebtn').attr("data-permissionId",permissionId)

    $.ajax({
        url: "/app/getchanneldata",
        type: "GET",
        data: {
            "assistantid": $('.assistantid').val(),
            "channelid": channelid,
            "assusergrbchid": $(this).data('assusergrbchid'),
            "permissionId":permissionId
        },
        success: function (response) {

            console.log(response,"responseee")
                      $('.norecordfound').addClass('hidden');
                      $('.selectalldiv').removeClass('hidden')
                          $('.filesdiv, .file-list-container').empty(); 
               if ((!response.GetSelectFiles || response.GetSelectFiles.length === 0) && 
        (!response.channeldata || response.channeldata.length === 0)) {
        
       
        $('.norecordfound').removeClass('hidden');
        $('.selectalldiv').addClass('hidden')
        return; // Exit early
    }

            if (response.channeldata != null) {
                $(".selectedfilescount").text(response.GetSelectFilesCount  +" "+"files Selected")
                let html = ''; // Build all HTML at once

                for (let x of response.channeldata) {
                    // Folder header
                    html += `
                    <div data-accordion="collapse" class="mb-[8px]">
                        <div class="flex gap-[16px] p-[12px_10px] bg-[#F5F5F5] border border-[#E8E8E8] rounded-[4px]">
                            <div class="flex items-center gap-[12px] cursor-pointer accordion-header w-full group bg-neutral-primary text-body" data-accordion-target="#parent-body-mc${x.Id}" aria-expanded="false" aria-controls="parent-body-mc${x.Id}">
                                <label class="flex items-center justify-end gap-[16px] cursor-pointer ms-auto">
                                    <div class="flex items-center gap-[10px] grow">
                                        <input type="checkbox" class="folderchodiv w-[13px] h-[13px] accent-[#704C9B]">
                                    </div>
                                </label>
                                <div class="grow">
                                    <h3 class="font-medium text-[#202732] text-[14px] flex items-center gap-[5px]" data-folder="${x.FolderName}"> 
                                        <img src="/public/img/folder.svg" alt=""> ${x.FolderName}
                                    </h3>
                                </div>
                                <p class="text-[11px] font-normal text-[#4F607D] ms-auto">${x.FilesCount} document</p>
                                <button class="cursor-pointer min-w-[12px]">
                                    <img src="/public/img/Up_arrow.svg" alt="" class="transition-transform duration-300 group-aria-expanded:rotate-180">
                                </button>
                            </div>
                        </div>

                        <!-- Files container - dynamically populated -->
                        <div id="parent-body-mc${x.Id}" class="hidden">`;

                    // **DYNAMIC FILES BINDING**
                    if (x.FilesData && x.FilesData.length > 0) {


                        for (let file of x.FilesData) {

                            html += `
                            <label class=" flex items-center justify-start gap-[20px] cursor-pointer border-b border-[#F5F5F5] p-[10px]">
                                <div class="flex items-center gap-[10px]">
                                    <input type="checkbox" data-id="${file.Id}" class= "filechoosediv w-[13px] h-[13px] accent-[#704C9B]">
                                </div>
                                <p class="text-[13px] font-normal text-[#202732] flex justify-start items-center gap-1">
                                    <img src="/public/img/file.svg" alt=""> ${file.FileName}
                                </p>
                            </label>`;
                        }
                    } else {
                        // Empty folder message
                        html += `
                        <div class="p-[15px] text-[#4F607D] text-[13px] italic">No files in this folder</div>`;
                    }

                    html += `
                        </div>
                    </div>`;
                }

                $('.filesdiv').html(html); // Use html() to replace all content
            }

            console.log("response.GetSelectFilessss", response.GetSelectFiles);
            

            if (response.GetSelectFiles != null) {
                // Loop through each selected file in the array
                $.each(response.GetSelectFiles, function (index, file) {


                    // Find matching checkbox by data-id and check it
                    $('.filechoosediv').each(function () {
                        var $input = $(this);
                        var dataId = $input.attr('data-id');
                        console.log("dataidFileid",dataId,file.FileId);
                        



                        if (dataId == file.FileId) {

                            $input.prop('checked', true);
                            return false; // Exit inner loop
                        }
                    });
                    $('.filesdiv [data-accordion="collapse"]').each(function () {

    let folder = $(this);
    let totalFiles = folder.find('.filechoosediv').length;
    let checkedFiles = folder.find('.filechoosediv:checked').length;

    // If all files selected, check folder
    if (totalFiles > 0 && totalFiles === checkedFiles) {
        folder.find('.folderchodiv').prop('checked', true);
    } else {
        folder.find('.folderchodiv').prop('checked', false);
    }

});

                    window.previousSelectedData = [...new Set(
                        response.GetSelectFiles.map(item => item.FileId)
                    )];
                });
            }

        },
        error: function (xhr, status, error) {
            console.error("Error fetching channel data:", error);
        }
    });
});
$(document).on('click', '.accordion-header', function () {


    const target = $(this).data('accordion-target');
    $(target).toggleClass('hidden');

    const expanded = $(this).attr('aria-expanded') === 'true';
    $(this).attr('aria-expanded', !expanded);
});


$(document).on('click', '.selectchennalName .accordion-header', function () {

    const target = $(this).data('accordion-target');
    $(target).toggleClass('hidden');

    const expanded = $(this).attr('aria-expanded') === 'true';
    $(this).attr('aria-expanded', !expanded);

    // rotate arrow
    $(this).find('.arrow').toggleClass('rotate-[-90deg]');
});

$(document).on('click', '.usergrp .accordion-header', function () {

    const target = $(this).data('accordion-target');

    // Toggle accordion body visibility
    $(target).toggleClass('hidden');

    // Get current state
    const expanded = $(this).attr('aria-expanded') === 'true';

    // Update aria-expanded attribute
    $(this).attr('aria-expanded', !expanded);

    // Rotate arrow based on state
    $(this).find('.arrow').toggleClass('rotate-90', !expanded);
});


$(document).on('click', '.filessavebtn', function (e) {
    // Prevent multiple clicks
    const $btn = $(this);
    if ($btn.hasClass('saving')) {
        return false;
    }

    let currentIds = [];
    let previousIds = window.previousSelectedData || [];

    $('.filechoosediv:checked').each(function () {
        currentIds.push($(this).data('id'));
    });

    console.log(previousIds, currentIds,$(this).data('permissionid'), "checkitddf");

    let formData = new FormData();
    formData.append('assisusrgrbchnid', $('.assisusrgrbchidd').val());
    formData.append('permissionId', $(this).data('permissionid'));
    formData.append('assistantid', $('.assistantid').val());
    formData.append('current_fileIds', JSON.stringify(currentIds));
    formData.append('previous_fileIds', JSON.stringify(previousIds));
    formData.append('csrf', $(".csrf").val());

    // MARK 1: Disable + Tailwind Loader
    $btn.addClass('saving disabled:pointer-events-none opacity-50 flex items-center justify-center')
        .prop('disabled', true);

    const originalText = $btn.html();
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

    $.ajax({
        url: "/app/savefiles",
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            if (response.status === "success") {

                 setCookie("get-toast", "Files Uploaded Successfully");

                   window.location.reload();

                
            } else {
                notify_content = `<div class="z-[50] absolute top-[32px] right-[32px] max-w-[358px] w-full flex flex-col gap-[16px]"><div class="toast-msg bg-[#FFE8E9] rounded-[8px] shadow-[0px_3px_10px_0px_#00000029] relative p-[16px] flex justify-start items-start gap-[10px] border-1 border-[#E3E3E3] border-l-[3px] border-l-[#991F24]">
            <span> <img src="/public/img/error.svg" alt=""> </span>
            <div class="">
                <h3 class="text-[#202732] text-[14px] font-medium">Warning</h3>
                <p class="text-[#3C485E] text-[13px] font-normal my-[4px_1px] leading-[14px]">File Upload Failed</p>
               
            </div>
            <a href="javascript:void(0)" class="absolute right-[16px] top-[16px] w-[16px] h-[16px] flex items-center justify-center"> <img src="/public/img/close.svg" alt="" id="cancel-notify" class="w-[10px]"> </a>
        </div></div>
                `;


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
           
        },
        error: function (xhr, status, error) {
            setCookie("Alert-msg", "File Upload Failed");
            console.error("Error:", xhr.responseText);
            window.location.reload();
        },
        complete: function () {
            // MARK 2: Reset button
            $btn.removeClass('saving disabled:pointer-events-none opacity-50 flex items-center justify-center')
                .prop('disabled', false)
                .html(originalText);
        }
    });

    return false;
});


$(document).on('click', '.managechn', function () {


    var $dropdown = $(this).parent('.w-full').siblings('.allchanneldiv').first();

    $dropdown.toggleClass('hidden')
})
$(document).on('click', function (e) {
    // Check if click is outside managechn button AND dropdown
    if (!$(e.target).closest('.managechn').length && 
        !$(e.target).closest('.allchanneldiv').length) {
        
        $('.allchanneldiv').addClass('hidden');
    }
});
$(document).on('keyup', '.managechn', function (e) {
    var searchTerm = $(this).val().toLowerCase().trim();


    var $dropdown = $(this).parent('.w-full').siblings('.allchanneldiv').first();

    $dropdown.removeClass('hidden')

    if (searchTerm === '') {
        $dropdown.find('label').show();
        $dropdown.find('.no-results').remove();
        return;
    }

    var hasResults = false;
    $dropdown.find('label').each(function () {
        var $label = $(this);
        var channelText = $label.find('p').text().toLowerCase();

        if (channelText.includes(searchTerm)) {
            $label.show();
            hasResults = true;
        } else {
            $label.hide();
        }
    });

    if (!hasResults) {
        if ($dropdown.find('.no-results').length === 0) {
            $dropdown.append('<div class="no-results p-[12px_10px] text-[13px] text-[#4F607D] text-center border-t border-[#E0E4EB]">No data found</div>');
        }
    } else {
        $dropdown.find('.no-results').remove();
    }
});


$(document).on('click', '.manageusergrb', function () {


    var $dropdown = $(this).parent('.w-full').siblings('.allusergrbdiv').first();

    $dropdown.toggleClass('hidden')
})

$(document).on('keyup', '.manageusergrb', function (e) {
    var searchTerm = $(this).val().toLowerCase().trim();


    var $dropdown = $(this).parent('.w-full').siblings('.allusergrbdiv').first();

    $dropdown.removeClass('hidden')
    if (searchTerm === '') {
        $dropdown.find('a').show();
        $dropdown.find('.no-results').remove();
        return;
    }

    var hasResults = false;
    $dropdown.find('a').each(function () {
        var $label = $(this);
        var channelText = $label.find('p').text().toLowerCase();

        if (channelText.includes(searchTerm)) {
            $label.show();
            hasResults = true;
        } else {
            $label.hide();
        }
    });

    if (!hasResults) {
        if ($dropdown.find('.no-results').length === 0) {
            $dropdown.append('<div class="no-results p-[12px_10px] text-[13px] text-[#4F607D] text-center border-t border-[#E0E4EB]">No data found</div>');
        }
    } else {
        $dropdown.find('.no-results').remove();
    }
});


$(document).on('keyup', '.searchfiles', function () {
    const searchTerm = $(this).val().toLowerCase().trim();
    const $filesDiv = $('.filesdiv');
    
    // Show all if search is empty
    if (searchTerm === '') {

        $filesDiv.find('[data-accordion="collapse"]').each(function () {

            let originalFolder = $(this).find('h3').data('folder');
            $(this).find('h3').text(originalFolder);

        });

        $filesDiv.find('[data-accordion="collapse"]').removeClass('hidden');
        $('.nodatafound').addClass('hidden');

        return;
    }
    
    // Initially hide all accordions and no data message
    $filesDiv.find('[data-accordion="collapse"]').addClass('hidden');
    let hasMatches = false;
    
    // Check each accordion for matches
    $filesDiv.find('[data-accordion="collapse"]').each(function () {
        const $accordion = $(this);
        const originalFolder = $accordion.find('h3').data('folder');
        const folderNameLower = originalFolder.toLowerCase();
        const fileNames = $accordion.find('p').map(function () {
            return $(this).text().toLowerCase();
        }).get();

        let hasFileMatch = fileNames.some(name => name.includes(searchTerm));
        let folderMatch = folderNameLower.includes(searchTerm);

        if (hasFileMatch) {
            let matchedFile = fileNames.find(name => name.includes(searchTerm));
            const escapedTerm = searchTerm.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
            const regex = new RegExp(`(${escapedTerm})`, 'gi');
            const highlightedFile = matchedFile.replace(
                regex,
                `<span class="bg-[#F2CCFE] rounded-sm">$1</span>`
            );

            $accordion.removeClass('hidden');
            $accordion.find('h3').html(`
            <img src="/public/img/folder.svg" alt="">
            ${originalFolder} / ${highlightedFile}
        `);
            hasMatches = true;
        }
        else if (folderMatch) {
            $accordion.removeClass('hidden');
            // Keep folder image and text
            $accordion.find('h3').html(`
            <img src="/public/img/folder.svg" alt="">
            ${originalFolder}
        `);
            hasMatches = true;
        }
    });
    
    // Show/hide no data message based on matches found
    if (hasMatches) {
        $('.nodatafound').addClass('hidden');
    } else {
        $('.nodatafound').removeClass('hidden');
    }
});


$(document).on('click', '.search_close', function () {
    $(".searchfiles").val(""); // clear input
    $(".searchfiles").trigger('keyup'); // trigger the keyup handler to reset
});



$(document).on('click', '.Selectallbtn', function () {
    const isChecked = $(this).is(':checked');


    $('.accordion-header input[type="checkbox"]').prop('checked', isChecked);

    $('.filechoosediv').prop('checked', isChecked);
});


$(document).on('change', '.folderchodiv', function () {
    var $folderCheckbox = $(this);
    var $accordionItem = $folderCheckbox.closest('[data-accordion="collapse"]');
    var $childFileInputs = $accordionItem.find('.filechoosediv');

    console.log('Folder clicked:', $folderCheckbox.is(':checked'), 'Children found:', $childFileInputs.length);

    if ($folderCheckbox.is(':checked')) {
        $childFileInputs.prop('checked', true).trigger('change');
    } else {
        $childFileInputs.prop('checked', false).trigger('change');
    }
});
$(document).on("change", ".filechoosediv", function () {

    // Get current folder container
    let folderContainer = $(this).closest('[data-accordion="collapse"]');

    let totalFiles = folderContainer.find(".filechoosediv").length;
    let checkedFiles = folderContainer.find(".filechoosediv:checked").length;

    // If unchecked → folder unchecked
    if (!$(this).is(":checked")) {
        folderContainer.find(".folderchodiv").prop("checked", false);
        return;
    }

    // If all files checked → folder checked
    if (totalFiles === checkedFiles) {
        folderContainer.find(".folderchodiv").prop("checked", true);
    }

});

//Permission Delete function//


$(document).on('click', '.perdelete-btn', function () {


    $('.deltitle').text('Are you sure you want to delete?')
    $('.deldesc').text('Access to documents in this channel will be removed for this user group.')
    $('.delname').text($(this).parents('.f-chn').find('.chname').text())
    $('#delid').show()
    $('#delid').attr('data-id', $(this).attr('data-id'))
    $('#dltCancelBtn').text("Cancel")
    assistantid = $('.assistantid').val()

    console.log("assistantid", assistantid)
    $('#delid').attr('href', "/app/deleteusergrbpermission?id=" + $(this).attr('data-id') + "&assistantid=" + assistantid)



})




$(document).on('click', '.channelperdelete', function () {


    $('.deltitle').text('Are you sure you want to delete?')
    $('.deldesc').text('This channel contains files and is connected to user groups.')
    $('.delname').text($(this).parents('.f-chn').find('.chname').text())
    $('#delid').show()
    $('#delid').attr('data-id', $(this).attr('data-id'))
    $('#dltCancelBtn').text("Cancel")
    assistantid = $('.assistantid').val()
    $('#delid').attr('href', "/app/deleteusergrbchannel?id=" + $(this).attr('data-id') + "&assistantid=" + assistantid);



})

$(document).ready(function () {
    // For EACH permission section: auto-check checkboxes based on THAT permission's channels
    $('.flex.flex-col.gap-\\[10px\\]').each(function () {
        var $permissionSection = $(this);
        var $permissionChannels = $permissionSection.find('.usrgrbdata');
        var $dropdownSection = $permissionSection.siblings('.w-full.max-w-\\[663px\\]');
        var $checkboxes = $dropdownSection.find('.channelcheckbox');

        // For this permission, check matching checkboxes in ITS dropdown
        $permissionChannels.each(function () {
            var channelId = $(this).attr('data-id');
            var $matchingCheckbox = $checkboxes.filter('#' + channelId);
            if ($matchingCheckbox.length > 0) {
                $matchingCheckbox.prop('checked', true);
                $matchingCheckbox.addClass("opacity-[50%]")
                $matchingCheckbox.closest('label').addClass("pointer-events-none")
               
            }
        });
    });
})
//Restrict Duplicate channel creation//

$(document).on('click', '.channelcheckbox', function (e) {
    var $checkbox = $(this);
    var checkboxId = $checkbox.attr('id');
    var name = $checkbox.attr("data-name");
    var desc = $checkbox.attr("data-desc");
  
    // Only run if checkbox is checked
    if (!$checkbox.is(':checked')) {

         $checkbox.prop('checked', true);
        $checkbox.closest('label').addClass('pointer-events-none');
        return;
    }
      $(this).addClass('opacity-[50%]')
    console.log("checkboxId,",checkboxId)

    // Get permissionId from the closest parent with data-permissionid attribute
    var permissionId = $checkbox.closest('[data-permissionid]').data('permissionid');

    console.log(permissionId, "permissionddfdf")
  var $currentdiv = $checkbox.closest('.allchanneldiv').closest('.pt-\\[0px\\]').find('.firstchanneldiv');
    
    if ($currentdiv.length > 0 && 
        $currentdiv.find('.usrgrbdata[data-id="' + checkboxId + '"]').length > 0) {
        console.log("Channel already exists in this permission section");
        return; // skip AJAX and duplicate
    }


        // Fallback if no permissionid found
        if (!permissionId) {
            console.error('Permission ID not found');
            return;
        }

    $.ajax({
        url: "/app/savepermissions",
        type: "POST",
        data: {
            "assistantid": $('.assistantid').val(),
            "channelids": checkboxId,
            "csrf": $(".csrf").val(),
            "usergroupid": $(this).data('grbid'),
            "permissionId": permissionId
        },
        success: function (response) {
            var div = `
                <div data-id="${checkboxId}" class="usrgrbdata h-[144px] flex justify-start items-start flex-col sm:flex-row gap-[10px] border border-[#E2E2E2] bg-[#F9F9F9] p-[20px] rounded-[12px]">
                    <div class="flex flex-col  gap-1.5">
                    <div>
                        <h3 class="text-[18px] font-bold text-[#28303E] mb-[4px]">${name}</h3>
                        <p class="text-[12px] font-400 text-[#4F607D] line-clamp-2">${desc}</p></div>
                              <div class="flex"> <p class="text-[14px] font-500 text-[#28303E] pt-[10px]">0 Files Selected</p><button   data-id="${checkboxId}"
                            data-assusergrbchid="${response.channelinfo.Id}"
                            data-name="${name}"
                                                             command="show-modal" commandfor="create-manage-content"  class="datapermission hidden cursor-pointer text-[14px] font-medium text-[#704C9B] p-[10px] pt-[10px]">Edit</button></div>
                                                       
                    </div>
                    <div class="ms-auto flex justify-end items-center gap-[8px] shrink-0">
                        <button
                            command="show-modal"
                            commandfor="delete-modal"
                            data-id="${response.channelinfo.Id}"
                            class="channelperdelete cursor-pointer w-[36px] h-[32px] rounded-[8px] shadow-[0px_1px_2px_0px_#0000001F] border border-[#EEEEEE] flex items-center justify-center bg-white hover:bg-[#F8ECFE]"
                            aria-expanded="false">
                            <img src="/public/img/remove.svg" alt="">
                        </button>
                        <button
                            data-id="${checkboxId}"
                            data-assusergrbchid="${response.channelinfo.Id}"
                            data-name="${name}"
                            command="show-modal"
                            commandfor="create-manage-content"
                            class="datapermission cursor-pointer px-[14px] h-[32px] text-[14px] font-medium text-[#28303E] rounded-[8px] shadow-[0px_1px_2px_0px_#0000001F] border border-[#EEEEEE] flex items-center justify-center gap-[4px] bg-white hover:bg-[#F8ECFE]"
                            aria-expanded="false">
                            <img src="/public/img/Manage Document.svg" alt=""> Manage Documents
                        </button>
                    </div>
                </div>
            `;

            // Append to the firstchanneldiv within the same permission section
           $currentdiv.append(div);
        },
        error: function (xhr, status, error) {
            console.error('AJAX Error:', error);
        }
    });
});



const selectType = $("#select");

selectType.on("change", function () {

    const value = $(this).val();

    if (value == "1") {
        console.log("Select all files");
        $('.filesdiv [data-accordion="collapse"]').show();
        $('.filesdiv .filechoosediv').closest('label').show();
    }

    if (value == "2") {
        $('.filesdiv [data-accordion="collapse"]').each(function () {

        let folder = $(this);
        let selectedFiles = folder.find('.filechoosediv:checked');

       
        folder.find('.filechoosediv').closest('label').hide();

        if (selectedFiles.length > 0) {

            
            folder.show();

            
            selectedFiles.closest('label').show();

        } else {
            folder.hide();
        }

    });

    }
    }

);


document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.searchfiles');
    const searchClose = document.querySelector('.search_close');

    searchInput.addEventListener('input', () => {
        if (searchInput.value.trim() !== '') {
            searchClose.classList.remove('hidden'); // show icon while typing
        } else {
            searchClose.classList.add('hidden'); // hide if empty
        }

    });

    searchClose.addEventListener('click', () => {
        searchInput.value = '';
        searchClose.classList.add('hidden');
        searchInput.focus();

    });
});