
      // logout
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
              window.location.href = "/index.html";
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

      let dashboardCount = () => {
        let productList = JSON.parse(localStorage.getItem("productList")) || [];
        let categoryList =
          JSON.parse(localStorage.getItem("categoryList")) || [];
        let registerList =
          JSON.parse(localStorage.getItem("RegisterList")) || [];

        // Total Products
        document.getElementById("totalProducts").innerText = productList.length;

        // Total Categories
        document.getElementById("totalCategories").innerText =
          categoryList.length;
        //total register
        document.getElementById("totalUsers").innerText = registerList.length;

        // Total Stock SUM
        let totalStock = 0;
        productList.forEach((p) => {
          totalStock += Number(p.Stock);
        });

        document.getElementById("totalStock").innerText = totalStock;
      };

      dashboardCount();