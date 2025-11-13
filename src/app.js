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

const faqList = document.getElementById("faqList");

// প্রশ্ন + উত্তর ডেটা
const faqs = [
  {
    id: "faq1",
    q: "হজ বা উমরাহ ভিসা কিভাবে পাওয়া যায়?",
    a: "GoZiyarah সম্পূর্ণ ভিসা প্রসেসিংয়ের দায়িত্ব নেয়।",
  },
  {
    id: "faq2",
    q: "হজ বা উমরাহ প্যাকেজের মোট খরচ কত?",
    a: "প্যাকেজের ধরন অনুযায়ী খরচ ভিন্ন হয়।",
  },
  {
    id: "faq3",
    q: "গাইড সার্ভিস কি অন্তর্ভুক্ত?",
    a: "জি হ্যাঁ, প্রতিটি প্যাকেজে গাইড থাকে।",
  },
  {
    id: "faq4",
    q: "মেয়েরা কি একা হজ বা উমরাহ করতে পারেন?",
    a: "মাহরাম ছাড়া হজ করা নিরুৎসাহিত।",
  },
  {
    id: "faq5",
    q: "বুকিং প্রক্রিয়াটি কেমন?",
    a: "অনলাইনে অথবা অফিসে এসে বুক করা যায়।",
  },
];

// ---- FAQ HTML তৈরি ----
faqs.forEach((item) => {
  const details = document.createElement("details");
  details.className =
    "bg-white border border-blue-300 rounded-xl shadow-sm p-5 transition-all duration-300";

  const summary = document.createElement("summary");
  summary.innerHTML = `
    <span>${item.q}</span>
    <span class="arrow text-blue-700 transition-transform duration-300">⌄</span>
  `;
  summary.className =
    "flex justify-between items-center cursor-pointer text-lg font-medium text-blue-900 select-none";

  summary.querySelector(".arrow").classList.toggle("rotate-180");

  const p = document.createElement("p");
  p.textContent = item.a;
  p.className =
    "mt-3 text-gray-700 leading-relaxed border-t border-blue-100 pt-3";

  const wrapper = document.createElement("div");
  wrapper.className =
    "faq-content overflow-hidden transition-all duration-300 max-h-0";

  wrapper.appendChild(p);
  details.appendChild(summary);
  details.appendChild(wrapper);
  faqList.appendChild(details);
});

// ---- Custom Toggle Logic (Smooth Animation + One Open at a Time) ----
faqList.addEventListener("click", (e) => {
  const clickedSummary = e.target.closest("summary");
  if (!clickedSummary) return;

  const clickedDetails = clickedSummary.parentElement;

  // অন্য সব বন্ধ করো
  document.querySelectorAll("#faqList details").forEach((d) => {
    const content = d.querySelector(".faq-content");

    if (d !== clickedDetails) {
      d.removeAttribute("open");
      content.style.maxHeight = "0px";
    }
  });

  // নিজেরটা toggle করো
  const content = clickedDetails.querySelector(".faq-content");

  if (clickedDetails.hasAttribute("open")) {
    clickedDetails.removeAttribute("open");
    content.style.maxHeight = "0px";
  } else {
    clickedDetails.setAttribute("open", "");
    content.style.maxHeight = content.scrollHeight + "px";
  }
});
/*
//card–এ highlight effect
faqList.addEventListener("toggle", (e) => {
  const d = e.target;
  if (d.tagName !== "DETAILS") return;

  if (d.open) {
    d.classList.add("border-blue-500", "shadow-lg");
  } else {
    d.classList.remove("border-blue-500", "shadow-lg");
  }
});

//Auto-scroll to opened question (যখন এক প্রশ্ন খুলবে →
// পেজ নিজে নিজে স্ক্রল করে সেই প্রশ্নটি স্ক্রিনের মাঝখানে নিয়ে আসবে।)

faqList.addEventListener("toggle", (e) => {
  const d = e.target;
  if (d.tagName !== "DETAILS" || !d.open) return;

  d.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
});*/
