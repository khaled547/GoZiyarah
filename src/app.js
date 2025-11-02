

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

/* ৩. FAQ সেকশন Toggle (accordion effect) */
// সব <details> এলিমেন্ট সিলেক্ট করা
const faqItems = document.querySelectorAll("#faq details");

faqItems.forEach((item) => {
  item.addEventListener("toggle", () => {
    // যখন একটি FAQ খোলে, অন্যগুলো বন্ধ হবে
    if (item.open) {
      faqItems.forEach((other) => {
        if (other !== item) {
          other.removeAttribute("open");
        }
      });
    }
  });
});

/*৪. Contact Form Submit Alert */
const contactForm = document.querySelector("form");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault(); // পেজ রিফ্রেশ বন্ধ করে
    alert(
      "✅ আপনার বার্তা সফলভাবে পাঠানো হয়েছে! \nআমাদের টিম খুব শীঘ্রই আপনার সাথে যোগাযোগ করবে।"
    );
    contactForm.reset();
  });
}

/* ঐচ্ছিক: স্ক্রল করলে Navbar ছোট করা (স্টিকি effect)*/
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("shadow-lg", "py-2");
  } else {
    header.classList.remove("shadow-lg", "py-2");
  }
});
