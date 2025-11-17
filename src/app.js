console.log("JS OK!");

/* 
 ১. Navbar Toggle (মোবাইলে মেনু খোলা/বন্ধ)
*/
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {
    // মেনু হাইড করা থাকলে দেখাবে, আর থাকলে লুকাবে
    mobileMenu.classList.toggle("hidden");
  });

  // মেনুর কোনো লিঙ্কে ক্লিক করলে মেনু আবার বন্ধ হবে
  document.querySelectorAll("#mobile-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });
  });
}

/*  ২. Scroll করলে বর্তমান সেকশন navbar এ highlight হবে */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("nav a[href^='#']");

window.addEventListener("scroll", () => {
  let current = "";

  // স্ক্রল অনুযায়ী কোন সেকশনে আছি সেটা বের করা
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100; // কিছু মার্জিন
    const sectionHeight = section.clientHeight;
    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      current = section.getAttribute("id");
    }
  });

  // navbar এ সংশ্লিষ্ট লিঙ্কে active ক্লাস যোগ করা
  navLinks.forEach((link) => {
    link.classList.remove("text-amber-500", "font-semibold");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("text-amber-500", "font-semibold");
    }
  });
});

//Navbar scroll Animation
const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
  reveals.forEach((el) => {
    const windowHeight = window.innerHeight;
    const revealTop = el.getBoundingClientRect().top;

    if (revealTop < windowHeight - 100) {
      el.classList.add("opacity-100", "translate-y-0");
      el.classList.remove("opacity-0", "translate-y-10");
    } else {
      el.classList.remove("opacity-100", "translate-y-0");
      el.classList.add("opacity-0", "translate-y-10");
    }
  });
});

//Back To Top Buttom

const toTop = document.getElementById("toTop");
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    toTop.classList.remove("hidden");
  } else {
    toTop.classList.add("hidden");
  }
});

toTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

//Counter Animation (About Section)
const counters = document.querySelectorAll(".counter");
let started = false;

function startCounter() {
  if (started) return;
  started = true;

  counters.forEach((counter) => {
    const target = +counter.getAttribute("data-target");
    const speed = 30;

    const updateCount = () => {
      const current = +counter.innerText;
      const increment = Math.ceil(target / 100);

      if (current < target) {
        counter.innerText = current + increment;
        setTimeout(updateCount, speed);
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  });
}

// About section scroll korle count dekha jabe

window.addEventListener("scroll", () => {
  const aboutSection = document.querySelector("#about");
  const position = aboutSection.getBoundingClientRect().top;

  if (position < window.innerHeight - 100) {
    startCounter();
  }
});

//Services section js

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove("opacity-0", "translate-y-6");
        entry.target.classList.add("opacity-100", "translate-y-0");
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll(".service-card").forEach((card) => {
  card.classList.add("transition", "duration-700");
  observer.observe(card);
});

const modal = document.getElementById("serviceModal");
const closeBtn = document.getElementById("closeModal");
const title = document.getElementById("modalTitle");
const text = document.getElementById("modalText");

document.querySelectorAll(".service-card").forEach((card) => {
  card.addEventListener("click", () => {
    title.textContent = card.dataset.title;
    text.textContent = card.dataset.text;
    modal.classList.remove("hidden");
    modal.classList.add("flex");
  });
});

closeBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
  modal.classList.remove("flex");
});
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
});

// Consultants Section

const modal1 = document.getElementById("consultModal");
const closeBtn1 = document.getElementById("closeConsult");
const nameEl = document.getElementById("cName");
const roleEl = document.getElementById("cRole");
const infoEl = document.getElementById("cInfo");
const imgEl = document.getElementById("cImg");

document.querySelectorAll(".btn-details").forEach((btn) => {
  btn.addEventListener("click", () => {
    nameEl.textContent = btn.dataset.name;
    roleEl.textContent = btn.dataset.role;
    infoEl.textContent = btn.dataset.info;
    imgEl.src = btn.dataset.img;
    modal1.classList.remove("hidden");
    modal1.classList.add("flex");
  });
});

closeBtn1.addEventListener("click", () => modal1.classList.add("hidden"));
modal1.addEventListener("click", (e) => {
  if (e.target === modal1) modal1.classList.add("hidden");
});

// Auto slider effect
const grid = document.querySelector("#consultants .grid");
let scrollPos = 0;

setInterval(() => {
  scrollPos += 300; // প্রতি বার ৩০০পিক্সেল করে এগোবে
  if (scrollPos >= grid.scrollWidth - grid.clientWidth) scrollPos = 0;
  grid.scrollTo({ left: scrollPos, behavior: "smooth" });
}, 3000);

//FAQ section

//All element ke call kora hoyse

const faqButtons = document.querySelectorAll("[data-faq-btn]");
const faqAssistBar = document.getElementById("faqAssistBar");
faqButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const id = button.dataset.faqBtn;
    // যেই FAQ খুলো, browser automatically উপরে এনে দেখাবে
    button.scrollIntoView({ behavior: "smooth", block: "center" });

    const content = document.getElementById("faq-content-" + id);
    const icon = document.getElementById("icon-" + id);
    const isOpen = !content.classList.contains("hidden");
    const allcontents = document.querySelectorAll(".faq-content");
    const allIcons = document.querySelectorAll("[id^='icon-']");

    allcontents.forEach(function (item) {
      item.style.height = "0px"; //Smooth Slide Animation (Accordion effect)
      item.classList.add("hidden");
    });

    allIcons.forEach(function (ic) {
      ic.textContent = "+";
      ic.classList.remove("rotate-180"); //rotate korbe qus clicl korle
    });

    if (!isOpen) {
      content.classList.remove("hidden");
      content.style.height = content.scrollHeight + "px"; //Smooth Slide Animation (Accordion effect)
      icon.textContent = "-";
      icon.classList.add("rotate-180"); //rotate korbe qus clicl korle
    }

    if (faqAssistBar) {
      let anyOpen = false;

      document.querySelectorAll(".faq-content").forEach(function (item) {
        if (!item.classList.contains("hidden")) {
          anyOpen = true;
        }
      });
      if (anyOpen) {
        faqAssistBar.classList.remove("hidden");
      } else {
        faqAssistBar.classList.add("hidden");
      }
    }
  });
});

// contact section

// Element call kora hoyse
var form = document.getElementById("contactForm");
var nameInput = document.getElementById("name");
var phoneInput = document.getElementById("phone");
var emailInput = document.getElementById("email");
var messageInput = document.getElementById("message");
var submitBtn = document.getElementById("contactSubmit");
var feedbackBox = document.getElementById("formFeedback");

var nameError = document.getElementById("nameError");
var phoneError = document.getElementById("phoneError");
var emailError = document.getElementById("emailError");

//ফর্ম সাবমিট ইভেন্ট ধরো
form.addEventListener("submit", function (event) {
  event.preventDefault();

  var nameValue = nameInput.value.trim();
  var phoneValue = phoneInput.value.trim();
  var emailValue = emailInput.value.trim();
  var messageValue = messageInput.value.trim();

  nameError.textContent = "";
  phoneError.textContent = "";
  emailError.textContent = "";

  nameError.classList.add("hidden");
  phoneError.classList.add("hidden");
  emailError.classList.add("hidden");

  feedbackBox.textContent = "";
  feedbackBox.className = "";

  var hasError = false;
  if (nameValue === "") {
    nameError.textContent = "নাম লিখুন।";
    nameError.classList.remove("hidden");
    hasError = true;
  }

  if (phoneValue === "") {
    phoneError.textContent = "ফোন নম্বর লিখুন।";
    phoneError.classList.remove("hidden");
    hasError = "true";
  } else if (phoneValue.length < 11) {
    phoneError.textContent = "ফোন নম্বর কমপক্ষে ১১ ডিজিট হওয়া উচিত।";
    phoneError.classList.remove("hidden");
    hasError = true;
  }

  if (emailValue !== "" && !emailValue.includes("@")) {
    emailError.textContent =
      "সঠিক ইমেইল অ্যাড্রেস লিখুন (যেমন: name@example.com)।";
    emailError.classList.remove("hidden");
    hasError = true;
  }

  if (hasError) {
    return;
  }

  feedbackBox.textContent =
    "ধন্যবাদ! আপনার বার্তা সফলভাবে পাঠানো হয়েছে (demo)।";
  feedbackBox.className = "text-emerald-600 font-medium mt-2";

  form.reset();
});
