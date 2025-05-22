"use strict";

const Utils = {
  validateInput: (value, type = "text") => {
    if (type === "number") return !isNaN(value) && value !== "";
    return value && value.trim() !== "";
  },

  showResult: (elementId, message, type = "info") => {
    const element = document.getElementById(elementId);
    element.textContent = message;
    element.className = `result ${type}`;
  },

  formatCurrency: (amount) => {
    return new Intl.NumberFormat("es-SV", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  },

  formatPercentage: (value) => {
    return new Intl.NumberFormat("es-SV", {
      style: "percent",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(value / 100);
  },
};

// Ejercicio 1: Verificación de mayoría de edad
const verificarEdad = () => {
  const edad = parseInt(document.getElementById("edad").value);

  if (!Utils.validateInput(edad, "number") || edad < 0) {
    Utils.showResult(
      "result1",
      "Por favor, ingrese una edad válida",
      "warning"
    );
    return;
  }

  const mensaje =
    edad >= 18
      ? `Usted es mayor de edad (${edad} años)`
      : `Usted es menor de edad (${edad} años)`;

  const tipo = edad >= 18 ? "success" : "info";
  Utils.showResult("result1", mensaje, tipo);
};

// Ejercicio 2: Cálculo de nota final
const calcularNotaFinal = () => {
  const nombre = document.getElementById("nombre").value.trim();
  const carnet = document.getElementById("carnet").value.trim();
  const examen = parseFloat(document.getElementById("examen").value);
  const tareas = parseFloat(document.getElementById("tareas").value);
  const asistencia = parseFloat(document.getElementById("asistencia").value);
  const investigacion = parseFloat(
    document.getElementById("investigacion").value
  );

  if (!Utils.validateInput(nombre) || !Utils.validateInput(carnet)) {
    Utils.showResult(
      "result2",
      "Por favor, complete nombre y carnet",
      "warning"
    );
    return;
  }

  const notas = [examen, tareas, asistencia, investigacion];
  if (
    notas.some(
      (nota) => !Utils.validateInput(nota, "number") || nota < 0 || nota > 10
    )
  ) {
    Utils.showResult(
      "result2",
      "Todas las notas deben estar entre 0 y 10",
      "warning"
    );
    return;
  }

  const ponderaciones = {
    examen: 0.2,
    tareas: 0.4,
    asistencia: 0.1,
    investigacion: 0.3,
  };
  const notaFinal =
    examen * ponderaciones.examen +
    tareas * ponderaciones.tareas +
    asistencia * ponderaciones.asistencia +
    investigacion * ponderaciones.investigacion;

  const estado = notaFinal >= 6 ? "APROBADO" : "REPROBADO";
  const tipo = notaFinal >= 6 ? "success" : "warning";

  const mensaje = `
                Estudiante: ${nombre}
                Carnet: ${carnet}
                Nota Final: ${notaFinal.toFixed(2)}
                Estado: ${estado}
            `;

  Utils.showResult("result2", mensaje, tipo);
};

// Ejercicio 3: Cálculo de aumento salarial
const calcularAumento = () => {
  const nombre = document.getElementById("nombreEmpleado").value.trim();
  const salario = parseFloat(document.getElementById("salario").value);
  const categoria = document.getElementById("categoria").value;

  if (
    !Utils.validateInput(nombre) ||
    !Utils.validateInput(salario, "number") ||
    !categoria
  ) {
    Utils.showResult(
      "result3",
      "Por favor, complete todos los campos",
      "warning"
    );
    return;
  }

  if (salario <= 0) {
    Utils.showResult("result3", "El salario debe ser mayor a 0", "warning");
    return;
  }

  const aumentos = { A: 0.15, B: 0.3, C: 0.1, D: 0.2 };
  const porcentajeAumento = aumentos[categoria];
  const montoAumento = salario * porcentajeAumento;
  const nuevoSalario = salario + montoAumento;

  const mensaje = `
                Empleado: ${nombre}
                Salario actual: ${Utils.formatCurrency(salario)}
                Categoría: ${categoria}
                Aumento: ${Utils.formatPercentage(
                  porcentajeAumento
                )} (${Utils.formatCurrency(montoAumento)})
                Nuevo salario: ${Utils.formatCurrency(nuevoSalario)}
            `;

  Utils.showResult("result3", mensaje, "success");
};

// Ejercicio 4: Número mayor
const encontrarMayor = () => {
  const num1 = parseFloat(document.getElementById("num1").value);
  const num2 = parseFloat(document.getElementById("num2").value);

  if (
    !Utils.validateInput(num1, "number") ||
    !Utils.validateInput(num2, "number")
  ) {
    Utils.showResult("result4", "Por favor, ingrese ambos números", "warning");
    return;
  }

  const mayor = Math.max(num1, num2);
  const mensaje =
    num1 === num2
      ? `Ambos números son iguales: ${num1}`
      : `El número mayor es: ${mayor}`;

  Utils.showResult("result4", mensaje, "success");
};

// Ejercicio 5: Descuentos en coches
const calcularDescuentoCoche = () => {
  const coche = document.getElementById("coche").value;
  const precio = parseFloat(document.getElementById("precio").value);

  if (!coche || !Utils.validateInput(precio, "number") || precio <= 0) {
    Utils.showResult(
      "result5",
      "Por favor, seleccione un coche e ingrese un precio válido",
      "warning"
    );
    return;
  }

  const descuentos = {
    "FORD FIESTA": 0.05,
    "FORD FOCUS": 0.1,
    "FORD ESCAPE": 0.2,
  };

  const porcentajeDescuento = descuentos[coche];
  const montoDescuento = precio * porcentajeDescuento;
  const precioFinal = precio - montoDescuento;

  const mensaje = `
                Coche seleccionado: ${coche}
                Precio original: ${Utils.formatCurrency(precio)}
                Descuento aplicado: ${Utils.formatPercentage(
                  porcentajeDescuento
                )} (${Utils.formatCurrency(montoDescuento)})
                Precio final: ${Utils.formatCurrency(precioFinal)}
            `;

  Utils.showResult("result5", mensaje, "success");
};

// Ejercicio 6: Descuentos en viajes
const calcularDescuentoViaje = () => {
  const origen = document.getElementById("origen").value.trim().toLowerCase();
  const destino = document.getElementById("destino").value;
  const precio = parseFloat(document.getElementById("precioViaje").value);

  if (
    !Utils.validateInput(origen) ||
    !destino ||
    !Utils.validateInput(precio, "number") ||
    precio <= 0
  ) {
    Utils.showResult(
      "result6",
      "Por favor, complete todos los campos correctamente",
      "warning"
    );
    return;
  }

  let descuento = 0;
  if (origen === "palma") {
    const descuentos = {
      "La costa del Sol": 0.05,
      Panchimalco: 0.1,
      "Puerto el Triunfo": 0.15,
    };
    descuento = descuentos[destino] || 0;
  }

  const montoDescuento = precio * descuento;
  const precioFinal = precio - montoDescuento;

  const mensaje =
    descuento > 0
      ? `Origen: ${origen}
                   Destino: ${destino}
                   Precio original: ${Utils.formatCurrency(precio)}
                   Descuento: ${Utils.formatPercentage(
                     descuento
                   )} (${Utils.formatCurrency(montoDescuento)})
                   Precio final: ${Utils.formatCurrency(precioFinal)}`
      : `No hay descuento disponible para esta ruta.
                   Precio: ${Utils.formatCurrency(precio)}`;

  Utils.showResult("result6", mensaje, descuento > 0 ? "success" : "info");
};

// Ejercicio 7: Análisis de números
const analizarNumeros = () => {
  const input = document.getElementById("numeros").value.trim();

  if (!Utils.validateInput(input)) {
    Utils.showResult("result7", "Por favor, ingrese los números", "warning");
    return;
  }

  const numeros = input
    .split(",")
    .map((n) => parseInt(n.trim()))
    .filter((n) => !isNaN(n));

  if (numeros.length !== 10) {
    Utils.showResult(
      "result7",
      "Debe ingresar exactamente 10 números enteros",
      "warning"
    );
    return;
  }

  const negativos = numeros.filter((n) => n < 0).length;
  const positivos = numeros.filter((n) => n > 0).length;
  const multiplosDe15 = numeros.filter((n) => n % 15 === 0).length;
  const sumaPares = numeros
    .filter((n) => n % 2 === 0)
    .reduce((sum, n) => sum + n, 0);

  const mensaje = `
                Números analizados: ${numeros.join(", ")}
                Valores negativos: ${negativos}
                Valores positivos: ${positivos}
                Múltiplos de 15: ${multiplosDe15}
                Suma de números pares: ${sumaPares}
            `;

  Utils.showResult("result7", mensaje, "success");
};

// Ejercicio 8: Tabla de multiplicar
const generarTablaMultiplicar = () => {
  const numero = parseInt(document.getElementById("numeroTabla").value);

  if (!Utils.validateInput(numero, "number") || numero < 1) {
    Utils.showResult(
      "result8",
      "Por favor, ingrese un número válido mayor a 0",
      "warning"
    );
    return;
  }

  const tabla = Array.from({ length: 10 }, (_, i) => {
    const multiplicador = i + 1;
    const resultado = numero * multiplicador;
    return `${numero} × ${multiplicador} = ${resultado}`;
  }).join("\n");

  Utils.showResult(
    "result8",
    `Tabla de multiplicar del ${numero}:\n${tabla}`,
    "success"
  );
};

// Ejercicio 9: Conversión de temperatura
const convertirTemperatura = () => {
  const celsius = parseFloat(document.getElementById("celsius").value);

  if (!Utils.validateInput(celsius, "number")) {
    Utils.showResult(
      "result9",
      "Por favor, ingrese una temperatura válida",
      "warning"
    );
    return;
  }

  const fahrenheit = (celsius * 9) / 5 + 32;
  let clasificacion;

  if (fahrenheit >= 14 && fahrenheit < 32) {
    clasificacion = "Temperatura baja";
  } else if (fahrenheit >= 32 && fahrenheit < 68) {
    clasificacion = "Temperatura adecuada";
  } else if (fahrenheit >= 68 && fahrenheit <= 96) {
    clasificacion = "Temperatura alta";
  } else {
    clasificacion = "Temperatura desconocida";
  }

  const mensaje = `
                ${celsius}°C = ${fahrenheit.toFixed(1)}°F
                Clasificación: ${clasificacion}
            `;

  Utils.showResult("result9", mensaje, "success");
};

// Ejercicio 10: Promedio de edades
const calcularPromediosEdades = () => {
  const edadesMañanaInput = document
    .getElementById("edadesMañana")
    .value.trim();
  const edadesTardeInput = document.getElementById("edadesTarde").value.trim();
  const edadesNocheInput = document.getElementById("edadesNoche").value.trim();

  if (
    !Utils.validateInput(edadesMañanaInput) ||
    !Utils.validateInput(edadesTardeInput) ||
    !Utils.validateInput(edadesNocheInput)
  ) {
    Utils.showResult(
      "result10",
      "Por favor, complete todas las edades",
      "warning"
    );
    return;
  }

  const parseEdades = (input, expectedLength, turno) => {
    const edades = input
      .split(",")
      .map((e) => parseInt(e.trim()))
      .filter((e) => !isNaN(e) && e > 0);

    if (edades.length !== expectedLength) {
      throw new Error(
        `El turno ${turno} debe tener ${expectedLength} edades válidas`
      );
    }
    return edades;
  };

  try {
    const edadesMañana = parseEdades(edadesMañanaInput, 5, "mañana");
    const edadesTarde = parseEdades(edadesTardeInput, 6, "tarde");
    const edadesNoche = parseEdades(edadesNocheInput, 11, "noche");

    const calcularPromedio = (edades) =>
      edades.reduce((sum, edad) => sum + edad, 0) / edades.length;

    const promedios = {
      mañana: calcularPromedio(edadesMañana),
      tarde: calcularPromedio(edadesTarde),
      noche: calcularPromedio(edadesNoche),
    };

    const turnoMayorPromedio = Object.entries(promedios).reduce(
      (max, current) => (current[1] > max[1] ? current : max)
    )[0];

    const mensaje = `
                    Promedio turno mañana: ${promedios.mañana.toFixed(2)} años
                    Promedio turno tarde: ${promedios.tarde.toFixed(2)} años
                    Promedio turno noche: ${promedios.noche.toFixed(2)} años
                    
                    El turno con mayor promedio de edad es: ${turnoMayorPromedio.toUpperCase()}
                `;

    Utils.showResult("result10", mensaje, "success");
  } catch (error) {
    Utils.showResult("result10", error.message, "warning");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const numericInputs = document.querySelectorAll('input[type="number"]');
  numericInputs.forEach((input) => {
    input.addEventListener("input", (e) => {
      const value = parseFloat(e.target.value);
      const min = parseFloat(e.target.min) || -Infinity;
      const max = parseFloat(e.target.max) || Infinity;

      if (value < min || value > max) {
        e.target.style.borderColor = "#e74c3c";
      } else {
        e.target.style.borderColor = "#27ae60";
      }
    });
  });

  const textInputs = document.querySelectorAll('input[type="text"]');
  textInputs.forEach((input) => {
    input.addEventListener("input", (e) => {
      if (e.target.value.trim() === "") {
        e.target.style.borderColor = "#e74c3c";
      } else {
        e.target.style.borderColor = "#27ae60";
      }
    });
  });

  const allInputs = document.querySelectorAll("input, select");
  allInputs.forEach((input) => {
    input.addEventListener("input", () => {
      const exerciseCard = input.closest(".exercise-card");
      const resultDiv = exerciseCard.querySelector(".result");
      if (resultDiv) {
        resultDiv.textContent = "";
        resultDiv.className = "result";
      }
    });
  });
});

const clearAllInputs = () => {
  document.querySelectorAll("input, select").forEach((element) => {
    element.value = "";
    element.style.borderColor = "#ddd";
  });
  document.querySelectorAll(".result").forEach((result) => {
    result.textContent = "";
    result.className = "result";
  });
};

const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

const observeElements = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  });

  document.querySelectorAll(".exercise-card").forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(card);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  observeElements();

  const header = document.querySelector(".header");
  const clearButton = document.createElement("button");
  clearButton.textContent = "Limpiar Todo";
  clearButton.className = "btn";
  clearButton.style.maxWidth = "200px";
  clearButton.style.margin = "10px auto";
  clearButton.onclick = clearAllInputs;
  header.appendChild(clearButton);
});

window.addEventListener("error", (e) => {
  console.error("Error en la aplicación:", e.error);
  alert("Ha ocurrido un error. Por favor, recarga la página.");
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    console.log("Aplicación lista");
  });
}
