  let filter = "alle";
  let retter;
  const link = "https://spreadsheets.google.com/feeds/list/17Dd7DvkPaFamNUdUKlrFgnH6POvBJXac7qyiS6zNRw0/od6/public/values?alt=json"
  document.addEventListener("DOMContentLoaded", hentData);
  const popop = document.querySelector("#popop");
  let myTimer;

  async function hentData() {
      const respons = await fetch(link);
      retter = await respons.json();
      addEventListenersToButtons();
      document.querySelector("#menuknap").addEventListener("click", toggleMenu);
      document.querySelector("#menukortknap").addEventListener("click", toggleMenukort);
      visRetter();
      sidenOesteuropa();
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
              klon.querySelector(".pris").textContent = ret.gsx$pris.$t;
              klon.querySelector("article").addEventListener("click", () => visDetaljer(ret));
              container.appendChild(klon);
          }
      })
  }






  function visDetaljer(ret) {
      popop.style.display = "block";
      popop.querySelector("h2").textContent = ret.gsx$navn.$t;
      popop.querySelector("img").src = "imgs/small/" + ret.gsx$billede.$t + "-sm.jpg";
      popop.querySelector(".oprindelse").textContent = ret.gsx$oprindelse.$t;
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
          document.querySelector("#menuknap").textContent = "Sorter efter";

      }
  }

  /******* Splash billeder start *******/
  function sidenOesteuropa() {
      console.log("sidenOesteuropa");

      clearTimeout(myTimer);

      document.querySelector("#content_sulten .pile .venstre").removeEventListener("click", sidenOesteuropa);

      document.querySelector("#content_kontaktinfo .pile .hojre").removeEventListener("click", sidenOesteuropa);

      document.querySelector("#oesteuropa").classList.remove("hidden");

      document.querySelector("#sulten").classList.add("hidden");

      document.querySelector("#kontaktinfo").classList.add("hidden");

      document.querySelector("#content_oesteuropa .pile .venstre").addEventListener("click", sidenKontaktinfo);

      document.querySelector("#content_oesteuropa .pile .hojre").addEventListener("click", sidenSulten);

      myTimer = setTimeout(sidenSulten, 4000);
  }

  function sidenSulten() {
      console.log("sidenSulten");

      clearTimeout(myTimer);

      document.querySelector("#content_kontaktinfo .pile .venstre").removeEventListener("click", sidenSulten);

      document.querySelector("#content_oesteuropa .pile .hojre").removeEventListener("click", sidenSulten);


      document.querySelector("#oesteuropa").classList.add("hidden");

      document.querySelector("#sulten").classList.remove("hidden");

      document.querySelector("#content_sulten .pile .venstre").addEventListener("click", sidenOesteuropa);

      document.querySelector("#content_sulten .pile .hojre").addEventListener("click", sidenKontaktinfo);

      myTimer = setTimeout(sidenKontaktinfo, 4000);
  }

  function sidenKontaktinfo() {
      console.log("sidenKontaktinfo");

      clearTimeout(myTimer);

      document.querySelector("#content_oesteuropa .pile .venstre").removeEventListener("click", sidenKontaktinfo);

      document.querySelector("#content_sulten .pile .hojre").removeEventListener("click", sidenKontaktinfo);

      document.querySelector("#oesteuropa").classList.add("hidden");
      document.querySelector("#sulten").classList.add("hidden");

      document.querySelector("#kontaktinfo").classList.remove("hidden");

      document.querySelector("#content_kontaktinfo .pile .venstre").addEventListener("click", sidenSulten);

      document.querySelector("#content_kontaktinfo .pile .hojre").addEventListener("click", sidenOesteuropa);

      myTimer = setTimeout(sidenOesteuropa, 4000);
  }









  hentData();
