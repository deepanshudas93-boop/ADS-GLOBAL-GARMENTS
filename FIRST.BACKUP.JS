// =====================================================
// ADS GLOBAL GARMENTS - MAIN JAVASCRIPT
// =====================================================


// ================= MOBILE MENU =================

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

if (menuBtn && mobileMenu) {

  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");

    if (mobileMenu.classList.contains("open")) {
      menuBtn.innerHTML = "✕";
    } else {
      menuBtn.innerHTML = "☰";
    }
  });

  document.querySelectorAll(".mobile-menu a").forEach(link => {

    link.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      menuBtn.innerHTML = "☰";
    });

  });

}


// ================= SCROLL REVEAL ANIMATION =================

const observer = new IntersectionObserver(

  (entries) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }

    });

  },

  {
    threshold: 0.12
  }

);

document.querySelectorAll(".reveal").forEach((element) => {
  observer.observe(element);
});


// ================= PRODUCT WHATSAPP INQUIRY =================

function productInquiry(productName) {

  const message =

`Hello ADS Global Garments,

I am interested in your ${productName} manufacturing services.

Please share more details regarding:

• MOQ
• Fabric options
• GSM
• Available colours
• Available sizes
• Pricing
• Production time
• Customization options

Thank you.`;

  const whatsappURL =
    "https://wa.me/919958286911?text=" +
    encodeURIComponent(message);

  window.open(whatsappURL, "_blank");

}


// ================= CONTACT FORM =================

const quoteForm = document.getElementById("quoteForm");

if (quoteForm) {

  quoteForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name =
      document.getElementById("name").value.trim();

    const company =
      document.getElementById("company").value.trim();

    const email =
      document.getElementById("email").value.trim();

    const country =
      document.getElementById("country").value.trim();

    const product =
      document.getElementById("product").value;

    const quantity =
      document.getElementById("quantity").value.trim();

    const message =
      document.getElementById("message").value.trim();


    const whatsappMessage =

`Hello ADS Global Garments,

I would like to make a garment manufacturing inquiry.

━━━━━━━━━━━━━━━━━━

Name: ${name}

Company: ${company || "Not provided"}

Business Email: ${email}

Country: ${country || "Not provided"}

Product: ${product || "Not selected"}

Estimated Quantity: ${quantity || "Not provided"}

━━━━━━━━━━━━━━━━━━

Requirements:

${message || "No additional requirements provided."}

━━━━━━━━━━━━━━━━━━

Please share your quotation and further details.

Thank you.`;

    const whatsappURL =
      "https://wa.me/919958286911?text=" +
      encodeURIComponent(whatsappMessage);

    window.open(whatsappURL, "_blank");

    quoteForm.reset();

  });

}


// ================= NAVBAR ON SCROLL =================

const navbar = document.querySelector(".navbar");

if (navbar) {

  window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

      navbar.style.background =
        "rgba(8, 8, 8, 0.97)";

    } else {

      navbar.style.background =
        "rgba(8, 8, 8, 0.82)";

    }

  });

}


// ================= CLOSE MOBILE MENU OUTSIDE CLICK =================

document.addEventListener("click", (event) => {

  if (
    mobileMenu &&
    menuBtn &&
    mobileMenu.classList.contains("open") &&
    !mobileMenu.contains(event.target) &&
    !menuBtn.contains(event.target)
  ) {

    mobileMenu.classList.remove("open");
    menuBtn.innerHTML = "☰";

  }

});


// ================= CONSOLE MESSAGE =================

console.log(
  "ADS Global Garments website loaded successfully."
);