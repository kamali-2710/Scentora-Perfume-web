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

      //table
      let registration = () => {
        let data = document.getElementById("LoadData");
        let reg = JSON.parse(localStorage.getItem("RegisterList")) || [];
        let t = "";

        reg.forEach((a) => {
          t += `<tr>
                <td>${a.name}</td>
                <td>${a.email}</td>
                <td>${a.phone}</td>
                <td>${"*".repeat(a.pwd.length)}</td>
                <td>${"*".repeat(a.cpwd.length)}</td>
            </tr>`;
        });
        console.log(t);
        data.innerHTML = t;
      };

      registration();