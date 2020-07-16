window.onload = function () {
  var impresionCronometro = document.getElementById("tiempo");
  impresionCronometro.innerHTML = "00:00:00";
  var cartasArray;

  var tiempo,
    carta1,
    carta2,
    valCarta1 = 0,
    valCarta2 = 0,
    cartasTotales = 24;
  aciertos = cartasTotales / 2;

  document.getElementById("iniciar").addEventListener("click", function () {
    iniciarJuego();
    document.getElementById("perdiste").classList.remove("activo");
    this.setAttribute("disabled", "true");
    document.getElementById("detener").removeAttribute("disabled", "");
    document.getElementById("reiniciar").removeAttribute("disabled", "");
  });

  document.getElementById("detener").addEventListener("click", function () {
    perdiste();
    this.setAttribute("disabled", "true");
    document.getElementById("iniciar").removeAttribute("disabled", "");
    document.getElementById("reiniciar").setAttribute("disabled", "");
  });

  document.getElementById("reiniciar").addEventListener("click", function () {
    clearInterval(tiempo);
    document.getElementById("perdiste").classList.remove("activo");
    document.getElementById("ganaste").classList.remove("activo");
    document.getElementById("detener").removeAttribute("disabled", "");    
    valCarta1 = 0;
    iniciarJuego();
  });

  var contenedor = document.getElementById("tablero");
  var numeroCarta = 1;
  var numerosCartas = [];

  function barajar() {
    contenedor.innerHTML = "";
    numerosCartas = [];
    for (let index = 1; index <= cartasTotales; index++) {
      numeroCarta == cartasTotales / 2 + 1 ? (numeroCarta = 1) : "";
      numerosCartas.push(numeroCarta);
      numeroCarta++;
    }
    Object.keys(
      numerosCartas.sort(function () {
        return Math.random() - 0.5;
      })
    ).forEach(function (key) {
      var carta = document.createElement("div");
      carta.setAttribute("name", numerosCartas[key]);
      carta.setAttribute("class", "carta abajo");      
      contenedor.appendChild(carta);
      carta.innerHTML =
        "<img class='img-fruta' src='/assets/img/img-pares/" +
        numerosCartas[key] +
        ".jpg'/>";
    });
    cartasArray = document.getElementsByClassName("carta");

    Object.keys(cartasArray).forEach(function (key) {
      cartasArray[key].addEventListener("click", function () {
        cartaSeleccionada(cartasArray[key]);
      });
    });
  }

  function iniciarJuego(x) {
    barajar();

    Object.keys(cartasArray).forEach(function (key) {
      cartasArray[key].classList.add("iniciado");
    });

    var horas = 0,
      minutos = 1,
      segundos = 60;

    tiempo = setInterval(function () {
      if (horas == 0 && minutos == 0 && segundos == 0) {
        clearInterval(tiempo);
        perdiste();
        cronometro.innerHTML = "00:00:00";
        return;
      }

      if (segundos == 0) {
        segundos = 59;
        if (minutos != 0) {
          minutos = minutos - 1;
        } else if (horas != 0) {
          horas = horas - 1;
        }
      }

      segundos = segundos - 1;
      impresionCronometro.innerHTML =
        (horas < 10 ? "0" + horas : horas) +
        ":" +
        (minutos < 10 ? "0" + minutos : minutos) +
        ":" +
        (segundos < 10 ? "0" + segundos : segundos);
    }, 1000);
  }

  function perdiste() {
    clearInterval(tiempo);
    Object.keys(cartasArray).forEach(function (key) {
      cartasArray[key].classList.remove("iniciado");
    });
    document.getElementById("perdiste").classList.add("activo");
    document.getElementById("detener").setAttribute("disabled", "");
  }

  function ganaste() {
    clearInterval(tiempo);
    document.getElementById("detener").setAttribute("disabled", "true");
    document.getElementById("ganaste").classList.add("activo");
  }

  function cartaSeleccionada(x) {
    if (valCarta1 == 0) {
      valCarta1 = x.getAttribute("name");
      carta1 = x;
      carta1.querySelector("img").classList.add("activo");
      carta1.classList.add("deshabilitar");
      return;
    } else if (valCarta2 == 0) {
      valCarta2 = x.getAttribute("name");
      carta2 = x;
      carta2.querySelector("img").classList.add("activo");
      carta2.classList.add("deshabilitar");
    }
    if (valCarta1 != 0 && valCarta2 != 0) {
      if (valCarta2 == valCarta1) {
        carta1.classList.remove("iniciado");
        carta2.classList.remove("iniciado");
        aciertos--;        
        valCarta2 = 0;
        valCarta1 = 0;
      } else {
        setTimeout(function () {
          carta1.querySelector("img").classList.remove("activo");
          carta2.querySelector("img").classList.remove("activo");
          console.log();
          carta1.classList.remove("deshabilitar");
          carta2.classList.remove("deshabilitar");
          valCarta1 = 0;
          valCarta2 = 0;
        }, 900);
      }

      if (aciertos == 0) {
        ganaste();
      }
    }
  }
};
