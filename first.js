const SUPABASE_URL =
  "https://vmqobgowygkofnsigaqz.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_R4SJlEqJATYIisBLbD4lSg_5a6b9thT";

const supabaseClient =
  window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
  );


// ===============================
// MOBILE MENU
// ===============================

const menuBtn =
  document.getElementById("menuBtn");

const mobileMenu =
  document.getElementById("mobileMenu");

if (menuBtn && mobileMenu) {

  menuBtn.addEventListener("click", () => {

    mobileMenu.classList.toggle("open");

    if (mobileMenu.classList.contains("open")) {
      menuBtn.innerHTML = "✕";
    } else {
      menuBtn.innerHTML = "☰";
    }

  });

  document
    .querySelectorAll(".mobile-menu a")
    .forEach(link => {

      link.addEventListener("click", () => {

        mobileMenu.classList.remove("open");
        menuBtn.innerHTML = "☰";

      });

    });

}


// ===============================
// CLOSE MENU OUTSIDE CLICK
// ===============================

document.addEventListener("click", event => {

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


// ===============================
// SCROLL ANIMATION
// ===============================

const observer =
  new IntersectionObserver(

    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add("active");

        }

      });

    },

    {
      threshold: 0.12
    }

  );


document
  .querySelectorAll(".reveal")
  .forEach(element => {

    observer.observe(element);

  });


// ===============================
// WHATSAPP PRODUCT INQUIRY
// ===============================

function productInquiry(productName) {

  const message =

`Hello ADS Global Garments,

I am interested in your ${productName} manufacturing services.

Please share more details regarding:

- MOQ
- Fabric options
- GSM
- Pricing
- Production time
- Customization options

Thank you.`;

  const whatsappURL =
    "https://wa.me/919211392396?text=" +
    encodeURIComponent(message);

  window.open(
    whatsappURL,
    "_blank"
  );

}


// ===============================
// LOAD PRODUCTS FROM SUPABASE
// ===============================

async function loadProductsOnHomePage() {

  const productGrid =
    document.querySelector(".product-grid");


  if (!productGrid) {

    console.log(
      "Product grid not found"
    );

    return;

  }


  const {
    data: products,
    error
  } =
    await supabaseClient

      .from("products")

      .select("*")

      .order(
        "created_at",
        {
          ascending: false
        }
      );


  if (error) {

    console.error(
      "Supabase error:",
      error
    );

    return;

  }


  console.log(
    "Products loaded:",
    products
  );


  if (
    !products ||
    products.length === 0
  ) {

    console.log(
      "No products found"
    );

    return;

  }


  productGrid.innerHTML = "";


  products.forEach(
    (product, index) => {


      const card =
        document.createElement(
          "div"
        );


      card.className =
        "product-card reveal";


      const videoBadge =
        product.video_url

          ?

          `<span class="video-badge">▶ VIDEO</span>`

          :

          "";


      card.innerHTML = `

        <div
          class="product-image"
          style="background-image: url('${escapeHTML(
            product.image_url || ""
          )}'); position: relative;"
        >

          ${videoBadge}

        </div>


        <div class="product-info">


          <span>

            ${String(index + 1).padStart(2, "0")}

          </span>


          <h3>

            ${escapeHTML(
              product.name
            )}

          </h3>


          <p>

            ${escapeHTML(

              product.description ||

              product.fabric ||

              "Premium quality garment manufactured according to your requirements."

            )}

          </p>


          <button
            class="inquiry-button"
            type="button"
          >

            Request Inquiry ↗

          </button>


        </div>

      `;


      card.addEventListener(
        "click",
        () => {

          openProduct(
            product.id
          );

        }
      );


      const inquiryButton =
        card.querySelector(
          ".inquiry-button"
        );


      inquiryButton.addEventListener(
        "click",
        event => {

          event.stopPropagation();

          productInquiry(
            product.name
          );

        }
      );


      productGrid.appendChild(
        card
      );


      observer.observe(
        card
      );

    }

  );

}


// ===============================
// OPEN PRODUCT DETAIL
// ===============================

function openProduct(
  productId
) {

  window.location.href =
    "product-details.html?id=" +
    encodeURIComponent(
      productId
    );

}


// ===============================
// SECURITY
// ===============================

function escapeHTML(
  value
) {

  return String(
    value || ""
  )

    .replace(
      /&/g,
      "&amp;"
    )

    .replace(
      /</g,
      "&lt;"
    )

    .replace(
      />/g,
      "&gt;"
    )

    .replace(
      /"/g,
      "&quot;"
    )

    .replace(
      /'/g,
      "&#039;"
    );

}


// ===============================
// CONTACT FORM
// ===============================

const quoteForm =
  document.getElementById(
    "quoteForm"
  );


if (quoteForm) {

  quoteForm.addEventListener(
    "submit",
    function(event) {


      event.preventDefault();


      const name =
        document
          .getElementById("name")
          .value
          .trim();


      const company =
        document
          .getElementById("company")
          .value
          .trim();


      const email =
        document
          .getElementById("email")
          .value
          .trim();


      const country =
        document
          .getElementById("country")
          .value
          .trim();


      const product =
        document
          .getElementById("product")
          .value;


      const quantity =
        document
          .getElementById("quantity")
          .value
          .trim();


      const message =
        document
          .getElementById("message")
          .value
          .trim();


      const whatsappMessage =

`Hello ADS Global Garments,

I would like to make a garment manufacturing inquiry.

Name: ${name}

Company: ${company || "Not provided"}

Business Email: ${email}

Country: ${country || "Not provided"}

Product: ${product || "Not selected"}

Estimated Quantity: ${quantity || "Not provided"}

Requirements:

${message || "No additional requirements provided."}

Please share your quotation and further details.

Thank you.`;


      const whatsappURL =
        "https://wa.me/919211392396?text=" +
        encodeURIComponent(
          whatsappMessage
        );


      window.open(
        whatsappURL,
        "_blank"
      );


      quoteForm.reset();

    }

  );

}


// ===============================
// NAVBAR SCROLL
// ===============================

window.addEventListener(
  "scroll",
  () => {


    const navbar =
      document.querySelector(
        ".navbar"
      );


    if (!navbar) {

      return;

    }


    if (
      window.scrollY > 50
    ) {

      navbar.style.background =
        "rgba(8,8,8,0.97)";

    } else {

      navbar.style.background =
        "rgba(8,8,8,0.82)";

    }

  }

);


// ===============================
// START WEBSITE
// ===============================

loadProductsOnHomePage();


console.log(
  "ADS Global Garments website loaded successfully."
);