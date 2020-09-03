  let filter = "alle";
  let retter;
  const link = "https://spreadsheets.google.com/feeds/list/17Dd7DvkPaFamNUdUKlrFgnH6POvBJXac7qyiS6zNRw0/od6/public/values?alt=json"
  document.addEventListener("DOMContentLoaded", hentData);
  const popop = document.querySelector("#popop");


  async function hentData() {
      const respons = await fetch(link);
      retter = await respons.json();
      addEventListenersToButtons();
      document.querySelector("#menuknap").addEventListener("click", toggleMenu);
      document.querySelector("#menukortknap").addEventListener("click", toggleMenukort);
      visRetter();

  }

  function visRetter() {
      console.log(retter);

      //Løb gennem array
      const container = document.querySelector("#container");
      const template = document.querySelector("template");
      container.innerHTML = "";
      retter.feed.entry.forEach(ret => {

          if (filter == "alle" || filter == ret.gsx$kategori.$t) {
              const klon = template.cloneNode(true).content;
              klon.querySelector("img").src = "imgs/small/" + ret.gsx$billede.$t + "-sm.jpg";
              klon.querySelector(".navn").textContent = ret.gsx$navn.$t;
              klon.querySelector(".kort").textContent = ret.gsx$kort.$t;
              klon.querySelector(".pris").textContent = ret.gsx$pris.$t + ` kr`;
              klon.querySelector("article").addEventListener("click", () => visDetaljer(ret));
              container.appendChild(klon);
          }
      })
  }

  function visDetaljer(ret) {
      popop.style.display = "block";
      popop.querySelector("h2").textContent = ret.gsx$navn.$t;
      popop.querySelector("img").src = "imgs/small/" + ret.gsx$billede.$t + "-sm.jpg";
      popop.querySelector(".lang").textContent = ret.gsx$lang.$t;
  }

  document.querySelector("#luk").addEventListener("click", () => popop.style.display = "none");


  function addEventListenersToButtons() {
      document.querySelectorAll(".filter").forEach((btn) => {
          btn.addEventListener("click", filterBTNs);
      });
  }


  function filterBTNs() {
      filter = this.dataset.kategori;
      document.querySelector("h1").textContent = this.textContent;
      document.querySelectorAll(".filter").forEach((btn) => {
          btn.classList.remove("valgt");
      })

      this.classList.add("valgt");
      visRetter();
  }

  function toggleMenu() {
      console.log("toggleMenu");

      document.querySelector("#menu").classList.toggle("hidden");

      let erSkjult = document.querySelector("#menu").classList.contains("hidden");

      if (erSkjult == true) {
          document.querySelector("#menuknap").textContent = "☰";

      } else {
          document.querySelector("#menuknap").textContent = "x";
      }
  }

  function toggleMenukort() {
      console.log("toggleMenukort");

      document.querySelector("#madmenukort").classList.toggle("hidden");

      let erSkjult = document.querySelector("#madmenukort").classList.contains("hidden");

      if (erSkjult == true) {
          document.querySelector("#menukortknap").textContent = "↓ Sorter efter";
      }
  }









  hentData();
