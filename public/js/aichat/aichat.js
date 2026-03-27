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

    $("#NewsessionBtn").on("click",function(){

      

        $(".chatinput1").val("")
        $("#sessionId").val("")

        $(".answer_div").remove()
        $(".question_div").remove()

        var sessionid = $('#sessionid').val()

     

        $.ajax({
            url: "/app/adminnewsession",
            type:"get",
            data :{
                SessionID :sessionid,
                assistantid :$('#assistantid').val(),
               
            },success:function(result){


                $('#sessionid').val("")
        $('.chatcontainer').addClass('hidden');
        $('.initialcontainer').removeClass('hidden');

                // window.location.reload()
            }

        })
        



    })
$(document).ready(function () {

         let appid = $("#appid").val();

        var assistantid = $("#uniqueid").val();

        var sessionid = $('#sessionid').val()
    

        if ((sessionid !="") &&(sessionid !=null)){

            console.log("sssssssssssssssssss",sessionid)

        $.ajax({
            url: "/getchat",
            type:"post",
            
            data :{
                SessionID :sessionid,
                assistantid :assistantid,
                appid:appid,
                csrf: $("input[name='csrf']").val(),

            },success:function(result){

                $("#sessionId").val(result.session_id)

                console.log("resultttt", result.QAList)

                $('.chatcontainer').removeClass('hidden');
                $('.initialcontainer').addClass('hidden');


                $(".answer_div").remove()
                $(".question_div").remove()

                result.QAList.forEach(function (item) {
                    console.log("ssssssssssssss")

                    const chatContent = $("#chatContainer");
                   
                        chatContent.append(`  
            
               <div
                                        class="ms-auto question_div w-fit max-w-[50%] bg-[#F9F4FF] rounded-[8px] p-[12px_16px] mb-[30px] last:mb-0">
                                        <p class="text-base leading-[19px] font-normal text-[#141413]"> ${item.question}
                                        </p>
                                    </div>`)
                   
   chatContent.append(`
                      <div
                                        class="w-fit answer_div max-w-full me-auto mb-[30px] last:mb-0 flex items-start gap-[6px]">
                                        <div class="min-w-[30px] mt-[4px]">
                                            <img src="/public/img/chat-logo.svg" alt="">
                                        </div>
                                                                                <div class="ai-response text-[16px] leading-[24px]">${item.answer}</div>
                                    </div>
                  
                      
                    </div>
                `);

     


                })

            }

        })
    }
});







function scrollToBottom() {
        var $chatContent = $("#chatScroll");
        $chatContent.animate({
            scrollTop: $chatContent[0].scrollHeight
        }, 300);
    }
    function sendMessage(source,question) {


      

        if (source === "input") {

            var chattext = $(".chatinput").val().trim();
        }else if(source=="suggestion"){

              var chattext = question
        }
         else {

            var chattext = $("textarea[placeholder*='Ask anything']").val().trim();
        }


     

        // Check if chat text is empty
        if (chattext === "") return;

       $('.initialcontainer').addClass('hidden');
        $('.chatcontainer').removeClass('hidden');

        // Target the scrollable chat content area using structural selectors
        var $chatContent = $("#chatContainer");

        // Append user message (right side)
        $chatContent.append(`  
            
               <div
                                        class="ms-auto question_div w-fit max-w-[50%] bg-[#F9F4FF] rounded-[8px] p-[12px_16px] mb-[30px] last:mb-0">
                                        <p class="text-base leading-[19px] font-normal text-[#141413]">${chattext}
                                        </p>
                                    </div>
            
            
          
            
        `);
                const loaderDiv = $(`
                              <div id="dynamicChatLoader" class="mb-4 flex items-center">
                              <img src="/website/public/img/Pause GIF image.gif" class="w-16 h-16">
                               </div>`)
                   $chatContent.append(loaderDiv);
        // Clear input
        $("textarea[placeholder*='Ask anything']").val("");

        // Auto scroll to bottom
        $chatContent.scrollTop($chatContent[0].scrollHeight);

        let appid = $("#appid").val();

        var assistantid = $("#assistantid").val();

        var sessionid = $('#sessionid').val()

   
        $.ajax({
            url: "/app/chat",
            type: "POST",
            dataType: "json",
            data: {
                id: appid,
                question: chattext,
                assistantid: assistantid,
                modelval: $('.modelval span:first').text().trim(),
                csrf: $("input[name='csrf']").val(),
                sessionid:sessionid,
            },
            success: function (result) {
            
                 $("#dynamicChatLoader").remove()
                var message = result.aiResponse;
                message = message.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
                message = message.replace(/\n/g, "<br>");

                if (message==""){

                    message ="This assistant currently has no uploaded documents"
                }

                // Append AI message (left side)
                $chatContent.append(`
                      <div
                                        class="w-fit answer_div max-w-full me-auto mb-[30px] last:mb-0 flex items-start gap-[6px]">
                                        <div class="min-w-[30px] mt-[4px]">
                                            <img src="/public/img/chat-logo.svg" alt="">
                                        </div>
                                                                                <div class="ai-response text-[16px] leading-[24px]"><ul class="mb-[16px] ps-[24px]"></ul></div>
                                    </div>
                  
                      
                    </div>
                `);
                  
                       scrollToBottom();

                        // Type AI response letter by letter **preserving HTML**
                     const container = $chatContent.find(".ai-response").last()[0];


                        container.innerHTML = "";
                        let index = 0;
                        const typingSpeed = 3;
                        let htmlBuffer = ""; // accumulate HTML

                        const typingInterval = setInterval(() => {
                            htmlBuffer += message[index];
                            container.innerHTML = htmlBuffer;
                            index++;

                            // Auto-scroll if user is at bottom
                            const chatScrollElem = $("#chatScroll");
                            if (chatScrollElem.scrollHeight - chatScrollElem.scrollTop - chatScrollElem.clientHeight < 50) {
                                chatScrollElem.scrollTop = chatScrollElem.scrollHeight;
                            }

                            if (index >= message.length) clearInterval(typingInterval);
                        }, typingSpeed);

                // // Auto scroll to bottom after AI response
                // $chatContent.scrollTop($chatContent[0].scrollHeight);
            },
            error: function (xhr, status, error) {
                console.error("Chat error:", error);
            }
        });
    }

    // Send button click - using attribute selector for img src
    // Handle all send button clicks (send-dark, send-svg, send.svg)
    $("button img[src*='send-dark'], button img[src*='send-svg'], button img[src*='send.svg']").closest("button").click(function (e) {
        e.preventDefault();
        sendMessage();
    });


    $(document).on('click', '.initialsendbtn', function (e) {


        e.preventDefault();

        sendMessage("input");
    })
    // Enter key press on textarea
    $("textarea[placeholder*='Ask anything']").on('keydown', function (e) {
        if (e.which === 13 && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    $(".chatinput").on('keydown', function (e) {

        if (e.which === 13 && !e.shiftKey) {
            e.preventDefault();
       
            sendMessage("input");
        }
    });

    $('.sugqus').on("click",function(){
          

            question =$(this).children('p').text()
            sendMessage("suggestion",question);

    })

$(document).on("click", ".copy-assistant-url", function (e) {


    const path = $(this).data("url");
    const fullUrl = window.location.origin + path;

    // Create temporary input
    const $temp = $("<input>");
    $("body").append($temp);
    $temp.val(fullUrl).select();
    document.execCommand("copy");
    $temp.remove();

    // UI feedback
    const $text = $(this).find(".copy-text");
    const original = $text.text();

    $text.text("Copied!");
    setTimeout(function () {
        $text.text(original);
    }, 1500);
});


$(document).on("click", "#copyBtn", function (e) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation(); // important

    var url = $("#urlinput").val();
    var parts = url.split("/");

    var title = decodeURIComponent(parts[4]);
    var id = parts[5];

    var slug = title.toLowerCase().replace(/\s+/g, "-");

    var newUrl = parts[0] + "//" + parts[2] + "/chat/" + slug + "/" + id;

    navigator.clipboard.writeText(newUrl);

    $(".copy_text").text("Copied");
});

$(document).on("click", "el-menu", function (e) {
    e.stopPropagation();
});