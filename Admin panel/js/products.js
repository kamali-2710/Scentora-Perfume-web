 function logout() {
   Swal.fire({
     title: "Are you sure?",
     text: "Do you really want to logout?",
     icon: "warning",
     showCancelButton: true,
     confirmButtonColor: "#3085d6",
     cancelButtonColor: "#d33",
     confirmButtonText: "Yes, Logout",
     cancelButtonText: "Cancel",
   }).then((result) => {
     if (result.isConfirmed) {
       localStorage.removeItem("isLogin");
       localStorage.removeItem("activeUser");

       Swal.fire({
         title: "Logged Out!",
         text: "Logout Successfully",
         icon: "success",
         timer: 1500,
         showConfirmButton: false,
       });

       setTimeout(() => {
         window.location.href = "/Scentora website/index.html";
       }, 2000);
     }
   });
 }
 //menu
 let menu = document.querySelector("#menu");
 let aside = document.querySelector("aside");
 let wrapper = document.querySelector(".wrapper");

 menu.addEventListener("click", () => {
   aside.classList.toggle("hide");
   wrapper.classList.toggle("hide-sidebar");
 });

 //submit refresh prevent
 let form_btn = document.getElementById("Productform");
 form_btn.addEventListener("submit", (e) => {
   e.preventDefault();

   let pid = document.getElementById("productid").value;
   if (pid) {
     updateData();
   } else {
     total();
   }
 });

 //set Interval
 let hour = document.querySelector("#hour");
 let min = document.querySelector("#min");
 let sec = document.querySelector("#sec");
 let Time = document.querySelector("#time");

 setInterval(() => {
   let d = new Date();

   let h = d.getHours();
   let m = d.getMinutes();
   let s = d.getSeconds();

   let period = h >= 12 ? "PM" : "AM";

   hour.innerHTML = String(h).padStart(2, "0");
   sec.innerHTML = String(s).padStart(2, "0");
   Time.innerHTML = period;
 }, 1000);

 //localstorage

 let total = () => {
   let image = document.getElementById("img").value;
   let Prdname = document.getElementById("prd").value;
   let Category = document.getElementById("cgy").value;
   let Price = document.getElementById("prc").value;
   let Stock = document.getElementById("stk").value;
   let Offer = document.getElementById("offer").value;

   let imageerr = document.getElementById("imgerr");
   let prderr = document.getElementById("prderr");
   let cgyerr = document.getElementById("cgyerr");
   let prcerr = document.getElementById("prcerr");
   let stkerr = document.getElementById("stkerr");
   let offererr = document.getElementById("offererr");

   //validation

   // let imgPattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i;
   let namePattern =  /^[A-Za-z\s]+$/;
   let catPattern = /^[a-zA-Z ]{3,30}$/;
   let pricePattern = /^[1-9]\d*(\.\d{1,2})?$/;
   let stockPattern = /^[1-9]\d*$/;

   let ischecked = true;

   if (image == "") {
     imageerr.innerText = "Enter valid image URL";
     document.getElementById("img").style.border = "1px solid red";
     ischecked = false;
   }
   // else if (!imgPattern.test(image)) {
   //   imageerr.innerText = "Invalid image URL  ";
   //   img.style.border = "1px solid red";
   //   ischecked = false;
   // }
   else {
     imageerr.innerText = "";
     img.style.border = "";
   }
   if (Prdname == "") {
     prderr.innerText = "Product name required";
     document.getElementById("prd").style.border = "1px solid red";
     ischecked = false;
   }
    else if (!namePattern.test(Prdname)) {
     prderr.innerText = "Letters only allowed";
     prd.style.border = "1px solid red";
     ischecked = false;
   }
    else if (Prdname.length < 3) {
     prderr.innerText = "Minimum 3 letters required";
     prd.style.border = "1px solid red";
     ischecked = false;
   }
    else {
     prderr.innerText = "";
     prd.style.border = "";
   }
   if (Category == "") {
     cgyerr.innerText = "Category Required";
     document.getElementById("cgy").style.border = "1px solid red";
     ischecked = false;
   } else if (!catPattern.test(Category)) {
     cgyerr.innerText = "Letters only";
     cgy.style.border = "1px solid red";
     ischecked = false;
   } else {
     cgyerr.innerText = "";
     cgy.style.border = "";
   }
   if (Price == "") {
     prcerr.innerText = "Enter valid price";
     document.getElementById("prc").style.border = "1px solid red";
     ischecked = false;
   } else if (!pricePattern.test(Price)) {
     prcerr.innerText = "Invalid value";
     prc.style.border = "1px solid red";
     ischecked = false;
   } else {
     prcerr.innerText = "";
     prc.style.border = "";
   }
   if (Stock == "") {
     stkerr.innerText = "Enter stock Quantity";
     document.getElementById("stk").style.border = "1px solid red";
     ischecked = false;
   } else if (!stockPattern.test(Stock)) {
     stkerr.innerText = "Invalid value";
     stk.style.border = "1px solid red";
     ischecked = false;
   } else {
     stkerr.innerText = "";
     stk.style.border = "";
   }
   if (Offer == "") {
     offererr.innerText = "Enter valid price";
     document.getElementById("offer").style.border = "1px solid red";
     ischecked = false;
   } else if (!pricePattern.test(Offer)) {
     offererr.innerText = "Invalid value";
     offer.style.border = "1px solid red";
     ischecked = false;
   } else {
     offererr.innerText = "";
     offer.style.border = "";
   }
   if (!ischecked) return;
   let productList = JSON.parse(localStorage.getItem("productList")) || [];

   let match = productList.filter(
     (ele) =>
     ele.Category.toLowerCase() === Category.toLowerCase() &&
     ele.Prdname.toLowerCase() === Prdname.toLowerCase(),
   );

   if (match.length > 0) {
     Swal.fire({
       icon: "warning",
       title: "Already Exists",
       text: "This product already exists!",
     });
     return;
   }

   if (ischecked) {
     let pruct = {
       productid: Date.now(),
       image: image,
       Prdname: Prdname,
       Category: Category,
       Price: Price,
       Stock: Stock,
       Offer: Offer,
     };
     productList.push(pruct);

     let pro = localStorage.setItem(
       "productList",
       JSON.stringify(productList),
     );
     Swal.fire({
       icon: "success",
       title: "Product Created!",
       timer: 1200,
       showConfirmButton: false,
     });

     producttable();
     document.getElementById("productid").value = "";
     document.getElementById("img").value = "";
     document.getElementById("prd").value = "";
     document.getElementById("cgy").value = "";
     document.getElementById("prc").value = "";
     document.getElementById("stk").value = "";
     document.getElementById("offer").value = "";
   }
 };
 //table
 let producttable = () => {
   let productdata = document.getElementById("productdata");
   let prdct = JSON.parse(localStorage.getItem("productList")) || [];
   let rows = "";
   if (prdct.length > 0) {
     prdct.forEach((ele, index) => {
       rows += `<tr>
                  <td>${index + 1}</td>
                  <td>${ele.productid}</td>
                  <td><img src="${ele.image}" alt="${ele.Prdname}"/></td>
                  <td>${ele.Prdname}</td>
                  <td>${ele.Category}</td>
                  <td>${ele.Price}</td>
                  <td>${ele.Stock}</td>
                  <td>${ele.Offer}</td>
                   <td>
                     <button type="button" onclick="prdupdate(${ele.productid})" id="updatebtn">
                    <i class="fa-solid fa-pen"></i>
                     </button>
                     <button type="button" onclick="del(${ele.productid})" id="delterbtn">
                    <i class="fa-solid fa-trash"></i>
                     </button>
                      </td>
                </tr>`;
     });
   } else {
     // tr +=
     rows = `<tr><td colspan="9" align="center">No Records Found</td></tr>`;
   }

   productdata.innerHTML = rows;
 };

 let Categories = () => {
   let categorySelect = document.getElementById("cgy");
   let categoryList =
     JSON.parse(localStorage.getItem("categoryList")) || [];
   console.log(categoryList);
   categorySelect.innerHTML = `<option value="">-- Select Category --</option>`;

   categoryList.forEach((ele) => {
     categorySelect.innerHTML += `
      <option value="${ele.category}">${ele.category}</option>
    `;
   });
 };
 producttable();
 Categories();

 //update product
 let prdupdate = (productid) => {
   let productList = JSON.parse(localStorage.getItem("productList")) || [];

   let fpl = productList.filter((ele) => ele.productid == productid);
   let [product] = fpl;

   document.getElementById("productid").value = product.productid;
   document.getElementById("img").value = product.image;
   document.getElementById("prd").value = product.Prdname;
   document.getElementById("cgy").value = product.Category;
   document.getElementById("prc").value = product.Price;
   document.getElementById("stk").value = product.Stock;
   document.getElementById("offer").value = product.Offer;

   document.getElementById("submitbtn").style.display = "none";
   document.getElementById("updatebtn").style.display = "inline-block";
 };

 let updateData = () => {
   let pid = document.getElementById("productid").value;
   let image = document.getElementById("img").value;
   let Prdname = document.getElementById("prd").value;
   let Category = document.getElementById("cgy").value;
   let Price = document.getElementById("prc").value;
   let Stock = document.getElementById("stk").value;
   let Offer = document.getElementById("offer").value;

   if (
     image == "" ||
     Prdname == "" ||
     Category == "" ||
     Price == "" ||
     Stock == "" ||
     Offer == ""
   ) {
     Swal.fire("Error", "Fill all fields before updating", "error");
     return;
   }

   let productList = JSON.parse(localStorage.getItem("productList")) || [];

   let pruct = {
     productid: Number(pid),
     image: image,
     Prdname: Prdname,
     Category: Category,
     Price: Price,
     Stock: Stock,
     Offer: Offer,
   };

   let updatedList = productList.map((ele) => {
     if (ele.productid == pid) {
       return pruct;
     } else {
       return ele;
     }
   });

   localStorage.setItem("productList", JSON.stringify(updatedList));

   Swal.fire({
     icon: "success",
     title: "Updated!",
     timer: 1200,
     showConfirmButton: false,
   });
   producttable();

   document.getElementById("productid").value = "";
   document.getElementById("img").value = "";
   document.getElementById("prd").value = "";
   document.getElementById("cgy").value = "";
   document.getElementById("prc").value = "";
   document.getElementById("stk").value = "";
   document.getElementById("offer").value = "";

   document.getElementById("submitbtn").style.display = "inline-block";
   document.getElementById("updatebtn").style.display = "none";
 };

 let del = (productid) => {
   Swal.fire({
     title: "Are you sure?",
     text: "Do you want to delete this product?",
     icon: "warning",
     showCancelButton: true,
     confirmButtonColor: "#3085d6",
     cancelButtonColor: "#d33",
     confirmButtonText: "Yes, delete it!",
     cancelButtonText: "Cancel",
   }).then((result) => {
     if (result.isConfirmed) {
       let productList =
         JSON.parse(localStorage.getItem("productList")) || [];

       let updatedList = productList.filter(
         (ele) => ele.productid !== productid,
       );

       localStorage.setItem("productList", JSON.stringify(updatedList));

       Swal.fire({
         title: "Deleted!",
         text: "Product deleted successfully.",
         icon: "success",
       });

       producttable(); // table refresh
     }
   });
 };