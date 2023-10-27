document.addEventListener("DOMContentLoaded", () => {
    const marca = document.getElementById("marca");
    const anio = document.getElementById("anio");
    const tipo = document.getElementsByName("tipo");
    const cotizar = document.getElementById("cotizar");
    const resultado = document.getElementById("resultado");
    const cotizacionPesos = document.getElementById("cotizacion");
    const cotizacionDolar = document.getElementById("cotizacionDolar");
    const mensajeError = document.getElementById("mensaje-error");

    cotizar.addEventListener("click", () => {
        // Obtener los valores seleccionados
        const marcaSeleccionada = marca.value;
        const anioSeleccionado = anio.value;
        const tipoSeleccionado = document.querySelector('input[name="tipo"]:checked').value;

        // Validar que los campos estén llenos
        if (marcaSeleccionada === "" || anioSeleccionado === "" || tipoSeleccionado === "") {
            mensajeError.style.display = "block";
        } else {
            mensajeError.style.display = "none"; // Ocultar el mensaje de error si los campos están completos

            // Calcular la cotización
            const cotizacionCalculada = calcularCotizacion(marcaSeleccionada, anioSeleccionado, tipoSeleccionado);

            // Mostrar el resultado en pesos
            resultado.style.display = "block";
            cotizacionPesos.textContent = cotizacionCalculada.toFixed(0) + " ARS";

            // Conectar con la API para obtener la cotización del dólar
            fetch("https://www.dolarsi.com/api/api.php?type=valoresprincipales")
                .then(response => response.json())
                .then(data => {
                    const dolarBlue = data.find(item => item.casa.nombre === "Dolar Blue");
                    const cotizacionDolarValor = parseFloat(dolarBlue.casa.venta.replace(',', '.'));

                    // Realizar la conversión para mostrar el valor en dólares
                    const cotizacionDolarCalculada = cotizacionCalculada / cotizacionDolarValor;
                    cotizacionDolar.textContent = "La cotización del dólar es: " + cotizacionDolarValor.toFixed(2) + " ARS por USD";
                    cotizacionDolar.textContent += ", equivalente a " + cotizacionDolarCalculada.toFixed(2) + " USD";
                })
                .catch(error => console.error("Error al obtener la cotización del dólar: ", error));
        }
    });
    
    // "Comprar"
    const comprar = document.getElementById("comprar");
    comprar.addEventListener("click", () => {
        const mensajeCompra = document.getElementById("mensaje-compra");
        mensajeCompra.style.display = "block";
    });

    function calcularCotizacion(marca, anio, tipo) {
        let cotizacion = 1000; 

    
        if (marca === "ford") {
            cotizacion = 4200;
        } else if (marca === "chevrolet") {
            cotizacion = 4100;
        } else if (marca === "toyota") {
            cotizacion = 4300;
        } else if (marca === "peugeot") {
            cotizacion = 4000;
        } else if (marca === "jeep") {
            cotizacion = 4400;
        } else if (marca === "bmw") {
            cotizacion = 5500;
        } else if (marca === "renault") {
            cotizacion = 3050;
        } else if (marca === "mercedes-benz") {
            cotizacion = 9700;
        } else if (marca === "audi") {
            cotizacion = 6600;
        }

        // cotización según el año 
        if (anio < 2010) {
            cotizacion -= 200;
        } else if (anio < 2020) {
            cotizacion -= 100;
        }

        // cotización según el tipo de seguro
        if (tipo === "todo-riesgo") {
            cotizacion *= 1.5;
        }

        return cotizacion;
    }
});
