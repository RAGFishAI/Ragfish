

$(document).ready(function () {

    function getCookie(name) {
        return document.cookie
            .split("; ")
            .find(row => row.startsWith(name + "="))
            ?.split("=")[1];
    }

    var sessionValue = sessionStorage.getItem("session_cookies");
    var agentValue = sessionStorage.getItem("Assistant_cookies");

    session_id = sessionValue

    AssistantId = $("#assistantid").val()

    if (session_id && agentValue == AssistantId) {

        $("#sessionId").val(session_id)

        $(".chathistorybtn").each(function () {

            var btnSessionId = $(this).find("span").attr("session-id");

            if (btnSessionId == session_id) {
                $(".chathistorybtn").removeClass("active");
                $(this).addClass("active");
            }

        });

        $.ajax({
            url: "/getchat",
            type: "post",

            data: {
                SessionID: session_id,
                assistantid: AssistantId,
                csrf: $("input[name='csrf']").val(),

            }, success: function (result) {

                $("#sessionId").val(result.session_id)

                $('.chatcontainer').removeClass('hidden');
                $('.initialcontainer').addClass('hidden');


                $(".answer_div").remove()
                $(".question_div").remove()

                result.QAList.forEach(function (item) {

                    const chatappendElement = $("#chatcontainer");
                    chatappendElement.append(`<div class="ms-auto question_div w-fit max-w-[50%] bg-[#F0EFE6] rounded-[8px] p-[12px_16px] mb-[30px] last:mb-0">
                            <p class="text-base text-[16px]leading-[19px] font-normal text-[#141413] " >
                            ${item.question}
                            </p>
                        </div>`)


                    chatappendElement.append(`
                                    <div class="w-fit max-w-full answer_div me-auto mb-[30px] last:mb-0 flex items-start gap-[6px]">
                                        <div class="min-w-[30px] mt-[4px]">
                                            <img src="/website/public/img/chat-logo.svg" alt="">
                                        </div>
                                        <div class="ai-response break-words overflow-x-auto max-w-full text-[16px] leading-[24px]">${item.answer}<ul class="mb-[16px] ps-[24px]"></ul></div>
                                    </div>
                                
        `);



                })

            }

        })

    }

});



$(document).ready(function () {

    $("#form_submit_button").on("click", function () {

        const $btn = $(this);

        // add loader  get responce 

        $btn.addClass('opacity-50 pointer-events-none flex items-center justify-center');
        const originalText = $btn.html();
        $btn.html(`
        <svg class="animate-spin -ml-1 h-4 w-4 mr-2 text-white inline" 
             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" 
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
            </path>
        </svg>
        Sign in
    `);

        email = $("#emailInput").val()
        password = $("#passwordInput").val()

        $("#pass_error").hide()
        $("#email_error").hide()

        form_vaild = true
        email_valid = /(^[a-zA-Z_0-9\.-]+)@([a-z]+)\.([a-z]+)(\.[a-z]+)?$/.test(email)
        password_valid = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[\W_]).{8,}$/.test(password)

        if (email == "") {
            $("#email_error").show()
            $("#email_error").text("* Please Enter Email")
            form_vaild = false

            // remove loader  get responce 

            $(".animate-spin").remove()

            $btn.removeClass('opacity-50 pointer-events-none flex items-center justify-center');

        } else if (!email_valid) {
            $("#email_error").show()
            $("#email_error").text("* Please Enter Valid Email")
            form_vaild = false

            $(".animate-spin").remove()

            $btn.removeClass('opacity-50 pointer-events-none flex items-center justify-center');

        }

        if (password == "") {
            $("#pass_error").show()
            $("#pass_error").text("* Please Enter password")
            form_vaild = false

            $(".animate-spin").remove()

            $btn.removeClass('opacity-50 pointer-events-none flex items-center justify-center');

        } else if (!password_valid) {

            $("#pass_error").show()
            $("#pass_error").text("* Password have 1 number and 1 uppercase letter and 1 lowercase letter 1 special character")
            form_vaild = false

            $(".animate-spin").remove()
            $btn.removeClass('opacity-50 pointer-events-none flex items-center justify-center');

        }

        if (form_vaild) {
            $.ajax({
                type: "post",
                url: "/login_verification",
                data: { "emailid": email.trim(), "password": password.trim(), csrf: $("input[name='csrf']").val(), "TenantID": $("#TenantID").val() },
                dataType: "json",
                success: function (response) {

                    if (response.Email == false) {

                        $("#email_error").show()
                        $("#email_error").text("* Please Enter Valid User Email")

                        $(".animate-spin").remove()
                        $btn.removeClass('opacity-50 pointer-events-none flex items-center justify-center');


                    } else if (response.user_status == false) {
                        $("#email_error").show()
                        $("#email_error").text("* User currently inactive contact Admin")

                        $(".animate-spin").remove()
                        $btn.removeClass('opacity-50 pointer-events-none flex items-center justify-center');

                    } else if (response.password == false) {

                        $("#pass_error").show()
                        $("#pass_error").text("* Please Enter Correct Password")

                        $(".animate-spin").remove()
                        $btn.removeClass('opacity-50 pointer-events-none flex items-center justify-center');


                    } else {

                        $('#loginModal')[0].close();
                        $("#user_email").attr("email", response.user_email)

                        location.reload();
                    }

                }
            });

        }
    }



    )

})

// password show



$(".password_show").on("click", function () {

    var input = $("#passwordInput");
    var icon = $(this).find("img")

    if (input.attr("type") === "password") {
        input.attr("type", "text");
        icon.attr("src", "/public/img/eye open.svg");
    } else {
        input.attr("type", "password");
        icon.attr("src", "/public/img/password.svg");
    }

});


// start chat check user valid or not

var ValidUser = false

$(document).ready(function () {

    function scrollToBottom() {
        var $chatContent = $("#chatScroll");
        $chatContent.animate({
            scrollTop: $chatContent[0].scrollHeight
        }, 300);
    }


    function checkUserSession(inputSelector) {

                    question_val = $(inputSelector).val();
                    sessionId = $("#sessionId").val();
                    assistantid = $("#assistantid").val()

                    $(".chatinput2").val("")

                    if (question_val != "") {

                        $('.chatcontainer').removeClass('hidden');
                        $('.initialcontainer').addClass('hidden');
                        // var $chatContent = $(".chatContainer");

                        const chatappendElement = $("#chatcontainer");
                        chatappendElement.append(`<div class="ms-auto question_div w-fit max-w-[50%] bg-[#F0EFE6] rounded-[8px] p-[12px_16px] mb-[30px] last:mb-0">
                            <p class="text-base text-[16px]leading-[19px] font-normal text-[#141413] " >
                            ${question_val}
                            </p>
                        </div>`)

                        const loaderDiv = $(`
                              <div id="dynamicChatLoader" class="mb-4 flex items-center">
                              <img src="/website/public/img/Pause GIF image.gif" class="w-16 h-16">
                               </div>
                               `);

                        chatappendElement.append(loaderDiv);

                        // Auto scroll to bottom after AI response


                        scrollToBottom()
                        $("#chatLoader").removeClass("hidden");

                        $.ajax({
                            url: "/userchat",
                            type: "POST",
                            dataType: "json",
                            data: {

                                question: question_val,
                                SessionId: sessionId,
                                Assistantid: assistantid,
                                csrf: $("input[name='csrf']").val(),

                            }, success: function (result) {

                                sessionStorage.setItem("session_cookies", result.sessionId);
                                sessionStorage.setItem("Assistant_cookies", assistantid);

                                $("#dynamicChatLoader").remove()

                                $("#sessionId").val(result.sessionId)



                                var message = result.aiResponse;
                                message = message.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
                                message = message.replace(/\n/g, "<br>");


                           


                                // Responce

                                // chatappendElement.append(`<div class="w-fit max-w-full me-auto mb-[30px] last:mb-0 flex items-start gap-[6px]">
                                //     <div class="min-w-[30px] mt-[4px]">
                                //         <img src="/website/public/img/chat-logo.svg" alt="">
                                //     </div>
                                //     <div >${message}
                                //         <ul class="mb-[16px] ps-[24px]">

                                //     </div>
                                // </div>`);

                                // Append AI message container



                                const aiMessageDiv = $(`
                                    <div class="w-fit max-w-full answer_div me-auto mb-[30px] last:mb-0 flex items-start gap-[6px]">
                                        <div class="min-w-[30px] mt-[4px]">
                                            <img src="/website/public/img/chat-logo.svg" alt="">
                                        </div>
                                        <div class="ai-response text-base leading-[24px] font-normal text-[#141413] list-disc mb-[6px]"><ul class="mb-[16px] ps-[24px]"></ul></div>
                                    </div>
                                `);

                                chatappendElement.append(aiMessageDiv);
                                scrollToBottom();

                                // Type AI response letter by letter **preserving HTML**
                                const container = aiMessageDiv.find(".ai-response")[0];
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


                                // $chatContent.scrollTop($chatContent[0].scrollHeight);
                            }, error: function (xhr) {

                                $("#dynamicChatLoader").remove();

                                if (xhr.status === 401) {
                                    $('#loginModal')[0].showModal();
                                } else {
                                    console.error("Error:", xhr.responseText);
                                }
                            }
                        })
                    }


                }

    $(".chatbutton1").on("click", function () {
        checkUserSession(".chatinput1");
    });
    $(".chatbutton2").on("click", function () {
        checkUserSession(".chatinput2");
    });


    $(".chatinput1").on("keydown", function (e) {
        if (e.key === "Enter") {
            e.preventDefault();
            checkUserSession(".chatinput1");
        }
    });

    $(".chatinput2").on("keydown", function (e) {
        if (e.key === "Enter") {
            e.preventDefault();
            checkUserSession(".chatinput2");
        }
    });
        
});

    
    

  



// logout

$(document).ready(function () {

    $("#logoutbutton").on("click", function () {
        
        sessionStorage.removeItem("session_cookies");
        sessionStorage.removeItem("Assistant_cookies");

        $.ajax({
            type: "get",
            url: "/chatlogout",
            success: function (response) {
                if (response.logout) {
                    location.reload();
                }
            }


        })
    })
})



// New Session

$(document).ready(function () {
    $("#NewsessionBtn").on("click", function () {

        $('.chatcontainer').addClass('hidden');
        $('.initialcontainer').removeClass('hidden');

        $(".chatinput1").val("")
        $("#sessionId").val("")

        $(".answer_div").remove()
        $(".question_div").remove()

        // document.cookie = "session_cookies=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
     
        sessionStorage.removeItem("session_cookies");


        window.location.reload()




    })
})


// Add chat history session 

$(document).ready(function () {

    $(".chathistorybtn").on("click", function () {

        session_id = $(this).find("span").attr("session-id")

        // remove active from all
        $(".chathistorybtn").removeClass("active");

        // add active to clicked
        $(this).addClass("active");

        $("#sessionId").val(session_id)

        // Update session cookies

        // document.cookie = "session_cookies=" + session_id +
        //     "; path=/";

        sessionStorage.setItem("session_cookies", session_id);

        AssistantId = $("#assistantid").val()

        // Update Assistant cookies

        sessionStorage.setItem("Assistant_cookies", AssistantId);

        // document.cookie = "Assistant_cookies=" + AssistantId +
        //     "; path=/";

        $.ajax({
            url: "/getchat",
            type: "post",

            data: {
                SessionID: session_id,
                assistantid: AssistantId,
                csrf: $("input[name='csrf']").val(),

            }, success: function (result) {

                $("#sessionId").val(result.session_id)

                $('.chatcontainer').removeClass('hidden');
                $('.initialcontainer').addClass('hidden');


                $(".answer_div").remove()
                $(".question_div").remove()

                result.QAList.forEach(function (item) {

                    const chatappendElement = $("#chatcontainer");
                    chatappendElement.append(`<div class="ms-auto question_div w-fit max-w-[50%] bg-[#F0EFE6] rounded-[8px] p-[12px_16px] mb-[30px] last:mb-0">
                            <p class="text-base text-[16px]leading-[19px] font-normal text-[#141413] " >
                            ${item.question}
                            </p>
                        </div>`)


                    chatappendElement.append(`
                                    <div class="w-fit max-w-full answer_div me-auto mb-[30px] last:mb-0 flex items-start gap-[6px]">
                                        <div class="min-w-[30px] mt-[4px]">
                                            <img src="/website/public/img/chat-logo.svg" alt="">
                                        </div>
                                        <div class="ai-response break-words overflow-x-auto max-w-full text-[16px] leading-[24px]">${item.answer}<ul class="mb-[16px] ps-[24px]"></ul></div>
                                    </div>
                                
        `);



                })

            }

        })

    })
})



$(document).on("click", ".block", function () {
    setTimeout(function () {
        $("el-menu[popover]").attr("style", function (i, s) {
            return (s || "") + "left:0px !important;";
        });
    }, 10);
});











// Common header and footer
$(function () {
    const version = "2.0";
    $("#header").load("../common/header.html?v=" + version, function () {
        initHeaderToggle();
    });
    $("#footer").load("../common/footer.html?v=" + version);
    $("#sidebar").load("../common/sidebar.html?v=" + version);
});


document.querySelectorAll(".dark-btn").forEach((b) => {
    b.onmouseleave = (e) => {
        const btn = e.currentTarget;
        btn.style.background = "#202732";
        btn.style.borderImage = "#C1C9D7";
    };

    b.addEventListener("mousemove", (e) => {
        const btn = e.currentTarget; // always refer to the button, not child img
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        btn.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.2), rgba(255,255,255,0))`;
    });
});


// toggle
function initHeaderToggle() {
    const asides = document.querySelectorAll('.aitools-aside');
    if (!asides.length) return;

    function handleAsideState() {
        asides.forEach(aside => {
            aside.classList.remove('open', window.innerWidth >= 1024);
        });
    }

    handleAsideState();
    window.addEventListener('resize', handleAsideState);

    document.addEventListener('click', function (e) {
        const btn = e.target.closest('.menu-btn');
        if (!btn) return;

        asides.forEach(aside => aside.classList.toggle('open'));
    });
}







// aitools page horizontal scroll

document.querySelectorAll('.scroll-section').forEach(section => {
    const container = section.querySelector('.scroll-container');
    const btnLeft = section.querySelector('.scroll-left');
    const btnRight = section.querySelector('.scroll-right');
    const scrollAmount = 300;

    function updateButtons() {
        btnLeft.disabled = container.scrollLeft <= 0;
        btnRight.disabled = container.scrollLeft + container.clientWidth >= container.scrollWidth - 5;
    }

    btnLeft.addEventListener('click', () => {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    btnRight.addEventListener('click', () => {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    container.addEventListener('scroll', updateButtons);
    window.addEventListener('load', updateButtons);
});




// bg change animation
document.addEventListener('DOMContentLoaded', () => {
    const sectionBg = document.querySelector('.section-bg');
    const images = document.querySelectorAll('.bg-img');
    const sections = document.querySelectorAll('.relative > section');

    const sectionData = [
        { colorClass: 'bg-[#00B050]', bgImgClass: 'bg-img-1' },
        { colorClass: 'bg-[#0078FF]', bgImgClass: 'bg-img-2' },
        { colorClass: 'bg-[#FF6B6B]', bgImgClass: 'bg-img-3' },
        { colorClass: 'bg-[#7C3AED]', bgImgClass: 'bg-img-4' }
    ];

    const observerOptions = {
        rootMargin: '0px 0px -70% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const index = Array.from(sections).indexOf(entry.target);

            // Fade switch foreground images
            images.forEach((img, i) => {
                img.classList.toggle('opacity-100', i === index);
                img.classList.toggle('opacity-0', i !== index);
            });

            // Remove old bg classes
            sectionData.forEach(d => {
                sectionBg.classList.remove(d.colorClass, d.bgImgClass);
            });

            // Add new bg color + image
            sectionBg.classList.add(
                sectionData[index].colorClass,
                sectionData[index].bgImgClass
            );
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    // Initial state
    sectionBg.classList.add(
        sectionData[0].colorClass,
        sectionData[0].bgImgClass
    );
});


// bg change animation



// reveal on scroll Animation
document.addEventListener("DOMContentLoaded", () => {
    const revealElements = document.querySelectorAll(".reveal-on-scroll");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove("opacity-0", "translate-x-[100px]");
                entry.target.classList.add("opacity-100", "translate-x-0");
            }
        });
    }, { threshold: 0.2 });

    revealElements.forEach(el => observer.observe(el));
});










const CLOSE_TIME = 350;  // smooth close
const OPEN_TIME = 450;  // smooth open
const AUTO_TIME = 6000; // autoplay cycle


const items = [...document.querySelectorAll('.industries_titles_right')];
const progress = document.getElementById('progress');

let active = 0;
let animating = false;
let timer = null;

function animateHeight(el, from, to, duration) {
    return new Promise(resolve => {
        el.style.maxHeight = from + "px";
        el.style.transition = "max-height " + duration + "ms ease";

        requestAnimationFrame(() => {
            el.style.maxHeight = to + "px";
        });

        setTimeout(() => {
            resolve();
        }, duration);
    });
}


async function openItem(index) {
    const item = items[index];
    const desc = item.querySelector('.desc');

    item.classList.add('industries-titles-right-active');
    desc.classList.add('open-desc');

    const target = desc.scrollHeight;
    await animateHeight(desc, 0, target, OPEN_TIME);
}


async function closeItem(index) {
    const item = items[index];
    const desc = item.querySelector('.desc');

    const currentHeight = desc.scrollHeight;

    await animateHeight(desc, currentHeight, 0, CLOSE_TIME);

    desc.classList.remove('open-desc');
    item.classList.remove('industries-titles-right-active');
}


async function changeItem(next) {
    if (animating || next === active) return;
    animating = true;

    await closeItem(active);
    await openItem(next);

    active = next;
    animating = false;

    restartProgress();
}


function restartProgress() {
    progress.style.transition = "none";
    progress.style.width = "100%";
    void progress.offsetWidth;
    progress.style.transition = "width " + AUTO_TIME + "ms linear";
    progress.style.width = "0%";

    clearTimeout(timer);
    timer = setTimeout(() => {
        const next = (active + 1) % items.length;
        changeItem(next);
    }, AUTO_TIME);
}


items.forEach((item, index) => {
    item.addEventListener('click', () => changeItem(index));
});


(async function init() {
    await openItem(active);
    restartProgress();
})();



// scroll vertical to change banner on right in industry detail page
$(function () {

    // show image1 by default
    $("#image1").removeClass("opacity-0 invisible");

    function revealImage() {
        $(".content-block").each(function () {
            let top = $(this)[0].getBoundingClientRect().top;
            let height = $(this).outerHeight();
            let windowHeight = window.innerHeight;

            if (top < windowHeight * 0.5 && top + height > windowHeight * 0.3) {
                let imgId = $(this).data("img");

                $(".screen-img").addClass("opacity-0 invisible absolute");
                $("#" + imgId).removeClass("opacity-0 invisible absolute");

            }
        });
    }

    $(window).on("scroll", revealImage);

    revealImage();
});









//For flowbite accordion collpase function
let currentIndex = 0;
let total = 2;
let autoTimer;

function toggleAccordion(index) {

    // NEW ACCORDION CONTENTS ONLY
    const content = document.querySelector(`.new-acc #content-${index}`);
    const rightImage = document.querySelector("#right-side-img");

    // Select ONLY new accordion contents + blocks
    const allContents = document.querySelectorAll('.new-acc [id^="content-"]');
    const allBlocks = document.querySelectorAll('.new-acc .acc-block');

    // Close all NEW accordions only
    allContents.forEach(c => {
        c.style.maxHeight = "0px";
        c.dataset.open = "false";
    });

    // Remove highlight width
    allBlocks.forEach(b => b.classList.remove("accordion-active", "accordion-active-bg"));

    // Open selected
    content.style.maxHeight = content.scrollHeight + "px";
    content.dataset.open = "true";

    // Expand before-line width
    content.parentElement.classList.add("accordion-active", "accordion-active-bg");

    // Right side image update
    rightImage.src = content.dataset.img;

    currentIndex = index;
}

function autoRotate() {
    currentIndex++;
    if (currentIndex > total) currentIndex = 1;
    toggleAccordion(currentIndex);
}

autoTimer = setInterval(autoRotate, 10000);

function toggleAccordionOld(index) {
    const content = document.getElementById(`content-${index}`);
    const icon = document.getElementById(`icon-${index}`);

    const minusSVG = `
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 12H4" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    `;

    const plusSVG = `
       <svg width="28" height="28" viewBox="0 0 24 24" fill="none"  xmlns="http://www.w3.org/2000/svg">
       <path d="M12 4V20M20 12H4" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    `;

    if (content.style.maxHeight && content.style.maxHeight !== "0px") {
        content.style.maxHeight = "0";
        icon.innerHTML = plusSVG;
    } else {
        content.style.maxHeight = content.scrollHeight + "px";
        icon.innerHTML = minusSVG;
    }
}


// for overall card translate botttom to top animation
$(function () {
    const parents = $(".parent");

    parents.each(function () {
        const parent = $(this);
        const items = parent.find(".transform-element, .transform-element-x-r, .transform-element-x-l");

        function checkVisibility() {
            const windowTop = $(window).scrollTop();
            const windowBottom = windowTop + $(window).height();

            items.each(function (index) {
                const el = $(this);
                if (el.hasClass("show")) return;

                const elTop = el.offset().top;
                const elBottom = elTop + el.outerHeight();

                if (elBottom > windowTop && elTop < windowBottom) {
                    // Small stagger, capped
                    const delay = Math.min(index * 0.03, 0.15);
                    el.css("transition-delay", delay + "s");
                    el.addClass("show");
                }
            });
        }

        checkVisibility();
        $(window).on("scroll", checkVisibility);
    });
});


$(function () {
    const parents = $(".parent");

    parents.each(function () {
        const parent = $(this);
        const items = parent.find(".transform-element, .transform-element-x-r, .transform-element-x-l");

        function checkVisibility() {
            const windowTop = $(window).scrollTop();
            const windowBottom = windowTop + $(window).height();

            items.each(function (index) {
                const el = $(this);
                if (el.hasClass("show")) return;

                const elTop = el.offset().top;
                const elBottom = elTop + el.outerHeight();

                if (elBottom > windowTop && elTop < windowBottom) {
                    // Small stagger, capped
                    const delay = Math.min(index * 0.03, 0.15);
                    el.css("transition-delay", delay + "s");
                    el.addClass("show");
                }
            });
        }

        checkVisibility();
        $(window).on("scroll", checkVisibility);
    });
});


// For Our Team behind the work section function

const sticky = document.getElementById('roleSticky');
const sections = document.querySelectorAll('#developer, #manager, #designer');

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                sticky.classList.remove('developer', 'manager', 'designer');
                sticky.classList.add(entry.target.id);
            }
        });
    },
    {
        rootMargin: '-40% 0px -40% 0px',
        threshold: 0
    }
);

sections.forEach(section => observer.observe(section));



// For Autoscroll company in home page
$(function () {
    const $container = $('#scrollContainer');
    const $pauseBtn = $('#scrollPauseBtn');

    // 🔒 If container is missing, stop script
    if (!$container.length) return;

    let autoScroll = null;
    let isPaused = false;

    const speed = 1;
    const interval = 20;

    function startAutoScroll() {
        if (autoScroll) return;

        autoScroll = setInterval(() => {
            if (isPaused) return;

            const el = $container[0];
            if (!el) return; // extra safety

            const maxScroll = el.scrollWidth - el.clientWidth;

            if ($container.scrollLeft() >= maxScroll) {
                $container.scrollLeft(0);
            } else {
                $container.scrollLeft($container.scrollLeft() + speed);
            }
        }, interval);
    }

    function stopAutoScroll() {
        clearInterval(autoScroll);
        autoScroll = null;
    }

    // ▶ Start
    startAutoScroll();

    // ⏸ Pause / Resume
    $pauseBtn.on('click', function (e) {
        e.preventDefault();
        isPaused = !isPaused;
        $(this).toggleClass('opacity-50');
    });

    // 🖱 Hover pause
    $container.on('mouseenter', () => (isPaused = true));
    $container.on('mouseleave', () => (isPaused = false));

    // ✋ User interaction pause
    $container.on('wheel touchstart', () => (isPaused = true));
});


//h-scroll with innerlink
$(function () {
    const $links = $('.h-scroll a');
    const offset = 124; // sticky top offset

    $(window).on('scroll', function () {
        const scrollPos = $(window).scrollTop() + offset;
        let currentId = null;

        $('[id^="section"]').each(function () {
            const top = $(this).offset().top;
            const bottom = top + $(this).outerHeight();

            if (scrollPos >= top && scrollPos < bottom) {
                currentId = $(this).attr('id');
                return false; // stop loop once found
            }
        });

        if (currentId) {
            $links.removeClass('active');
            $links.filter(`[href="#${currentId}"]`).addClass('active');
        }
    });
});


// For infinite scroll in home page
$(document).ready(function () {
    let track = $(".scroll-track");
    let content = track.html();

    // duplicate once
    track.append(content);
});


function toggleAccordionfaq(index) {
    const content = document.getElementById(`content-${index}`);
    const button = document.getElementById(`btn-${index}`);
    const icon = document.getElementById(`icon-${index}`);
    const wrapper = document.querySelector(`.accord-${index}`);

    const minusSVG = `<img src="../img/accord-up.svg" alt="">`;
    const plusSVG = `<img src="../img/accord-down.svg" alt="">`;

    if (content.style.maxHeight && content.style.maxHeight !== '0px') {
        content.style.maxHeight = '0';
        icon.innerHTML = plusSVG;
        button.classList.remove('active');
        wrapper.classList.remove('active')
    } else {
        content.style.maxHeight = content.scrollHeight + 'px';
        icon.innerHTML = minusSVG;
        button.classList.add('active');
        wrapper.classList.add('active')
    }
}



$(document).ready(function () {
    let currentIndex = 0;
    const totalSlides = $('.indicator').length;
    const $track = $('#carousel-track');

    function updateCarousel(index) {
        currentIndex = index;
        $track.css('transform', `translateX(-${index * 100}%)`);

        $('.indicator')
            .removeClass('bg-[#1C2024]')
            .addClass('bg-[#F3F3F7]');

        $('.indicator')
            .eq(index)
            .removeClass('bg-[#F3F3F7]')
            .addClass('bg-[#1C2024]');
    }

    // Indicator click
    $('.indicator').on('click', function () {
        const index = $(this).data('index');
        updateCarousel(index);
    });

    // Auto slide (optional)
    setInterval(() => {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel(currentIndex);
    }, 4000);

    // Init
    updateCarousel(0);
});



// rag

const aside = document.getElementById('aitools-aside');

// FORCE CLOSE on page load (mobile)
if (window.innerWidth < 1024) {
    aside.classList.remove('open');
}

// Toggle on click (all sizes)
document.querySelectorAll('.menu-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
        e.preventDefault();
        aside.classList.toggle('open');
    });
});

// Auto-close when resizing to mobile
window.addEventListener('resize', () => {
    if (window.innerWidth < 768) {
        aside.classList.remove('open');
    }
});

function toggleAccordionmanual(index) {
    const contentt = document.getElementById(`cont-${index}`);
    const icon = document.getElementById(`icon-${index}`);

    // SVG for Minus icon
    const minusSVG = `
     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M20 12H4" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

    `;

    // SVG for Plus icon
    const plusSVG = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 4V20M20 12H4" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

    `;

    // Toggle the content's max-height for smooth opening and closing
    if (contentt.style.maxHeight && contentt.style.maxHeight !== '0px') {
        contentt.style.maxHeight = '0';
        icon.innerHTML = plusSVG;
    } else {
        contentt.style.maxHeight = contentt.scrollHeight + 'px';
        icon.innerHTML = minusSVG;
    }
}



// signin_button

$(document).ready(function () {

    $("#signin_button").on("click", function () {

        value = $(this).find("p").text()

        if (value == "Sign in") {

            $('#loginModal')[0].showModal();

        }

    })
})


document.getElementById("loginModal").addEventListener("close", function () {
    $("#chatloginform")[0].reset();

    $("#email_error").hide();
    $("#pass_error").hide();
});