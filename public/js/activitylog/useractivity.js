
$(document).ready(function () {
$('.chathistorybtn').first().trigger('click');
});



$(document).on("click",".chathistorybtn",function(){

        session_id = $(this).attr("session-id")

        $("#sessionId").val(session_id)

        AssistantId = $("#assistantid").val()

        $('.chathistorybtn').each(function(){

            $(this).removeClass('active')
        })

        $(this).addClass('active')

        $.ajax({
            url: "/getchat",
            type:"post",
            
            data :{
                SessionID :session_id,
                assistantid :AssistantId,
                csrf: $("input[name='csrf']").val(),

            },success:function(result){

                $("#sessionId").val(result.session_id)

                console.log("resultttt", result.QAList)

                $('.chatcontainer').removeClass('hidden');
                $('.initialcontainer').addClass('hidden');


                $(".answer_div").remove()
                $(".question_div").remove()

                result.QAList.forEach(function (item) {

                    const chatappendElement = $("#chatcontainer");
                    chatappendElement.append(`    <div
                                            class="question_div ms-auto w-fit max-w-[50%] bg-[#F9F4FF] rounded-[8px] p-[12px_16px] mb-[30px] last:mb-0">
                                            <p class="text-base leading-[19px] font-normal text-[#141413]"> ${item.question}
                                            </p>
                                        </div>
                        
                        `)


                    chatappendElement.append(`

                            <div
                                            class="answer_div w-fit max-w-full me-auto mb-[30px] last:mb-0 flex items-start gap-[6px]">
                                            <div class="min-w-[30px] mt-[4px]">
                                                <img src="/public/img/chat-logo.svg" alt="">
                                            </div>
                                            <div>
                                                ${item.answer}
                                            </div>
                                        </div>
                                    
                                
        `);



                })

            }

        })

})