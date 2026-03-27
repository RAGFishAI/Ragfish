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
    const items = parent.find(".transform-element");

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

