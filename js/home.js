// ================================
// DOM LOAD
// ================================
document.addEventListener("DOMContentLoaded", () => {

  // First time default product set
  if (!localStorage.getItem("productList")) {
    const defaultProducts = [{
        productid: 1,
        Prdname: "Royal Oud",
        Price: 2500,
        Offer: 1999,
        image: "./img/coolwater.webp"
      },
      {
        productid: 2,
        Prdname: "Midnight Musk",
        Price: 1800,
        Offer: 1499,
        image: "./img/img1.jpg"
      }
    ];

    localStorage.setItem("productList", JSON.stringify(defaultProducts));
  }

  loadProducts();
  updateHeaderCount();
});


// ================================
// LOAD PRODUCTS
// ================================
function loadProducts() {

  let productCards = document.getElementById("productCards");
  if (!productCards) return;

  let productList = JSON.parse(localStorage.getItem("productList")) || [];

  let cards = "";

  productList.forEach((p) => {

    cards += `<div class="card1 card">

      <div class="offer">${calculateOffer(p.Price, p.Offer)}% OFF</div>
      <div class="icon-box">
         <i class="fa-regular fa-heart"></i>
         <i class="fa-solid fa-share-nodes"></i>
      </div>
        <img src="${p.image}" alt="${p.Prdname}" />
        <h3>${p.Prdname}</h3>
        <p class="oldprice">Rs. ${p.Price}</p>

     <div class="star">
        <h4>Rs. ${p.Offer}</h4>
        <h2>${calculateOffer(p.Price, p.Offer)}% OFF</h2>
        <i class="fa-solid fa-star" style="color: rgba(255,212,59,1)"></i>
        <h5>4.5</h5>
    </div>

    <div class="addcart">
       <button onclick="addToCart(${p.productid}, '${p.Prdname}', ${p.Offer}, '${p.image}')">
       Add To Cart
       </button>
    </div>
    </div>`;
  });

  productCards.innerHTML += cards;
}


// ================================
// OFFER CALCULATION
// ================================
function calculateOffer(price, offer) {
  return Math.round(((price - offer) / price) * 100);
}


// ================================
// ADD TO CART
// ================================
function addToCart(id, name, price, image) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingProduct = cart.find(item => item.id === id);

  if (existingProduct) {
    existingProduct.qty += 1;

    localStorage.setItem("cart", JSON.stringify(cart));

    updateHeaderCount();
    Swal.fire({
      icon: "success",
      title: "Added to Cart!",
      text: "Product successfully added",
      showConfirmButton: false,
      timer: 1500
    });
    return;
  }

  cart.push({
    id: id,
    name: name,
    price: price,
    image: image,
    qty: 1
  });

  localStorage.setItem("cart", JSON.stringify(cart));

  updateHeaderCount();

  Swal.fire({
    icon: "success",
    title: "Added to Cart!",
    showConfirmButton: false,
    timer: 1500
  });
}
// ================================
// UPDATE HEADER COUNT
// ================================
function updateHeaderCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const cartCount = document.getElementById("cartCount");
  if (cartCount) {
    let total = cart.reduce((sum, item) => sum + item.qty, 0);

    cartCount.innerText = total; // NOT qty sum
  }
}



// ================================
// LOGOUT FUNCTION
// ================================
function logout(e) {
  e.preventDefault(); // stop page refresh

  Swal.fire({
    title: "Are you sure?",
    text: "You want to logout?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3d2315",
    cancelButtonColor: "#312f2f",
    confirmButtonText: "Yes, Logout"
  }).then((result) => {
    if (result.isConfirmed) {

      // Remove user session
      localStorage.removeItem("loggedInUser");

      Swal.fire({
        icon: "success",
        title: "Logged Out Successfully",
        showConfirmButton: false,
        timer: 1500
      });

      setTimeout(() => {
        window.location.href = "index.html";
      }, 1500);
    }
  });
}



// ================================
// CONTACT FORM HANDLING
// ================================
let cont_form = document.getElementById("form");

if (cont_form) {
  cont_form.addEventListener("submit", (e) => {
    e.preventDefault();
    contbtn();
  });
}

let contbtn = () => {

  let name = document.getElementById("name");
  let email = document.getElementById("email");

  let nameerr = document.getElementById("nameerr");
  let emailerr = document.getElementById("emailerr");

  let namePattern = /^[a-zA-Z ]{3,}$/;
  let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  let ischecked = true;

  // Clear old errors
  nameerr.innerText = "";
  emailerr.innerText = "";

  // Name validation
  if (name.value == "") {
    nameerr.innerText = "This field is required";
    ischecked = false;
  } else if (!namePattern.test(name.value)) {
    nameerr.innerText = "Only letters, minimum 3 characters";
    ischecked = false;
  }

  // Email validation
  if (email.value == "") {
    emailerr.innerText = "This field is required";
    ischecked = false;
  } else if (!emailPattern.test(email.value)) {
    emailerr.innerText = "Enter valid email";
    ischecked = false;
  }

  // Final submit
  if (ischecked) {

    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Message Sent Successfully!",
      showConfirmButton: false,
      timer: 2500,
      background: "#d0b82d", // green background
      color: "#fff", // white text
      iconColor: "#ffffff", // full white tick
      customClass: {
        popup: "custom-toast"
      }
    }).then(() => {
      cont_form.reset();
    });

  }
};

// ================================
// NEWSLETTER SUBSCRIBE HANDLING
// ================================

let btn = document.getElementById("sub_btn");
if (btn) {
  btn.addEventListener("click", () => {

    let emails = document.getElementById("sub_email");
    let eerr = document.getElementById("error");

    let emailPatterns = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let ischecked = true;

    if (emails.value == "") {
      eerr.innerText = "This field is required";
      ischecked = false;
    } else if (!emailPatterns.test(emails.value)) {
      eerr.innerText = "Enter valid email";
      ischecked = false;
    } else {
      eerr.innerText = "";
    }

    if (ischecked) {

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Subscribed Successfully!",
        text: "You will receive our latest offers and updates.",
        showConfirmButton: false,
        timer: 2500,
        background: "#d0b82d", // green background
        color: "#fff", // white text
        iconColor: "#ffffff", // full white tick
        customClass: {
          popup: "custom-toast"
        }
      })

      emails.value = "";
    }


  })
  const menuIcon = document.querySelector('.fa-bars'); // hamburger
  const navLinks = document.querySelector('.link'); // menu links

  menuIcon.addEventListener('click', () => {
    navLinks.classList.toggle('show'); // toggle class to show/hide
  });

}
//footer year
document.getElementById("year").textContent = new Date().getFullYear();
