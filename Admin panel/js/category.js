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
              window.location.href = "index.html";
            }, 2000);
          }
        });
      }
      //Menu
      let menu = document.querySelector("#menu");
      let aside = document.querySelector("aside");
      let wrapper = document.querySelector(".wrapper");

      menu.addEventListener("click", () => {
        aside.classList.toggle("hide");
        wrapper.classList.toggle("hide-sidebar");
      });

      //submit refresh prevent
      let catgy_btn = document.getElementById("categoryForm");
      catgy_btn.addEventListener("submit", (e) => {
        e.preventDefault();

        let cid = document.getElementById("categoryid").value;

        if (cid) {
          updateData();
        } else {
          categorycreate();
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

      let categorycreate = () => {
        let category = document.getElementById("catgry").value;

        let catgryerr = document.getElementById("catgryerr");
    
        let catPattern = /^[a-zA-Z0-9 &.,-]{3,30}$/;
        const nameRegex = /^[A-Za-z\s]+$/;
        let ischecked = true;

        if (category == "") {
          catgryerr.innerText = "Enter your Category";
          catgry.style.border = "1px solid red";
          ischecked = false;
        } else if (!catPattern.test(category)) {
          catgryerr.innerText = "Please enter min 3 letters";
          catgry.style.border = "1px solid red";
          ischecked = false;
        } else if (!nameRegex.test(category)) {
          catgryerr.innerText = "Please enter letters only";
          catgry.style.border = "1px solid red";
          ischecked = false;
        } else {
          catgryerr.innerText = "";
          catgry.style.border = "";
        }

        if (!ischecked) return; //validation fail STOP update

        let categoryList =
          JSON.parse(localStorage.getItem("categoryList")) || []; // Data safety, no conflicts

        let match = categoryList.filter(
          //existing user duplicate check
          (ele) =>
            ele.category.toLowerCase() === category.toLowerCase() 
        );

        if (match.length > 0) {
          Swal.fire({
            icon: "warning",
            title: "Already Exists",
            text: "This category already exists!",
          });
          return;
        }

        if (ischecked) {
          let ctydata = {
            productid: Date.now(),
            category,
          };

          categoryList.push(ctydata);

          localStorage.setItem("categoryList", JSON.stringify(categoryList));
          Swal.fire({
            icon: "success",
            title: "Category Created!",
            timer: 1200,
            showConfirmButton: false,
          });

          categorytable();
          document.getElementById("catgry").value = "";
        }
      };
      //table
      let categorytable = () => {
        let data1 = document.getElementById("data");
        let cty = JSON.parse(localStorage.getItem("categoryList")) || [];

        let tab = "";

        if (cty.length > 0) {
          cty.forEach((b, index) => {
            tab += `<tr>
                    <td>${index + 1}</td>
                    <td>${b.productid}</td>
                    <td>${b.category}</td>
                    <td>
                      <button type="button" onclick="catgyupdate(${b.productid})" id="updatebtn">
                        <i class="fa-solid fa-pen"></i>
                      </button>
                      <button type="button" onclick="catgydelete(${b.productid})" id="deletebtn">
                        <i class="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>`;
          });
        } else {
          tab = `<tr><td colspan="5" align="center">No Records Found</td></tr>`;
        }

        data1.innerHTML = tab;
      };

      categorytable();

      //update category

      let catgyupdate = (productid) => {
        let categoryList =
          JSON.parse(localStorage.getItem("categoryList")) || [];

        let fpl = categoryList.filter((ele) => ele.productid == productid);
        let [product] = fpl;

        document.getElementById("categoryid").value = product.productid;
        document.getElementById("catgry").value = product.category;

        document.getElementById("submitbtn").style.display = "none";
        document.getElementById("updatebtn").style.display = "inline-block";
      };

      // update save
      let updateData = () => {
        let cid = document.getElementById("categoryid").value;
        let category = document.getElementById("catgry").value;

        if (category == "") {
          Swal.fire("Error", "category all fields before updating", "error");
          return; //Check empty fields stop submit & update
        }
        let categoryList =
          JSON.parse(localStorage.getItem("categoryList")) || [];

        let catgyData = {
          productid: Number(cid),
          category: category,
        };

        let updatedList = categoryList.map((ele) => {
          if (ele.productid == cid) {
            return catgyData;
          } else {
            return ele;
          }
        });

        localStorage.setItem("categoryList", JSON.stringify(updatedList));

        Swal.fire({
          icon: "success",
          title: "Updated!",
          timer: 1200,
          showConfirmButton: false,
        });

        categorytable();

        document.getElementById("categoryid").value = "";
        document.getElementById("catgry").value = "";

        document.getElementById("submitbtn").style.display = "inline-block";
        document.getElementById("updatebtn").style.display = "none";
      };

      // delete category
      let catgydelete = (productid) => {
        Swal.fire({
          title: "Are you sure?",
          text: "Do you want to delete this category?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes,delete it!",
          cancelButtonText: "Cancel",
        }).then((result) => {
          if (result.isConfirmed) {
            let categoryList =
              JSON.parse(localStorage.getItem("categoryList")) || [];

            let updatedList = categoryList.filter(
              (ele) => ele.productid !== productid,
            );

            localStorage.setItem("categoryList", JSON.stringify(updatedList));

            Swal.fire({
              title: "Deleted!",
              text: "Your Category has been deleted.",
              icon: "success",
            });

            categorytable();
          }
        });
      };