window.addEventListener("load", function () {
  /* ---------------------- obtenemos variables globales ---------------------- */
  const form = document.forms[0];
  const firstName = document.querySelector("#inputNombre");
  const lastName = document.querySelector("#inputApellido");
  const email = document.querySelector("#inputEmail");
  const password = document.querySelector("#inputPassword");
  const url = "http://todo-api.ctd.academy:3000/v1";

  /* -------------------------------------------------------------------------- */
  /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
  /* -------------------------------------------------------------------------- */
  form.addEventListener("submit", function (event) {
    event.preventDefault();

/*     const payload = {
      email: email.value,
      password: password.value,
    }; */
    const payload = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
    };

    const settings = {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    };

    realizarSignUp(settings);

    form.reset();
  });

  /* -------------------------------------------------------------------------- */
  /*                    FUNCIÓN 2: Realizar el signup [POST]                    */
  /* -------------------------------------------------------------------------- */
  function realizarSignUp(settings) {
    console.log("Lanzamos la consulta a la API...");
    // hacemos el fetch, le pasamos los dos parametros que necesita
    fetch(`${url}/users`, settings)
      .then((response) => {
        // captamos la respuesta "cruda" de la API (promesa)
        console.log(response);
        // chequeamos si salio todo mal
        if (response.ok != true) {
          alert("Algo malió sal.");
        }
        return response.json(); // transformamos de JSON a objeto JS
      })
      .then((data) => {
        // obtenemos el resultado del .then anterior, la rta "procesada", podemos manipular los datos
        console.log("Promesa cumplida");
        console.log(data);
        if (data.jwt) {
          // guardamos el token en el local storage
          localStorage.setItem("jwt", JSON.stringify(data.jwt));
          location.replace("./mis-tareas.html");
        }
      });
  }
});
