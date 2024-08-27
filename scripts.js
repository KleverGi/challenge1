let botonEncriptar = document.getElementById("button_encrypt");
let botonDesencriptar = document.getElementById("button_decrypt");
let botonCopiar = document.getElementById("button_copiar");
let botones = document.getElementsByClassName(".button");
let entradaTexto = document.getElementById("input_text_encrypt");
let salidaTexto = document.getElementById("output_text_decrypt");
let pagina = document.querySelector('body');
let contenedorResultado = document.querySelector(".result");

function desbloquearBotones() {
    botonEncriptar.disabled = false;
    botonDesencriptar.disabled = false;
}

function desbloquearCopiado() {
    botonCopiar.disabled = false;
}

function refrescarVista() {
    if(entradaTexto.value !== ""){
        contenedorResultado.classList.remove("no_texto");
    }
    entradaTexto.focus();
}

function mostrarMensaje(mensaje) {
    let alerta = document.getElementById('custom-alert');
    alerta.innerHTML = mensaje;
    alerta.style.display = 'block';
    setTimeout(() => {
        alerta.style.display = 'none';
    }, 2000);
}

function enfocarTexto() {
    let areaTexto = document.getElementById("input_text_encrypt");
    areaTexto.focus();
}

function encriptarTexto() {
    if (entradaTexto.value != "") {
        let regex = /^[a-z\s]+$/;

        if (regex.test(entradaTexto.value)) {
            let textoEncriptado = entradaTexto.value;
            textoEncriptado = textoEncriptado.replace(/e/gim, "enter");
            textoEncriptado = textoEncriptado.replace(/i/gim, "imes");
            textoEncriptado = textoEncriptado.replace(/a/gim, "ai");
            textoEncriptado = textoEncriptado.replace(/o/gim, "ober");
            textoEncriptado = textoEncriptado.replace(/u/gim, "ufat");
            salidaTexto.innerHTML = textoEncriptado;
            salidaTexto.value = textoEncriptado;
            refrescarVista();
        } else {
            mostrarMensaje("Por favor, introduce solo letras minúsculas y espacios.");
            enfocarTexto();
        }
    } else {
        mostrarMensaje("Escribe algo para encriptar.");
        enfocarTexto();
    }
}

function desencriptarTexto() {
    if (entradaTexto.value != "") {
        let textoDesencriptado = entradaTexto.value;
        textoDesencriptado = textoDesencriptado.replace(/enter/gim, "e");
        textoDesencriptado = textoDesencriptado.replace(/imes/gim, "i");
        textoDesencriptado = textoDesencriptado.replace(/ai/gim, "a");
        textoDesencriptado = textoDesencriptado.replace(/ober/gim, "o");
        textoDesencriptado = textoDesencriptado.replace(/ufat/gim, "u");
        salidaTexto.innerHTML = textoDesencriptado;
        salidaTexto.value = textoDesencriptado;
        refrescarVista();
    } else {
        mostrarMensaje("Escribe un mensaje para desencriptar.");
        enfocarTexto();
    }
}

function copiarTexto() {
    if (salidaTexto.value != "") {
        navigator.clipboard.writeText(salidaTexto.value);
        mostrarMensaje("Texto copiado");
    } else {
        mostrarMensaje("No hay nada para copiar.");
    }
}

// Manejador del formulario
const formulario = document.getElementById("my_form");

formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    let datos = new FormData(formulario);

    let respuesta = await fetch(formulario.action, {
        method: formulario.method,
        body: datos,
        headers: {
            Accept: "application/json",
        },
    });

    if (respuesta.ok) {
        mostrarMensaje("¡Gracias por tu envío!");
        formulario.reset();
    } else {
        mostrarMensaje("Hubo un problema al enviar el formulario.");
    }
});

botonEncriptar.onclick = encriptarTexto;
botonDesencriptar.onclick = desencriptarTexto;
botonCopiar.onclick = copiarTexto;
entradaTexto.onclick = desbloquearBotones;
