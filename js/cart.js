 document.addEventListener("DOMContentLoaded", function () {
   loadCart();
   updateHeaderCount();
 });

 function loadCart() {
   const cart = JSON.parse(localStorage.getItem("cart")) || [];
   const container = document.getElementById("cartContainer");
   container.innerHTML = "";

   if (cart.length === 0) {
     container.innerHTML =
       "<h2 class='empty-cart'>Your cart is empty</h2>";
     return;
   }

   cart.forEach(function (item) {
     const cartItem = document.createElement("div");
     cartItem.className = "cart-item";

     cartItem.innerHTML =
       '<div class="cart-image">' +
       '<img src="' +
       item.image +
       '">' +
       "</div>" +
       '<div class="cart-details">' +
       '<div class="top-icons">' +
       '<i class="fa-solid fa-x" onclick="removeItem(' +
       item.id +
       ')"></i>' +
       "</div>" +
       "<h3>" +
       item.name +
       "</h3>" +
       '<div class="price">₹ ' +
       item.price +
       "</div>" +
       '<div class="info">' +
       "<span>Qty:</span>" +
       '<div class="qty-selector">' +
       '<button onclick="updateQty(' +
       item.id +
       ', -1)">-</button>' +
       '<input type="text" value="' +
       item.qty +
       '" readonly>' +
       '<button onclick="updateQty(' +
       item.id +
       ', 1)">+</button>' +
       "</div>" +
       "</div>" +
       "</div>";
     container.appendChild(cartItem);
   });
   updateTotal();
 }

 function updateQty(id, change) {
   let cart = JSON.parse(localStorage.getItem("cart")) || [];

   cart = cart.map((item) => {
     if (item.id === id) {
       item.qty += change;

       if (item.qty < 1) {
         item.qty = 1; // qty 0 ku pogakoodathu
       }
     }
     return item;
   });

   localStorage.setItem("cart", JSON.stringify(cart));

   loadCart();
   updateHeaderCount();
   updateTotal();
 }

 function removeItem(id) {
   let cart = JSON.parse(localStorage.getItem("cart")) || [];
   cart = cart.filter((item) => item.id !== id);

   localStorage.setItem("cart", JSON.stringify(cart));

   updateHeaderCount();
   loadCart();
   updateTotal();
 }

 function updateHeaderCount() {
   let cart = JSON.parse(localStorage.getItem("cart")) || [];

   let total = cart.reduce((sum, item) => sum + item.qty, 0);

   const cartCount = document.getElementById("cartCount");
   if (cartCount) {
     cartCount.innerText = total;
   }
 }

 function updateTotal() {
   let cart = JSON.parse(localStorage.getItem("cart")) || [];

   let totalItems = 0;
   let totalPrice = 0;

   cart.forEach((item) => {
     totalItems += item.qty;
     totalPrice += item.qty * item.price;
   });

   document.getElementById("totalItems").innerText = totalItems;
   document.getElementById("grandTotal").innerText = totalPrice;
 }


 //add to pay     
 document.querySelector(".checkout-btn").addEventListener("click", () => {

   let cart = JSON.parse(localStorage.getItem("cart")) || [];

   if (cart.length === 0) {
     Swal.fire({
       icon: "warning",
       title: "Cart is Empty!",
       text: "Please add items to cart",
       confirmButtonColor: "#c9a24d"
     });
     return;
   }

   Swal.fire({
     icon: "success",
     title: "Payment Successful!",
     text: "Your order has been placed successfully 🎉",
     confirmButtonText: "OK",
     confirmButtonColor: "#c9a24d"
     
   }).then(() => {
     localStorage.removeItem("cart");
     window.location.href = "home.html";
   });

 });